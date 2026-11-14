import sys, os
sys.path.insert(0, os.path.abspath('.'))
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
plt.show = lambda *args, **kwargs: None
import scan_terrain
import json, os
import numpy as np
from PIL import Image

os.makedirs('web/data', exist_ok=True)
os.makedirs('web/data/textures', exist_ok=True)

# 1. Heightmap downsampled for smooth 3D rendering in WebGL
target_h, target_w = 180, int(180 * (scan_terrain.elevation_smooth.shape[1] / scan_terrain.elevation_smooth.shape[0]))
raw_pil = Image.fromarray(scan_terrain.elevation_smooth)
resized_dem = np.array(raw_pil.resize((target_w, target_h), Image.Resampling.BILINEAR))
norm_elev = (resized_dem - scan_terrain.elevation_smooth.min()) / (scan_terrain.elevation_smooth.max() - scan_terrain.elevation_smooth.min())

im_h = Image.fromarray((norm_elev * 255.0).astype(np.uint8))
im_h.save('web/data/textures/heightmap.png')
print("Heightmap saved:", im_h.size)

# 2. Textures: MCDA (viridis), DEM (bone), Slope (turbo)
fcols_mcda = plt.colormaps['viridis'](plt.Normalize(vmin=0, vmax=max(0.1, float(np.max(scan_terrain.cur_mcda_map))))(scan_terrain.cur_mcda_map))
shade_factor = 0.65 + 0.45 * scan_terrain.hillshade_norm[..., np.newaxis]
tex_mcda = np.clip(fcols_mcda[..., :3] * shade_factor, 0.0, 1.0)
Image.fromarray((tex_mcda * 255).astype(np.uint8)).resize((target_w * 4, target_h * 4)).save('web/data/textures/tex_mcda.png')

fcols_dem = plt.colormaps['bone'](plt.Normalize(vmin=2000, vmax=6000)(scan_terrain.elevation_smooth))
tex_dem = np.clip(fcols_dem[..., :3] * shade_factor, 0.0, 1.0)
Image.fromarray((tex_dem * 255).astype(np.uint8)).resize((target_w * 4, target_h * 4)).save('web/data/textures/tex_dem.png')

fcols_slope = plt.colormaps['turbo'](plt.Normalize(vmin=0, vmax=scan_terrain.slope_vmax)(scan_terrain.slope_deg))
tex_slope = np.clip(fcols_slope[..., :3] * shade_factor, 0.0, 1.0)
Image.fromarray((tex_slope * 255).astype(np.uint8)).resize((target_w * 4, target_h * 4)).save('web/data/textures/tex_slope.png')
print("Textures saved!")

# 3. Sites Data
sites_data = []
for sp in scan_terrain.site_profiles:
    ev = scan_terrain.evaluate_site_on_epoch(sp, scan_terrain.cur_dt)
    norm_x = sp['c'] / scan_terrain.elevation_smooth.shape[1]
    norm_y = sp['r'] / scan_terrain.elevation_smooth.shape[0]
    
    # Calculate elevation ratio for 3D placement
    elev_ratio = (sp['elev'] - scan_terrain.elevation_smooth.min()) / (scan_terrain.elevation_smooth.max() - scan_terrain.elevation_smooth.min())
    
    sites_data.append({
        'key': sp['key'],
        'label': sp['label'],
        'r': int(sp['r']),
        'c': int(sp['c']),
        'norm_x': float(norm_x),
        'norm_y': float(norm_y),
        'elev_ratio': float(elev_ratio),
        'lat': float(sp['lat']),
        'lon': float(sp['lon']),
        'elev': float(sp['elev']),
        'slope': float(sp['slope']),
        'psr_km': float(sp['psr_km']),
        'horizon_deg': [round(float(h), 2) for h in sp['horizon_deg']],
        'sun_margin': float(ev['sun_margin']),
        'earth_margin': float(ev['earth_margin']),
        'solar_cont_pct': float(ev['solar_cont_pct']),
        'dte_cont_pct': float(ev['dte_cont_pct']),
        'est_temp_k': float(ev['est_temp_k']),
        'score_100': float(ev['score_100']),
        'is_go': bool(ev['is_go']),
        'reasons': ev['reasons'],
        'sun_el_series': [round(float(v), 2) for v in ev['sun_el_series']],
        'sun_hor_series': [round(float(v), 2) for v in ev['sun_hor_series']],
        'earth_el_series': [round(float(v), 2) for v in ev['earth_el_series']],
        'earth_hor_series': [round(float(v), 2) for v in ev['earth_hor_series']]
    })

# 4. Libration trace (28 days)
lib_az, lib_el = [], []
for dd in range(0, 28, 1):
    ep_l = scan_terrain.compute_lunar_ephemeris(scan_terrain.cur_dt + scan_terrain.timedelta(days=dd), scan_terrain.site_profiles[0]['lat'], scan_terrain.site_profiles[0]['lon'])
    lib_az.append(round(float(ep_l['earth_az']), 2))
    lib_el.append(round(float(ep_l['earth_elev']), 2))

export_data = {
    'cur_dt': scan_terrain.cur_dt.strftime('%d %b %Y %H:%M UTC'),
    'target_epoch_iso': scan_terrain.cur_dt.isoformat(),
    'ephemeris': {
        'sun_az': round(float(scan_terrain.cur_ep['sun_az']), 2),
        'sun_elev': round(float(scan_terrain.cur_ep['sun_elev']), 2),
        'earth_az': round(float(scan_terrain.cur_ep['earth_az']), 2),
        'earth_elev': round(float(scan_terrain.cur_ep['earth_elev']), 2),
        'lib_az': lib_az,
        'lib_el': lib_el
    },
    'dem_info': {
        'orig_width': scan_terrain.elevation_smooth.shape[1],
        'orig_height': scan_terrain.elevation_smooth.shape[0],
        'grid_w': target_w,
        'grid_h': target_h,
        'elev_min': float(scan_terrain.elevation_smooth.min()),
        'elev_max': float(scan_terrain.elevation_smooth.max()),
        'res_m': float(scan_terrain.PIXEL_RES_M)
    },
    'sites': sites_data
}

with open('web/data/terrain_3d_data.json', 'w') as f:
    json.dump(export_data, f, indent=2)

print('SUCCESS: Export complete to web/data/terrain_3d_data.json!')
