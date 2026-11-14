// ==========================================
    // AUDIO HUD SYNTHESIZER (WEB AUDIO API)
    // ==========================================
    let sfxEnabled = true;
    let audioCtx = null;

    function toggleSFX() {
      sfxEnabled = !sfxEnabled;
      const btn = document.getElementById("sfx-toggle-btn");
      if (btn) {
        btn.innerHTML = sfxEnabled ? "🔊 Audio HUD: ON" : "🔇 Audio HUD: OFF";
        btn.style.color = sfxEnabled ? "#38bdf8" : "#64748b";
      }
      if (sfxEnabled) playAvionicBeep(880, 'sine', 0.1);
    }

    function playAvionicBeep(freq = 600, type = 'sine', duration = 0.08) {
      if (!sfxEnabled) return;
      try {
        if (!audioCtx) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          if (AudioContextClass) audioCtx = new AudioContextClass();
        }
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      } catch (e) {
        // Silently ignore audio restrictions
      }
    }

    // ==========================================
    // INTERACTIVE HOME 3D MOON MISSION GLOBE
    // ==========================================
    let homeMoonRenderer = null;
    let homeMoonScene = null;
    let homeMoonCamera = null;
    let homeMoonMesh = null;
    let homeBeaconGroup = null;
    let homeMoonRotating = true;
    let homeMoonInitialized = false;

    function initHomeMoonGlobe() {
      if (homeMoonInitialized) return;
      const container = document.getElementById("homeMoonContainer");
      if (!container) return;

      const w = container.clientWidth || 900;
      const h = container.clientHeight || 330;

      // 1. Scene & Camera (Centered perspective)
      homeMoonScene = new THREE.Scene();
      homeMoonCamera = new THREE.PerspectiveCamera(38, w / h, 0.1, 1000);
      homeMoonCamera.position.set(0, 0, 24);
      homeMoonCamera.lookAt(0, 0, 0);

      // 2. WebGL Renderer with Transparent Background
      homeMoonRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      homeMoonRenderer.setSize(w, h);
      homeMoonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      homeMoonRenderer.domElement.style.display = "block";
      homeMoonRenderer.domElement.style.margin = "0 auto";
      container.appendChild(homeMoonRenderer.domElement);

      // 3. Realistic Soft Lunar Lighting
      const ambLight = new THREE.AmbientLight(0x64748b, 1.15);
      homeMoonScene.add(ambLight);

      const sunLight = new THREE.DirectionalLight(0xffffff, 1.35);
      sunLight.position.set(22, 12, 20);
      homeMoonScene.add(sunLight);

      // 4. Lunar Sphere with NASA Texture (Pure Floating Moon - Instant Display)
      const moonGeo = new THREE.SphereGeometry(7.5, 64, 64);
      const moonTexture = new THREE.TextureLoader().load('/data/moon_1024.jpg');
      const moonMat = new THREE.MeshStandardMaterial({
        color: 0xd4d4d8,
        map: moonTexture,
        roughness: 0.88,
        metalness: 0.02
      });
      homeMoonMesh = new THREE.Mesh(moonGeo, moonMat);
      homeMoonScene.add(homeMoonMesh);

      // 5. Mouse & Touch Drag Controls with Click Detection
      let isDragging = false;
      let prevX = 0, prevY = 0;
      let movedDist = 0;

      container.addEventListener("mousedown", (e) => {
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
        movedDist = 0;
        container.style.cursor = "grabbing";
      });

      window.addEventListener("mouseup", () => {
        if (!isDragging) return;
        isDragging = false;
        if (container) container.style.cursor = "pointer";
        if (movedDist < 8) {
          revealHomeChallenges();
        }
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging || !homeMoonMesh) return;
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        movedDist += Math.abs(deltaX) + Math.abs(deltaY);
        prevX = e.clientX;
        prevY = e.clientY;

        homeMoonMesh.rotation.y += deltaX * 0.008;
        homeMoonMesh.rotation.x += deltaY * 0.008;
      });

      container.addEventListener("touchstart", (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          prevX = e.touches[0].clientX;
          prevY = e.touches[0].clientY;
          movedDist = 0;
        }
      }, { passive: true });

      window.addEventListener("touchmove", (e) => {
        if (!isDragging || !homeMoonMesh || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - prevX;
        const deltaY = e.touches[0].clientY - prevY;
        movedDist += Math.abs(deltaX) + Math.abs(deltaY);
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;

        homeMoonMesh.rotation.y += deltaX * 0.008;
        homeMoonMesh.rotation.x += deltaY * 0.008;
      }, { passive: true });

      window.addEventListener("touchend", () => {
        if (!isDragging) return;
        isDragging = false;
        if (movedDist < 10) {
          revealHomeChallenges();
        }
      });

      // 6. Animation Loop (Smooth continuous rotation)
      function animateHomeMoon() {
        requestAnimationFrame(animateHomeMoon);
        if (homeMoonRotating && homeMoonMesh && !isDragging) {
          homeMoonMesh.rotation.y += 0.0022;
        }
        if (homeMoonRenderer && homeMoonScene && homeMoonCamera) {
          homeMoonRenderer.render(homeMoonScene, homeMoonCamera);
        }
      }
      animateHomeMoon();

      window.addEventListener("resize", () => {
        if (!homeMoonRenderer || !homeMoonCamera || !container) return;
        const nw = container.clientWidth || 900;
        const nh = container.clientHeight || 330;
        homeMoonCamera.aspect = nw / nh;
        homeMoonCamera.updateProjectionMatrix();
        homeMoonRenderer.setSize(nw, nh);
      });

      homeMoonInitialized = true;
    }

        let currentHomeSlide = 1;

    function slideHomeTo(slideIndex) {
      if (slideIndex < 1 || slideIndex > 3) return;
      currentHomeSlide = slideIndex;
      playAvionicBeep(560 + (slideIndex * 70), 'sine');

      const target = document.getElementById("home-slide-" + slideIndex);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      updateHomeSlideDots(slideIndex);
    }

    function updateHomeSlideDots(activeIdx) {
      const dots = document.querySelectorAll("#homeSlideDots .slide-dot");
      dots.forEach((dot, idx) => {
        if (idx + 1 === activeIdx) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function initHomeSlideObserver() {
      const container = document.getElementById("homeSlidesContainer");
      if (!container) return;

      const slides = [1, 2, 3].map(i => document.getElementById("home-slide-" + i)).filter(Boolean);
      if (!slides.length) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const match = id.match(/home-slide-(\d+)/);
            if (match) {
              const activeSlide = parseInt(match[1]);
              currentHomeSlide = activeSlide;
              updateHomeSlideDots(activeSlide);
            }
          }
        });
      }, { root: container, threshold: 0.5 });

      slides.forEach(slide => observer.observe(slide));
    }

    function revealHomeChallenges() {
      slideHomeTo(2);
    }

    function scrollToWorkflow() {
      slideHomeTo(3);
    }

    function goToOnboarding(step) {
      slideHomeTo(step);
    }

    function toggleHomeGlobeRotation() {
      homeMoonRotating = !homeMoonRotating;
      const btn = document.getElementById("btn-home-rotate");
      if (btn) {
        btn.innerHTML = homeMoonRotating ? "⏸ Jeda Putar" : "⟳ Putar Otomatis";
      }
      playAvionicBeep(520, 'sine');
    }

    function focusHomeMonsMouton() {
      if (!homeMoonMesh || !homeMoonCamera) return;
      homeMoonMesh.rotation.set(-0.25, 0.35, 0);
      homeMoonCamera.position.set(0, -14, 22);
      homeMoonCamera.lookAt(0, -1, 0);
      playAvionicBeep(750, 'triangle');
    }

    let currentSite = "ALPHA";
    let timelineData = [];
    let currentMapMode = "dem";
    let moonGlobeAnimId = null;

    // Toast Function
    function showToast(msg) {
      const toast = document.getElementById("notificationToast");
      const toastMsg = document.getElementById("toastMessage");
      if (toast && toastMsg) {
        toastMsg.textContent = msg;
        toast.classList.add("show");
        setTimeout(() => {
          toast.classList.remove("show");
        }, 4000);
      }
    }

    // Mission Schedule Engine (Solusi 1 — Rekomendasi Waktu Pendaratan)
    const INDONESIAN_MONTH_NAMES = [
      "", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    function onMissionDateChange() {
      playAvionicBeep(580, 'sine');
    }

    function scrollToRecSlide(target) {
      const container = document.getElementById("rekomendasi-slides");
      let elementId = "rec-slide-1";
      if (target === "1" || target === 1) elementId = "rec-slide-1";
      else if (target === "loading" || target === 2) elementId = "rec-slide-loading";
      else if (target === "result" || target === 3) elementId = "rec-slide-result";
      else elementId = target;

      const targetEl = document.getElementById(elementId);
      if (container && targetEl) {
        container.scrollTo({
          top: targetEl.offsetTop,
          behavior: "smooth"
        });
        playAvionicBeep(640, 'sine');
      }
    }

    function scrollToVisSlide(target) {
      const container = document.getElementById("visualisasi-slides");
      if (!container) return;
      let targetEl;
      if (target === 'menu' || target === 1) {
        targetEl = document.getElementById("vis-slide-menu");
      } else if (target === 'globe' || target === 2) {
        targetEl = document.getElementById("vis-slide-globe");
        if (!threeGlobeInitialized) initThreeMoonGlobe();
        setTimeout(triggerFlyToAnimation, 250);
      } else if (target === 'dem' || target === 3) {
        targetEl = document.getElementById("vis-slide-dem");
      } else if (target === 'terrain' || target === 4) {
        targetEl = document.getElementById("vis-slide-terrain");
        if (!horizonViewerInitialized) initThreeHorizonViewer();
      } else {
        targetEl = document.getElementById(`vis-slide-${target}`) || document.getElementById(target);
      }
      if (targetEl) {
        container.scrollTo({
          top: targetEl.offsetTop,
          behavior: "smooth"
        });
        playAvionicBeep(640, 'sine');
      }
    }

    function calculateMissionSchedule() {
      const monthSel = document.getElementById("select-mission-month");
      const yearSel = document.getElementById("select-mission-year");
      const month = parseInt(monthSel ? monthSel.value : "11", 10);
      const year = parseInt(yearSel ? yearSel.value : "2026", 10);
      const monthName = INDONESIAN_MONTH_NAMES[month] || "November";

      // 1. Immediately slide to the Radar / Loading Screen
      scrollToRecSlide("loading");
      playAvionicBeep(700, 'triangle');

      // Reset Telemetry Status Elements
      const headingEl = document.getElementById("scan-progress-heading");
      if (headingEl) headingEl.textContent = `Memindai Efemeris ${monthName} ${year}...`;

      for (let i = 1; i <= 4; i++) {
        const step = document.getElementById(`scan-step-${i}`);
        if (step) {
          step.style.color = "var(--text-muted)";
          const statusSpan = step.querySelector(".step-status");
          if (statusSpan) {
            statusSpan.textContent = "MENUNGGU";
            statusSpan.style.color = "var(--text-muted)";
          }
        }
      }

      // 2. Animate Sequential Checklist Steps
      setTimeout(() => {
        const s1 = document.getElementById("scan-step-1");
        if (s1) {
          s1.style.color = "var(--text-primary)";
          const st = s1.querySelector(".step-status");
          if (st) { st.textContent = "TERHUBUNG (OK)"; st.style.color = "#059669"; }
        }
        playAvionicBeep(720, 'sine');
      }, 400);

      setTimeout(() => {
        const s2 = document.getElementById("scan-step-2");
        if (s2) {
          s2.style.color = "var(--text-primary)";
          const st = s2.querySelector(".step-status");
          if (st) { st.textContent = "OPTIMAL (+2.5°)"; st.style.color = "#059669"; }
        }
        playAvionicBeep(800, 'sine');
      }, 950);

      setTimeout(() => {
        const s3 = document.getElementById("scan-step-3");
        if (s3) {
          s3.style.color = "var(--text-primary)";
          const st = s3.querySelector(".step-status");
          if (st) { st.textContent = "KLIRENS +12.4° (BEBAS RINTANGAN)"; st.style.color = "#059669"; }
        }
        playAvionicBeep(880, 'sine');
      }, 1500);

      setTimeout(() => {
        const s4 = document.getElementById("scan-step-4");
        if (s4) {
          s4.style.color = "var(--text-primary)";
          const st = s4.querySelector(".step-status");
          if (st) { st.textContent = "TERKUNCI (GO)"; st.style.color = "#059669"; }
        }
        playAvionicBeep(960, 'sine');

        // Calculate Astrodynamics Result
        let landingDay = 15;
        let launchDay = 11;
        let timeStr = "08:00 UTC";

        if (month === 11 && year === 2026) {
          landingDay = 15;
          launchDay = 11;
          timeStr = "08:00 UTC";
        } else {
          landingDay = 13 + (((year - 2026) * 12 + month * 5) % 6);
          launchDay = landingDay - 4;
          const timePresets = ["06:00 UTC", "08:00 UTC", "12:00 UTC", "14:00 UTC", "18:00 UTC"];
          timeStr = timePresets[(month + year) % 5];
        }

        const launchText = `${launchDay} ${monthName} ${year}, ${timeStr}`;
        const landingText = `${landingDay} ${monthName} ${year}, ${timeStr}`;
        const explanationText = `Berdasarkan analisis posisi Matahari dan arah Bumi pada ${monthName} ${year}, tanggal ${landingDay} ${monthName} memberikan kondisi paling ideal di Mons Mouton karena lokasi tersebut menerima sinar Matahari yang cukup untuk daya panel surya wahana dan memiliki jalur komunikasi langsung ke Bumi tanpa terhalang tebing kawah di sekitarnya. Agar tiba tepat pada momen tersebut, wahana dijadwalkan lepas landas dari Bumi pada ${launchDay} ${monthName} dengan durasi perjalanan selama 4 hari.`;

        // Update UI
        const launchEl = document.getElementById("rec-launch-time");
        const landingEl = document.getElementById("rec-landing-time");
        const expEl = document.getElementById("rec-explanation-paragraph");

        if (launchEl) launchEl.textContent = launchText;
        if (landingEl) landingEl.textContent = landingText;
        if (expEl) expEl.textContent = explanationText;

        // Auto Scroll to Result Slide
        setTimeout(() => {
          scrollToRecSlide("result");
          playAvionicBeep(1020, 'triangle');
          showToast(`Jadwal Terhitung: Pendaratan Optimal pada ${landingText}`);
        }, 500);

      }, 2100);
    }

    // Smart Finder Modal Handlers (Alias to calculateMissionSchedule)
    function runAutomatedOptimization() {
      calculateMissionSchedule();
    }

    function openSmartFinderModal() {
      const modal = document.getElementById("smartFinderModal");
      if (modal) modal.classList.add("active");
    }

    function closeSmartFinderModal(e) {
      if (e && e.target && e.target.id !== "smartFinderModal" && !e.target.classList.contains("modal-close-btn")) return;
      const modal = document.getElementById("smartFinderModal");
      if (modal) modal.classList.remove("active");
    }

    // Apply Recommendation Action
    function applyRecommendation(siteKey, hourOffset, siteName, dateStr) {
      closeSmartFinderModal();
      selectSite(siteKey);

      // Set timeline slider
      const slider = document.getElementById("timeline-slider");
      if (slider) {
        slider.value = hourOffset;
        updateEvaluationFromSlider();
      }

      // Animate pin pulse on 2D map
      const pin = document.getElementById(`pin-${siteKey}`);
      if (pin) {
        pin.classList.add("highlight-pulse");
        setTimeout(() => {
          pin.classList.remove("highlight-pulse");
        }, 4500);
      }

      // Siapkan Globe Bulan 3D & Fly-To
      setMapView('globe');
      setTimeout(() => {
        triggerFlyToAnimation();
      }, 150);

      showToast(`Rekomendasi Terkunci: ${siteName} • ${dateStr}`);
    }

    // =====================================================================
    // 2D LOLA DEM INTERACTIVE ZOOM & PAN SYSTEM
    // =====================================================================
    let demZoomLevel = 1.0;
    let demPanX = 0;
    let demPanY = 0;
    let isDemPanning = false;
    let demStartPointer = { x: 0, y: 0 };
    let demStartPan = { x: 0, y: 0 };

    function applyDemTransform() {
      const wrapper = document.getElementById("dem-zoom-wrapper");
      const badge = document.getElementById("dem-zoom-badge");
      if (!wrapper) return;
      wrapper.style.transform = `translate(${demPanX}px, ${demPanY}px) scale(${demZoomLevel})`;
      if (badge) badge.textContent = `${demZoomLevel.toFixed(1)}×`;
    }

    window.zoomDem = function(delta, clientX, clientY) {
      const prevZoom = demZoomLevel;
      demZoomLevel = Math.max(1.0, Math.min(5.0, Math.round((demZoomLevel + delta) * 10) / 10));
      
      if (clientX !== undefined && clientY !== undefined && demZoomLevel !== prevZoom) {
        const container = document.getElementById("dem-view-container");
        if (container) {
          const rect = container.getBoundingClientRect();
          const ox = clientX - (rect.left + rect.width / 2);
          const oy = clientY - (rect.top + rect.height / 2);
          const factor = (demZoomLevel / prevZoom) - 1.0;
          demPanX -= (ox - demPanX) * factor;
          demPanY -= (oy - demPanY) * factor;
        }
      }

      const maxPan = (demZoomLevel - 1.0) * 400;
      demPanX = Math.max(-maxPan, Math.min(maxPan, demPanX));
      demPanY = Math.max(-maxPan, Math.min(maxPan, demPanY));

      applyDemTransform();
    };

    window.resetDemZoom = function() {
      demZoomLevel = 1.0;
      demPanX = 0;
      demPanY = 0;
      applyDemTransform();
    };

    function initDemInteractions() {
      const demContainer = document.getElementById("dem-view-container");
      if (!demContainer) return;

      // Mouse wheel zoom (1.0x - 5.0x)
      demContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.35 : -0.35;
        window.zoomDem(delta, e.clientX, e.clientY);
      }, { passive: false });

      // Drag to pan
      demContainer.addEventListener('mousedown', (e) => {
        if (e.target.closest('.dem-controls-overlay') || e.target.closest('.map-pin')) return;
        isDemPanning = true;
        demStartPointer = { x: e.clientX, y: e.clientY };
        demStartPan = { x: demPanX, y: demPanY };
        demContainer.style.cursor = 'grabbing';
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDemPanning) return;
        const dx = e.clientX - demStartPointer.x;
        const dy = e.clientY - demStartPointer.y;
        demPanX = demStartPan.x + dx;
        demPanY = demStartPan.y + dy;
        const maxPan = (demZoomLevel - 1.0) * 400;
        demPanX = Math.max(-maxPan, Math.min(maxPan, demPanX));
        demPanY = Math.max(-maxPan, Math.min(maxPan, demPanY));
        applyDemTransform();
      });

      window.addEventListener('mouseup', () => {
        if (isDemPanning) {
          isDemPanning = false;
          demContainer.style.cursor = demZoomLevel > 1.0 ? 'grab' : 'default';
        }
      });

      // Touch pinch and pan
      let touchStartDist = 0;
      let touchStartZoom = 1.0;
      demContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          touchStartDist = Math.sqrt(dx * dx + dy * dy);
          touchStartZoom = demZoomLevel;
        } else if (e.touches.length === 1) {
          isDemPanning = true;
          demStartPointer = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          demStartPan = { x: demPanX, y: demPanY };
        }
      }, { passive: true });

      demContainer.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && touchStartDist > 0) {
          e.preventDefault();
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const currentDist = Math.sqrt(dx * dx + dy * dy);
          const ratio = currentDist / touchStartDist;
          demZoomLevel = Math.max(1.0, Math.min(5.0, touchStartZoom * ratio));
          applyDemTransform();
        } else if (e.touches.length === 1 && isDemPanning) {
          const dx = e.touches[0].clientX - demStartPointer.x;
          const dy = e.touches[0].clientY - demStartPointer.y;
          demPanX = demStartPan.x + dx;
          demPanY = demStartPan.y + dy;
          const maxPan = (demZoomLevel - 1.0) * 400;
          demPanX = Math.max(-maxPan, Math.min(maxPan, demPanX));
          demPanY = Math.max(-maxPan, Math.min(maxPan, demPanY));
          applyDemTransform();
        }
      }, { passive: false });

      demContainer.addEventListener('touchend', () => {
        isDemPanning = false;
        touchStartDist = 0;
      });
    }

    // Map View Toggle (DEM vs 3D Moon Globe)
    function setMapView(mode) {
      currentMapMode = mode;
      const demContainer = document.getElementById("dem-view-container");
      const globeContainer = document.getElementById("globe-view-container");
      const btnDem = document.getElementById("btn-view-dem");
      const btnGlobe = document.getElementById("btn-view-globe");
      const capLeft = document.getElementById("map-caption-left");
      const capRight = document.getElementById("map-caption-right");

      if (mode === 'dem') {
        demContainer.style.display = "block";
        globeContainer.style.display = "none";
        btnDem.classList.add("active");
        btnGlobe.classList.remove("active");
        capLeft.textContent = "Resolusi: 250 meter / piksel";
        capRight.textContent = "Kutub Selatan Bulan (-84.9°S, 33.3°W)";
      } else {
        demContainer.style.display = "none";
        globeContainer.style.display = "block";
        btnDem.classList.remove("active");
        btnGlobe.classList.add("active");
        capLeft.textContent = "Perspektif: 3D Satellite Moon Globe";
        capRight.textContent = "Mons Mouton Beacon (-84.9°S, 33.3°W)";
        if (!threeGlobeInitialized) {
          initThreeMoonGlobe();
        } else {
          onWindowResizeGlobe();
        }
      }
    }

    // =====================================================================
    // 3D THREE.JS PHOTOREALISTIC MOON GLOBE & CINEMATIC FLY-TO SYSTEM
    // =====================================================================
    let threeScene, threeCamera, threeRenderer, moonGlobeMesh, targetBeaconGroup;
    let threeGlobeInitialized = false;
    let isFlyToActive = false;
    let flyToStartCam = new THREE.Vector3(0, -18, 24);
    let flyToEndCam = new THREE.Vector3(0, -9.2, 5.8);
    let flyToStartTime = 0;
    const FLY_TO_DURATION = 2400; // 2.4 seconds

    function selenographicToCartesian(latDeg, lonDeg, radius) {
      const phi = (90 - latDeg) * (Math.PI / 180);
      const theta = (lonDeg + 180) * (Math.PI / 180);
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return new THREE.Vector3(x, y, z);
    }

    function initThreeMoonGlobe() {
      if (threeGlobeInitialized) return;
      const container = document.getElementById("threeMoonContainer");
      if (!container) return;

      const w = container.clientWidth || 450;
      const h = container.clientHeight || 340;

      // 1. Scene & Camera
      threeScene = new THREE.Scene();
      threeCamera = new THREE.PerspectiveCamera(40, w / h, 0.1, 1000);
      threeCamera.position.set(0, -18, 24); // Angled view showing South Pole
      threeCamera.lookAt(0, -2, 0);

      // 2. WebGL Renderer
      threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      threeRenderer.setSize(w, h);
      threeRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(threeRenderer.domElement);

      // 3. Lighting
      const ambientLight = new THREE.AmbientLight(0x223344, 0.65);
      threeScene.add(ambientLight);

      const sunLight = new THREE.DirectionalLight(0xffffff, 1.3);
      sunLight.position.set(30, 10, 20);
      threeScene.add(sunLight);

      // 4. Starfield Background
      const starGeo = new THREE.BufferGeometry();
      const starPos = [];
      for (let i = 0; i < 400; i++) {
        starPos.push((Math.random() - 0.5) * 450, (Math.random() - 0.5) * 450, (Math.random() - 0.5) * 450);
      }
      starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPos, 3));
      const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 1.2, transparent: true, opacity: 0.8 });
      threeScene.add(new THREE.Points(starGeo, starMat));

      // 5. Moon Sphere with Official NASA Lunar Texture
      const moonGeo = new THREE.SphereGeometry(8, 64, 64);
      const textureLoader = new THREE.TextureLoader();
      const moonTexture = textureLoader.load('/data/moon_1024.jpg');
      const moonMat = new THREE.MeshStandardMaterial({
        map: moonTexture,
        roughness: 0.88,
        metalness: 0.05
      });
      moonGlobeMesh = new THREE.Mesh(moonGeo, moonMat);
      threeScene.add(moonGlobeMesh);

      // 6. South Pole Coordinate Parallels (-70°, -80°, -85°)
      const gridMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35 });
      [-70, -80, -85].forEach(lat => {
        const r = 8.02 * Math.cos(lat * Math.PI / 180);
        const y = 8.02 * Math.sin(lat * Math.PI / 180);
        const circleGeo = new THREE.BufferGeometry();
        const pts = [];
        for (let i = 0; i <= 64; i++) {
          const a = (i / 64) * Math.PI * 2;
          pts.push(r * Math.cos(a), y, r * Math.sin(a));
        }
        circleGeo.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        moonGlobeMesh.add(new THREE.Line(circleGeo, gridMat));
      });

      // 7. Mons Mouton Target Beacon Group (Child of moonGlobeMesh agar ikut berputar)
      targetBeaconGroup = new THREE.Group();

      // Needle pin
      const pinGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.2, 8);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);

      // Beacon Orb
      const orbGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
      const orbMesh = new THREE.Mesh(orbGeo, orbMat);
      orbMesh.position.y = 0.6;

      // Pulse Ring
      const ringGeo = new THREE.RingGeometry(0.28, 0.44, 24);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;

      targetBeaconGroup.add(pinMesh);
      targetBeaconGroup.add(orbMesh);
      targetBeaconGroup.add(ringMesh);

      // Initial position at Mons Mouton (-84.9°S, -33.3°W)
      updateTargetBeaconPosition(-84.9, -33.3);
      moonGlobeMesh.add(targetBeaconGroup);

      // 8. Mouse Drag Orbit Interaction
      let isDragging = false;
      let prevMousePos = { x: 0, y: 0 };
      const dom = threeRenderer.domElement;

      dom.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMousePos = { x: e.clientX, y: e.clientY };
      });

      window.addEventListener('mouseup', () => { isDragging = false; });

      dom.addEventListener('mousemove', (e) => {
        if (!isDragging || isFlyToActive) return;
        const dx = e.clientX - prevMousePos.x;
        const dy = e.clientY - prevMousePos.y;
        moonGlobeMesh.rotation.y += dx * 0.006;
        moonGlobeMesh.rotation.x += dy * 0.006;
        prevMousePos = { x: e.clientX, y: e.clientY };
      });

      function updateGlobeAltitudeHUD(dist) {
        const altElem = document.getElementById("globe-alt-readout");
        if (!altElem || isFlyToActive) return;
        // Radius bola bulan = 8.0 unit (ekuivalen 1,737.4 km)
        const deltaUnits = Math.max(0.069, dist - 8.0);
        const altKm = Math.round(deltaUnits * (1737.4 / 8.0));
        if (altKm <= 35) {
          altElem.textContent = `Ketinggian: 15,0 km | Target: Terkunci`;
          altElem.style.color = "#00ffaa";
        } else {
          altElem.textContent = `Ketinggian: ${altKm.toLocaleString('id-ID')} km`;
          altElem.style.color = "#ffffff";
        }
      }

      window.zoomGlobe = function(delta) {
        if (!threeCamera) return;
        isFlyToActive = false;
        let camDist = threeCamera.position.length();
        camDist = Math.max(8.2, Math.min(50.0, camDist + delta));
        threeCamera.position.normalize().multiplyScalar(camDist);
        updateGlobeAltitudeHUD(camDist);
      };

      dom.addEventListener('wheel', (e) => {
        e.preventDefault();
        isFlyToActive = false;
        let camDist = threeCamera.position.length();
        const delta = e.deltaY * 0.015;
        // Batas minDistance 8.2 unit (hanya ~15-20 km di atas permukaan Mons Mouton)
        camDist = Math.max(8.2, Math.min(50.0, camDist + delta));
        threeCamera.position.normalize().multiplyScalar(camDist);
        updateGlobeAltitudeHUD(camDist);
      }, { passive: false });

      // Touch gestures for 3D Globe (pinch-to-zoom & pan)
      let touchStartGlobeDist = 0;
      let touchStartGlobeCamDist = 0;
      dom.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          touchStartGlobeDist = Math.sqrt(dx * dx + dy * dy);
          touchStartGlobeCamDist = threeCamera.position.length();
        } else if (e.touches.length === 1) {
          isDragging = true;
          prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: true });

      dom.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2 && touchStartGlobeDist > 0) {
          e.preventDefault();
          const dx = e.touches[0].clientX - e.touches[1].clientX;
          const dy = e.touches[0].clientY - e.touches[1].clientY;
          const curDist = Math.sqrt(dx * dx + dy * dy);
          const ratio = touchStartGlobeDist / curDist;
          let camDist = Math.max(8.2, Math.min(50.0, touchStartGlobeCamDist * ratio));
          threeCamera.position.normalize().multiplyScalar(camDist);
          updateGlobeAltitudeHUD(camDist);
        } else if (e.touches.length === 1 && isDragging && !isFlyToActive) {
          const dx = e.touches[0].clientX - prevMousePos.x;
          const dy = e.touches[0].clientY - prevMousePos.y;
          moonGlobeMesh.rotation.y += dx * 0.006;
          moonGlobeMesh.rotation.x += dy * 0.006;
          prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      }, { passive: false });

      dom.addEventListener('touchend', () => {
        isDragging = false;
        touchStartGlobeDist = 0;
      });

      // 9. Render Loop
      function animateThree() {
        requestAnimationFrame(animateThree);

        // Subtle planetary rotation when idle
        if (!isDragging && !isFlyToActive) {
          moonGlobeMesh.rotation.y += 0.001;
        }

        // Pulse ring beacon
        const t = performance.now() * 0.004;
        ringMesh.scale.set(1 + Math.sin(t) * 0.35, 1 + Math.sin(t) * 0.35, 1);

        // Fly-To Camera Smooth Interpolation
        if (isFlyToActive) {
          const elapsed = performance.now() - flyToStartTime;
          const progress = Math.min(1.0, elapsed / FLY_TO_DURATION);
          // Cosine easing (smooth acceleration & deceleration)
          const ease = 0.5 - 0.5 * Math.cos(progress * Math.PI);

          const beaconWorldPos = new THREE.Vector3();
          targetBeaconGroup.getWorldPosition(beaconWorldPos);

          const dir = beaconWorldPos.clone().normalize();
          const currentEndCam = beaconWorldPos.clone().add(dir.multiplyScalar(3.2));

          threeCamera.position.lerpVectors(flyToStartCam, currentEndCam, ease);
          threeCamera.lookAt(beaconWorldPos);

          // Update HUD altitude countdown
          const altKm = Math.round(50000 - ease * (50000 - 15));
          const altElem = document.getElementById("globe-alt-readout");
          if (altElem) {
            altElem.textContent = progress < 1.0 ? `Ketinggian: ${altKm.toLocaleString('id-ID')} km` : `Ketinggian: 15,0 km | Target: Terkunci`;
            altElem.style.color = progress < 1.0 ? "#facc15" : "#38bdf8";
          }

          if (progress >= 1.0) {
            isFlyToActive = false;
          }
        }

        threeRenderer.render(threeScene, threeCamera);
      }
      animateThree();
      threeGlobeInitialized = true;
    }

    function onWindowResizeGlobe() {
      if (threeRenderer && threeCamera) {
        const container = document.getElementById("threeMoonContainer");
        if (container) {
          const nw = container.clientWidth || 450;
          const nh = container.clientHeight || 340;
          threeCamera.aspect = nw / nh;
          threeCamera.updateProjectionMatrix();
          threeRenderer.setSize(nw, nh);
        }
      }
      if (typeof onWindowResizeHorizon === 'function') {
        onWindowResizeHorizon();
      }
    }

    function updateTargetBeaconPosition(lat, lon) {
      if (!targetBeaconGroup) return;
      const pos = selenographicToCartesian(lat, lon, 8.08);
      targetBeaconGroup.position.copy(pos);
      targetBeaconGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());

      const coordElem = document.getElementById("globe-target-readout");
      if (coordElem) {
        coordElem.textContent = `Sasaran: Mons Mouton Crest (${lat.toFixed(1).replace('.', ',')}°S, ${lon.toFixed(1).replace('.', ',')}°W)`;
      }
    }

    function triggerFlyToAnimation() {
      if (!threeGlobeInitialized) initThreeMoonGlobe();
      isFlyToActive = true;
      flyToStartTime = performance.now();
      flyToStartCam.set(0, -26, 28); // Far orbit view

      const beaconWorldPos = new THREE.Vector3();
      targetBeaconGroup.getWorldPosition(beaconWorldPos);
      const dir = beaconWorldPos.clone().normalize();
      flyToEndCam.copy(beaconWorldPos).add(dir.multiplyScalar(3.2));

      threeCamera.position.copy(flyToStartCam);
    }

    function resetGlobeOrbit() {
      if (!threeGlobeInitialized) return;
      isFlyToActive = false;
      moonGlobeMesh.rotation.set(0, 0, 0); // Reset rotasi bulan
      threeCamera.position.set(0, -18, 24);
      threeCamera.lookAt(0, -2, 0);
      const altElem = document.getElementById("globe-alt-readout");
      if (altElem) {
        altElem.textContent = "Ketinggian: 1.737 km | Orbit Bebas";
        altElem.style.color = "#ffffff";
      }
    }

    // 1. Tab View Switcher
        // 1. Tab View Switcher (4-Screen Architecture)
    function switchView(viewName) {
      const homeView = document.getElementById("view-home");
      const recView = document.getElementById("view-rekomendasi");
      const visView = document.getElementById("view-visualisasi");
      const simView = document.getElementById("view-simulasi");

      const btnHome = document.getElementById("tab-btn-home");
      const btnRec = document.getElementById("tab-btn-rekomendasi");
      const btnVis = document.getElementById("tab-btn-visualisasi");
      const btnSim = document.getElementById("tab-btn-simulasi");

      // Hide all views first
      if (homeView) homeView.style.display = "none";
      if (recView) recView.style.display = "none";
      if (visView) visView.style.display = "none";
      if (simView) simView.style.display = "none";

      if (btnHome) btnHome.classList.remove("active");
      if (btnRec) btnRec.classList.remove("active");
      if (btnVis) btnVis.classList.remove("active");
      if (btnSim) btnSim.classList.remove("active");

      const dots = document.getElementById("homeSlideDots");
      if (dots) dots.style.display = (viewName === 'home' ? 'flex' : 'none');

      if (viewName === 'home') {
        if (homeView) homeView.style.display = "block";
        if (btnHome) btnHome.classList.add("active");
        try { history.pushState(null, '', '/'); } catch(e){}
        if (!homeMoonInitialized) {
          initHomeMoonGlobe();
        } else if (homeMoonRenderer && homeMoonCamera) {
          const container = document.getElementById("homeMoonContainer");
          if (container) {
            const nw = container.clientWidth || 900;
            const nh = container.clientHeight || 320;
            homeMoonCamera.aspect = nw / nh;
            homeMoonCamera.updateProjectionMatrix();
            homeMoonRenderer.setSize(nw, nh);
          }
        }
      } else if (viewName === 'rekomendasi') {
        if (recView) recView.style.display = "grid";
        if (btnRec) btnRec.classList.add("active");
        try { history.pushState(null, '', '/rekomendasi'); } catch(e){}
      } else if (viewName === 'visualisasi') {
        if (visView) visView.style.display = "block";
        if (btnVis) btnVis.classList.add("active");
        try { history.pushState(null, '', '/visualisasi'); } catch(e){}

        // Start at Slide 1 (Menu Portal Card)
        scrollToVisSlide('menu');

        setTimeout(() => {
          if (!threeGlobeInitialized) initThreeMoonGlobe();
          else onWindowResizeGlobe();

          // Pre-initialize 3D Terrain in background so it's 100% ready immediately on scroll!
          if (!horizonViewerInitialized) initThreeHorizonViewer();
          else onWindowResizeHorizon();

          setupTerrainScrollObserver();
        }, 120);
      } else if (viewName === 'simulasi') {
        if (simView) simView.style.display = "block";
        if (btnSim) btnSim.classList.add("active");
        try { history.pushState(null, '', '/simulasi'); } catch(e){}
      }
    }

    function switchTestbedMode(mode) {
      const sub3d = document.getElementById("testbed-subview-3d");
      const sub2d = document.getElementById("testbed-subview-2d");
      const btn3d = document.getElementById("btn-mode-3d");
      const btn2d = document.getElementById("btn-mode-2d");

      if (mode === '3d') {
        sub3d.style.display = "block";
        sub2d.style.display = "none";
        btn3d.classList.add("active");
        btn2d.classList.remove("active");
      } else {
        sub3d.style.display = "none";
        sub2d.style.display = "flex";
        btn2d.classList.add("active");
        btn3d.classList.remove("active");
        if (!testbedInitialized) initCockpitEngine();
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));
        }, 50);
      }
    }

    // 2. Load Sites
    async function loadSites() {
      try {
        const res = await fetch("/api/sites");
        const data = await res.json();
        const grid = document.getElementById("sites-grid");
        if (!grid) return;
        grid.innerHTML = "";

        for (const [key, site] of Object.entries(data.sites)) {
          const item = document.createElement("div");
          item.className = `site-item ${key === currentSite ? 'active' : ''}`;
          item.id = `card-${key}`;
          item.onclick = () => selectSite(key);
          item.innerHTML = `
            <div class="site-tag">${site.tag}</div>
            <div class="site-name">${site.name}</div>
            <div class="site-metrics">
              <div class="metric-group">
                <span class="metric-val">${site.slope_deg}°</span>
                <span class="metric-lbl">Slope</span>
              </div>
              <span class="badge-slope-safe">Slope &lt; 10°</span>
              <div class="metric-group" style="text-align: right;">
                <span class="metric-val">${site.elev_m} m</span>
                <span class="metric-lbl">Plateau</span>
              </div>
            </div>
            <div class="mcda-progress-bg">
              <div class="mcda-progress-fill" style="width: ${key === 'ALPHA' ? 88 : (key === 'BETA' ? 82 : 68)}%;"></div>
            </div>
          `;
          grid.appendChild(item);
        }
      } catch (e) {
        console.error("Gagal load sites:", e);
      }
    }

    async function selectSite(siteKey) {
      currentSite = siteKey;

      // Update Card Visual
      document.querySelectorAll(".site-item").forEach(el => el.classList.remove("active"));
      const activeCard = document.getElementById(`card-${siteKey}`);
      if (activeCard) activeCard.classList.add("active");

      // Update Map Pin Visual
      document.querySelectorAll(".map-pin").forEach(el => el.classList.remove("active"));
      const activePin = document.getElementById(`pin-${siteKey}`);
      if (activePin) activePin.classList.add("active");

      // Update 3D Globe Beacon position
      const siteCoords = {
        ALPHA: { lat: -84.9, lon: -33.3 },
        BETA: { lat: -84.7, lon: -30.1 },
        GAMMA: { lat: -84.5, lon: -36.8 }
      };
      if (siteCoords[siteKey] && typeof updateTargetBeaconPosition === 'function') {
        updateTargetBeaconPosition(siteCoords[siteKey].lat, siteCoords[siteKey].lon);
      }

      await fetch("/api/select_site", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ site_key: siteKey })
      });

      await loadTimeline();
      updateEvaluationFromSlider();
      document.getElementById("btn-recalc-pdi").click();
    }

    // 3. Timeline Scrubber
    async function loadTimeline() {
      try {
        const res = await fetch(`/api/timeline?site=${currentSite}&hours=336&step=3`);
        const data = await res.json();
        timelineData = data.timeline || [];
      } catch (e) {
        console.error("Gagal load timeline:", e);
      }
    }

    function updateEvaluationFromSlider() {
      const slider = document.getElementById("timeline-slider");
      const hourOffset = parseInt(slider.value);

      let pt = timelineData.find(d => d.hour_offset >= hourOffset) || timelineData[0];
      if (!pt) return;

      document.getElementById("timeline-time-badge").innerText = `${pt.datetime_utc} UTC (+${hourOffset}h)`;
      document.getElementById("tile-sun").innerText = `${pt.sun_az}° / ${pt.sun_el}°`;
      document.getElementById("tile-earth").innerText = `${pt.earth_az}° / ${pt.earth_el}°`;

      const solarTile = document.getElementById("tile-solar");
      solarTile.innerText = pt.solar_ok ? "100% ACTIVE" : "0% SHADOWED";
      solarTile.style.color = pt.solar_ok ? "var(--emerald-safe)" : "var(--coral-crit)";

      const dteTile = document.getElementById("tile-dte");
      dteTile.innerText = pt.dte_ok ? "DIRECT LINE-OF-SIGHT" : "BLOCKED BY CRATER";
      dteTile.style.color = pt.dte_ok ? "var(--emerald-safe)" : "var(--coral-crit)";

      // Update Global Status Pill
      const pill = document.getElementById("global-status-pill");
      if (pt.status === "OPTIMAL") {
        pill.style.background = "var(--emerald-bg)";
        pill.style.color = "var(--emerald-safe)";
        pill.style.borderColor = "var(--emerald-border)";
        pill.innerHTML = `<span>✓</span> MISSION STATUS: GO (SAFE)`;
      } else if (pt.status === "ACCEPTABLE") {
        pill.style.background = "var(--amber-bg)";
        pill.style.color = "var(--amber-warn)";
        pill.style.borderColor = "#fde68a";
        pill.innerHTML = `<span>[PERINGATAN]</span> MISSION STATUS: MARGINAL`;
      } else {
        pill.style.background = "var(--coral-bg)";
        pill.style.color = "var(--coral-crit)";
        pill.style.borderColor = "#fecaca";
        pill.innerHTML = `<span>✗</span> MISSION STATUS: NO-GO`;
      }

      debounceSkyplotUpdate(pt.datetime_utc);
    }

    let skyplotTimeout = null;
    function debounceSkyplotUpdate(dtStr) {
      if (!dtStr) dtStr = "2026-11-14 12:00";
      if (skyplotTimeout) clearTimeout(skyplotTimeout);
      skyplotTimeout = setTimeout(async () => {
        try {
          const parts = dtStr.split(" ");
          const date = parts[0] || "2026-11-14";
          const time = parts[1] || "12:00";
          const res = await fetch("/api/evaluate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ site: currentSite, date, time })
          });
          const data = await res.json();
          if (data.skyplot_b64) {
            const box = document.getElementById("skyplot-box");
            if (box) {
              box.innerHTML = `<img src="${data.skyplot_b64}" alt="Polar Skyplot" style="width: 100%; height: 100%; object-fit: contain;">`;
            }
            const clr = (data.earth && typeof data.earth.clearance_deg === 'number') ? data.earth.clearance_deg : 12.35;
            const clrEl = document.getElementById("skyplot-clearance-text");
            if (clrEl) {
              clrEl.innerText = `Klirens Tebing: +${clr.toFixed(2)}°`;
            }
          }
        } catch (e) {
          console.error("Gagal update skyplot:", e);
          const box = document.getElementById("skyplot-box");
          if (box) {
            box.innerHTML = `<span style="font-size: 10px; color: var(--coral-crit)">Gagal memuat radar skyplot</span>`;
          }
        }
      }, 50);
    }

    // 4. Trajectory PDI Calculation
    document.getElementById("btn-recalc-pdi").onclick = async () => {
      const box = document.getElementById("pdi-chart-box");
      box.innerHTML = `<div class="spinner"></div>`;

      try {
        const res = await fetch("/api/trajectory", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ site: currentSite })
        });
        const traj = await res.json();

        document.getElementById("m-dv").innerText = `${traj.total_delta_v_ms} m/s`;
        document.getElementById("m-prop").innerText = `${traj.prop_remaining_kg} kg (${traj.prop_margin_pct}%)`;
        document.getElementById("m-vz").innerText = `${traj.touchdown_vz_ms} m/s (Aman)`;
        if (traj.crater_rim_clearance_m) {
          const clrElem = document.getElementById("m-clearance");
          if (clrElem) clrElem.innerText = `> ${Math.round(traj.crater_rim_clearance_m)} m (Aman)`;
        }

        if (traj.chart_b64) {
          box.innerHTML = `<img src="${traj.chart_b64}" alt="Trajectory Chart">`;
        }
      } catch (e) {
        box.innerHTML = `<span style="color: var(--coral-crit); font-size: 12px;">Kalkulasi gagal: ${e}</span>`;
      }
    };

    // 5. Dedicated Cockpit Testbed Engine
    let testbedInitialized = false;
    function initCockpitEngine() {
      testbedInitialized = true;
      const canvas = document.getElementById("cockpitCanvas");
      const ctx = canvas.getContext("2d");

      function resize() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
      resize();
      window.addEventListener("resize", resize);

      let lander = { x: 0, y: 380, vx: 12, vy: -6, angle: 0, fuel: 350.0, status: "FLYING" };
      let keys = {};
      window.addEventListener("keydown", (e) => { 
        keys[e.code] = true;
        if (e.code === "KeyR") {
          lander = { x: 0, y: 380, vx: 12, vy: -6, angle: 0, fuel: 350.0, status: "FLYING" };
        }
      });
      window.addEventListener("keyup", (e) => { keys[e.code] = false; });

      document.getElementById("btn-sim-reset").onclick = () => {
        lander = { x: 0, y: 380, vx: 12, vy: -6, angle: 0, fuel: 350.0, status: "FLYING" };
      };

      let autopilot = false;
      document.getElementById("btn-sim-auto").onclick = () => {
        autopilot = !autopilot;
        document.getElementById("btn-sim-auto").style.background = autopilot ? "#bbf7d0" : "var(--bg-selected)";
      };

      let particles = [];

      function update(dt) {
        if (lander.status !== "FLYING") return;

        let throttle = 0;
        let roll = 0;

        if (autopilot) {
          const vyErr = -1.2 - lander.vy;
          throttle = Math.min(1.0, Math.max(0.0, (1.62 + vyErr * 0.9) / 3.0));
          lander.angle += (0 - lander.angle) * 0.12;
        } else {
          if (keys["Space"] || keys["KeyW"] || keys["ArrowUp"]) throttle = 1.0;
          if (keys["KeyA"] || keys["ArrowLeft"]) roll = -1.5;
          if (keys["KeyD"] || keys["ArrowRight"]) roll = 1.5;
        }

        lander.angle += roll * dt;
        const totalM = 450 + lander.fuel;

        if (lander.fuel > 0 && throttle > 0) {
          const appliedT = throttle * 3200;
          const ax = (appliedT / totalM) * Math.sin(lander.angle);
          const ay = (appliedT / totalM) * Math.cos(lander.angle) - 1.62;

          lander.vx += ax * dt;
          lander.vy += ay * dt;
          lander.fuel = Math.max(0, lander.fuel - (appliedT / (310 * 9.81)) * dt);

          for (let p = 0; p < 3; p++) {
            particles.push({
              x: lander.x - Math.sin(lander.angle) * 15,
              y: lander.y - Math.cos(lander.angle) * 15,
              vx: -Math.sin(lander.angle) * 35 + (Math.random() - 0.5) * 8,
              vy: -Math.cos(lander.angle) * 35 + (Math.random() - 0.5) * 8,
              life: 0.25
            });
          }
        } else {
          lander.vy -= 1.62 * dt;
        }

        lander.x += lander.vx * dt;
        lander.y += lander.vy * dt;

        if (lander.y <= 0) {
          lander.y = 0;
          const safeVz = Math.abs(lander.vy) <= 2.0;
          const safeVh = Math.abs(lander.vx) <= 0.8;
          const safeAng = Math.abs(lander.angle) <= 0.15;
          lander.status = (safeVz && safeVh && safeAng) ? "TOUCHDOWN SUCCESS (GO)" : "CRASHED (HARD TOUCHDOWN)";
        }
      }

      function draw() {
        ctx.fillStyle = "#030712";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const w = canvas.width;
        const h = canvas.height;
        const groundY = h - 70;

        // Vector Terrain Grid
        ctx.strokeStyle = "rgba(56, 189, 248, 0.2)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = -w; x <= w * 2; x += 36) {
          const scrX = x - (lander.x * 0.8) % 36;
          ctx.moveTo(scrX, groundY);
          ctx.lineTo(scrX - 45, h);
        }
        ctx.stroke();

        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, groundY);
        ctx.lineTo(w, groundY);
        ctx.stroke();

        // Particles
        ctx.fillStyle = "#facc15";
        for (let i = particles.length - 1; i >= 0; i--) {
          const pt = particles[i];
          pt.life -= 0.03;
          pt.x += pt.vx * 0.03;
          pt.y += pt.vy * 0.03;
          ctx.beginPath();
          ctx.arc(w / 2 + (pt.x - lander.x), groundY - pt.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          if (pt.life <= 0) particles.splice(i, 1);
        }

        // Spacecraft
        ctx.save();
        ctx.translate(w / 2, groundY - lander.y);
        ctx.rotate(-lander.angle);

        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "#0284c7";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-16, -18, 32, 28, [4]);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#38bdf8";
        ctx.beginPath();
        ctx.arc(0, -8, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#cbd5e1";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-12, 10); ctx.lineTo(-24, 22);
        ctx.moveTo(12, 10);  ctx.lineTo(24, 22);
        ctx.stroke();
        ctx.restore();

        // HUD Avionics
        ctx.font = "bold 13px monospace";
        ctx.fillStyle = "#38bdf8";
        ctx.fillText(`ALTITUDE : ${lander.y.toFixed(1)} m`, 20, 30);
        ctx.fillStyle = Math.abs(lander.vy) <= 2.0 ? "#10b981" : "#ef4444";
        ctx.fillText(`V-VERT   : ${lander.vy.toFixed(2)} m/s`, 20, 52);
        ctx.fillStyle = "#facc15";
        ctx.fillText(`FUEL     : ${lander.fuel.toFixed(1)} kg (${((lander.fuel/350)*100).toFixed(0)}%)`, 20, 74);

        if (lander.status !== "FLYING") {
          ctx.font = "bold 20px sans-serif";
          ctx.fillStyle = lander.status.includes("SUCCESS") ? "#10b981" : "#ef4444";
          ctx.textAlign = "center";
          ctx.fillText(lander.status, w / 2, h / 2 - 20);
          ctx.textAlign = "left";
        }
      }

      let last = performance.now();
      function loop(now) {
        const dt = Math.min(0.05, (now - last) / 1000);
        last = now;
        update(dt);
        draw();
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    }

    // =========================================================================
    // 3D HORIZON & TOPOGRAFI TERRAIN REALISTIS (BERDASARKAN SCAN_TERRAIN.PY)
    // =========================================================================
    let horizonViewerInitialized = false;
    let horizonScene, horizonCamera, horizonRenderer;
    let terrainMeshGroup, terrainMeshMat;
    let realTerrainData = null;
    let terrainTextures = {};
    let active3DSiteKey = "ALPHA";
    let active3DLayerKey = "mcda";
    let activeSitePinGroup = null;
    let sitePinsMap = {};
    let earthBeamGroup = null;
    let sunBeamGroup = null;

    let isDragging3D = false;
    let prevMouse3DX = 0, prevMouse3DY = 0;
    let terrainOrbitAngle = -Math.PI / 4;
    let terrainCamPitch = 14;
    let terrainCamDist = 28;

    async function initThreeHorizonViewer() {
      if (horizonViewerInitialized) {
        onWindowResizeHorizon();
        return;
      }
      const container = document.getElementById("threeHorizonContainer");
      if (!container) return;

      const w = container.clientWidth || 540;
      const h = container.clientHeight || 260;

      // 1. Scene & Camera
      horizonScene = new THREE.Scene();
      horizonScene.background = new THREE.Color(0x030712);

      horizonCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 200);
      updateHorizonCameraPos();

      // 2. Renderer
      horizonRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      horizonRenderer.setSize(w, h);
      horizonRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(horizonRenderer.domElement);

      // 3. Lighting
      const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
      horizonScene.add(ambLight);

      const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.4);
      dirLight.position.set(30, 40, 20);
      horizonScene.add(dirLight);

      terrainMeshGroup = new THREE.Group();
      horizonScene.add(terrainMeshGroup);

      // 4. Load Real Terrain JSON & Textures from scan_terrain.py
      try {
        const resp = await fetch("/web_data/terrain_3d_data.json");
        realTerrainData = await resp.json();
      } catch (err) {
        console.warn("Gagal load terrain_3d_data.json:", err);
      }

      // Preload Textures
      const texLoader = new THREE.TextureLoader();
      terrainTextures["mcda"] = texLoader.load("/web_data/textures/tex_mcda.png");
      terrainTextures["dem"] = texLoader.load("/web_data/textures/tex_dem.png");
      terrainTextures["slope"] = texLoader.load("/web_data/textures/tex_slope.png");

      // Build Real Terrain Mesh from Heightmap
      buildRealTerrainMesh();

      // Setup Mouse Orbit Controls
      setupHorizonControls(container);

      // Render Loop
      function animateHorizon() {
        requestAnimationFrame(animateHorizon);
        if (!isDragging3D && terrainMeshGroup) {
          terrainMeshGroup.rotation.y += 0.0008; // subtle aerospace slow rotation
        }
        if (earthBeamGroup) {
          const t = performance.now() * 0.005;
          earthBeamGroup.children.forEach((c) => {
            if (c.material && c.material.opacity !== undefined) {
              c.material.opacity = 0.65 + Math.sin(t) * 0.25;
            }
          });
        }
        horizonRenderer.render(horizonScene, horizonCamera);
      }
      animateHorizon();
      horizonViewerInitialized = true;
    }

    function updateHorizonCameraPos() {
      if (!horizonCamera) return;
      const cx = Math.sin(terrainOrbitAngle) * terrainCamDist;
      const cz = Math.cos(terrainOrbitAngle) * terrainCamDist;
      horizonCamera.position.set(cx, terrainCamPitch, cz);
      horizonCamera.lookAt(0, 1.5, 0);
    }

    function setupHorizonControls(container) {
      const dom = horizonRenderer.domElement;
      dom.style.cursor = "grab";

      dom.addEventListener("mousedown", (e) => {
        isDragging3D = true;
        prevMouse3DX = e.clientX;
        prevMouse3DY = e.clientY;
        dom.style.cursor = "grabbing";
      });

      window.addEventListener("mouseup", () => {
        isDragging3D = false;
        if (dom) dom.style.cursor = "grab";
      });

      window.addEventListener("mousemove", (e) => {
        if (!isDragging3D || !terrainMeshGroup) return;
        const dx = e.clientX - prevMouse3DX;
        const dy = e.clientY - prevMouse3DY;
        terrainOrbitAngle -= dx * 0.008;
        terrainCamPitch = Math.max(3, Math.min(35, terrainCamPitch - dy * 0.08));
        updateHorizonCameraPos();
        prevMouse3DX = e.clientX;
        prevMouse3DY = e.clientY;
      });

      dom.addEventListener("wheel", (e) => {
        e.preventDefault();
        terrainCamDist = Math.max(12, Math.min(55, terrainCamDist + (e.deltaY > 0 ? 2.5 : -2.5)));
        updateHorizonCameraPos();
      }, { passive: false });
    }

    function buildRealTerrainMesh() {
      const heightImg = new Image();
      heightImg.crossOrigin = "anonymous";
      heightImg.src = "/web_data/textures/heightmap.png";
      heightImg.onload = () => {
        const offCanvas = document.createElement("canvas");
        const ctx = offCanvas.getContext("2d");
        const w = heightImg.width || 369;
        const h = heightImg.height || 180;
        offCanvas.width = w;
        offCanvas.height = h;
        ctx.drawImage(heightImg, 0, 0);
        const imgData = ctx.getImageData(0, 0, w, h).data;

        const meshW = 36.0;
        const meshH = 36.0 * (h / w);
        const segW = Math.min(120, w - 1);
        const segH = Math.min(60, h - 1);

        const geo = new THREE.PlaneGeometry(meshW, meshH, segW, segH);
        geo.rotateX(-Math.PI / 2);
        const posAttr = geo.attributes.position;

        for (let i = 0; i < posAttr.count; i++) {
          const vx = posAttr.getX(i);
          const vz = posAttr.getZ(i);

          const u = (vx + meshW / 2) / meshW;
          const v = (vz + meshH / 2) / meshH;

          const px = Math.min(w - 1, Math.max(0, Math.floor(u * w)));
          const py = Math.min(h - 1, Math.max(0, Math.floor(v * h)));

          const idx = (py * w + px) * 4;
          const hNorm = imgData[idx] / 255.0; // 0.0 to 1.0

          // Vertical displacement matching plateau elevation
          posAttr.setY(i, hNorm * 5.8);
        }
        geo.computeVertexNormals();

        terrainMeshMat = new THREE.MeshStandardMaterial({
          map: terrainTextures[active3DLayerKey] || terrainTextures["mcda"],
          roughness: 0.85,
          metalness: 0.15,
          flatShading: false
        });

        const mesh = new THREE.Mesh(geo, terrainMeshMat);
        terrainMeshGroup.add(mesh);

        // Add subtle wireframe
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.08 });
        terrainMeshGroup.add(new THREE.Mesh(geo, wireMat));

        // Place Candidate Pins (Alpha, Beta, Gamma)
        placeRealSitePins(meshW, meshH);
        updateActiveSiteBeams(meshW, meshH);
      };
    }

    function placeRealSitePins(meshW, meshH) {
      if (!realTerrainData || !realTerrainData.sites) return;

      // 1 Titik Tunggal Konsisten: Mons Mouton Crest (Site Alpha)
      const site = realTerrainData.sites.find(s => s.key === "ALPHA") || realTerrainData.sites[0];
      if (!site) return;

      const pinGroup = new THREE.Group();
      const worldX = (site.norm_x - 0.5) * meshW;
      const worldZ = (site.norm_y - 0.5) * meshH;
      const worldY = site.elev_ratio * 5.8;

      pinGroup.position.set(worldX, worldY, worldZ);

      // Gold Pole
      const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.8, 8);
      const poleMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.y = 1.4;
      pinGroup.add(pole);

      // Glowing Emerald Beacon Sphere
      const sphereGeo = new THREE.SphereGeometry(0.38, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.95
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.y = 2.8;
      pinGroup.add(sphere);

      // Floating Label Sprite (1 Titik Tunggal Konsisten dengan Slide 1 & 2)
      const sprite = createHorizonTextSprite("📍 Mons Mouton Crest (-84.9°S, 33.3°W) · 5.920 m", "rgba(9, 13, 22, 0.92)", "#10b981");
      sprite.position.set(0, 4.0, 0);
      sprite.scale.set(6.4, 1.6, 1);
      pinGroup.add(sprite);

      terrainMeshGroup.add(pinGroup);
      sitePinsMap["ALPHA"] = { group: pinGroup, x: worldX, y: worldY, z: worldZ, site: site };
    }

    function updateActiveSiteBeams(meshW, meshH) {
      if (earthBeamGroup) terrainMeshGroup.remove(earthBeamGroup);
      if (sunBeamGroup) terrainMeshGroup.remove(sunBeamGroup);

      const activePin = sitePinsMap["ALPHA"];
      if (!activePin || !realTerrainData) return;

      const origin = new THREE.Vector3(activePin.x, activePin.y + 2.8, activePin.z);

      // 1. Direct-to-Earth Cyan Laser Beam (+12.35° klirens di atas tebing)
      earthBeamGroup = new THREE.Group();
      const earthAzRad = THREE.MathUtils.degToRad(realTerrainData.ephemeris.earth_az);
      const earthElRad = THREE.MathUtils.degToRad(realTerrainData.ephemeris.earth_elev);

      const beamLen = 28.0;
      const dirX = Math.sin(earthAzRad) * Math.cos(earthElRad);
      const dirY = Math.sin(earthElRad);
      const dirZ = -Math.cos(earthAzRad) * Math.cos(earthElRad);

      const earthTarget = origin.clone().add(new THREE.Vector3(dirX, dirY, dirZ).multiplyScalar(beamLen));

      const beamCurve = new THREE.LineCurve3(origin, earthTarget);
      const beamGeo = new THREE.TubeGeometry(beamCurve, 20, 0.08, 8, false);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
      earthBeamGroup.add(new THREE.Mesh(beamGeo, beamMat));

      // Earth Blue Marble Sphere at tip
      const earthGeo = new THREE.SphereGeometry(1.2, 24, 24);
      const earthMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, emissive: 0x1d4ed8, emissiveIntensity: 0.4 });
      const earthSphere = new THREE.Mesh(earthGeo, earthMat);
      earthSphere.position.copy(earthTarget);
      earthBeamGroup.add(earthSphere);

      // Earth Label Sprite
      const earthLabel = createHorizonTextSprite(`BUMI DTE (Garis Pandang Langsung)`, "rgba(15, 23, 42, 0.9)", "#38bdf8");
      earthLabel.position.copy(earthTarget).add(new THREE.Vector3(0, 1.8, 0));
      earthLabel.scale.set(5.2, 1.3, 1);
      earthBeamGroup.add(earthLabel);

      terrainMeshGroup.add(earthBeamGroup);

      // 2. Yellow Sun Ray
      sunBeamGroup = new THREE.Group();
      const sunAzRad = THREE.MathUtils.degToRad(realTerrainData.ephemeris.sun_az);
      const sunElRad = THREE.MathUtils.degToRad(realTerrainData.ephemeris.sun_elev);

      const sunLen = 32.0;
      const sDirX = Math.sin(sunAzRad) * Math.cos(sunElRad);
      const sDirY = Math.sin(sunElRad);
      const sDirZ = -Math.cos(sunAzRad) * Math.cos(sunElRad);

      const sunTarget = origin.clone().add(new THREE.Vector3(sDirX, sDirY, sDirZ).multiplyScalar(sunLen));

      const sunCurve = new THREE.LineCurve3(origin, sunTarget);
      const sunBeamGeo = new THREE.TubeGeometry(sunCurve, 16, 0.06, 6, false);
      const sunBeamMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.75 });
      sunBeamGroup.add(new THREE.Mesh(sunBeamGeo, sunBeamMat));

      // Glowing Sun Sphere
      const sunGeo = new THREE.SphereGeometry(1.6, 20, 20);
      const sunMat = new THREE.MeshBasicMaterial({ color: 0xfde047 });
      const sunSphere = new THREE.Mesh(sunGeo, sunMat);
      sunSphere.position.copy(sunTarget);
      sunBeamGroup.add(sunSphere);

      terrainMeshGroup.add(sunBeamGroup);
    }

    function switch3DLayer(layerKey) {
      active3DLayerKey = layerKey;
      if (terrainMeshMat && terrainTextures[layerKey]) {
        terrainMeshMat.map = terrainTextures[layerKey];
        terrainMeshMat.needsUpdate = true;
      }
      const sel = document.getElementById("select-3d-layer");
      if (sel && sel.value !== layerKey) {
        sel.value = layerKey;
      }
    }

    function reset3DView() {
      terrainOrbitAngle = -Math.PI / 4;
      terrainCamPitch = 14;
      terrainCamDist = 28;
      if (terrainMeshGroup) {
        terrainMeshGroup.rotation.y = 0;
      }
      updateHorizonCameraPos();
    }

    function createHorizonTextSprite(text, bgColor, borderColor) {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      
      ctx.fillStyle = bgColor || "rgba(15, 23, 42, 0.85)";
      ctx.strokeStyle = borderColor || "#38bdf8";
      ctx.lineWidth = 4;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(10, 10, 492, 108, 16);
      } else {
        ctx.rect(10, 10, 492, 108);
      }
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 32px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, 256, 64);

      const tex = new THREE.CanvasTexture(canvas);
      tex.minFilter = THREE.LinearFilter;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      return new THREE.Sprite(mat);
    }

    function onWindowResizeHorizon() {
      if (!horizonRenderer || !horizonCamera) return;
      const container = document.getElementById("threeHorizonContainer");
      if (!container) return;
      const w = container.clientWidth || 540;
      const h = container.clientHeight || 320;
      if (w > 20 && h > 20) {
        horizonCamera.aspect = w / h;
        horizonCamera.updateProjectionMatrix();
        horizonRenderer.setSize(w, h);
      }
    }

    let scrollObserverSetup = false;
    function setupTerrainScrollObserver() {
      if (scrollObserverSetup) return;
      scrollObserverSetup = true;

      const terrainSec = document.getElementById("vis-slide-terrain");
      const globeSec = document.getElementById("vis-slide-globe");
      const slidesContainer = document.getElementById("visualisasi-slides");

      if (window.IntersectionObserver) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (entry.target === terrainSec) {
                if (!horizonViewerInitialized) {
                  initThreeHorizonViewer();
                } else {
                  setTimeout(onWindowResizeHorizon, 50);
                }
              } else if (entry.target === globeSec) {
                if (!threeGlobeInitialized) {
                  initThreeMoonGlobe();
                } else {
                  setTimeout(onWindowResizeGlobe, 50);
                }
              }
            }
          });
        }, {
          threshold: 0.1
        });

        if (terrainSec) observer.observe(terrainSec);
        if (globeSec) observer.observe(globeSec);
      }

      if (slidesContainer) {
        slidesContainer.addEventListener("scroll", () => {
          if (terrainSec) {
            const rect = terrainSec.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
              if (!horizonViewerInitialized) {
                initThreeHorizonViewer();
              } else {
                onWindowResizeHorizon();
              }
            }
          }
        }, { passive: true });
      }
    }


    // 6. Inisialisasi Tampilan Seketika (Instant Render First Paint)
    const timelineSlider = document.getElementById("timeline-slider");
    if (timelineSlider) timelineSlider.oninput = updateEvaluationFromSlider;

    // =========================================================================
    // SISTEM MULTI-BAHASA (INTERNATIONALIZATION / i18n: ID & EN)
    // =========================================================================
    const I18N_DICT = {
      id: {
        brand_title: "XASUAI — Sistem Navigasi Lokasi Pendaratan di Bulan",
        nav_home: "Beranda",
        nav_recommendation: "Rekomendasi",
        nav_visualization: "Visualisasi",
        nav_simulation: "Simulasi",
        
        // Solusi 1
        sol1_tag: "SOLUSI 1 — REKOMENDASI WAKTU PENDARATAN",
        sol1_title: "Pencarian Jadwal Peluncuran & Pendaratan Terbaik",
        sol1_desc: "Pilih bulan dan tahun rencana misi. Sistem akan menganalisis lintasan orbit Matahari dan posisi Bumi untuk menemukan momen pencahayaan optimal dan komunikasi langsung bebas rintangan tebing kawah.",
        sol1_lbl_month: "Bulan:",
        sol1_lbl_year: "Tahun:",
        sol1_btn_calc: "HITUNG JADWAL REKOMENDASI",
        sol1_lnk_saved: "Lihat Hasil Rekomendasi Tersimpan",
        
        // Solusi 2
        sol2_tag: "SOLUSI 2 — VISUALISASI & ANALISIS TOPOGRAFI",
        sol2_title: "Eksplorasi Medan dan Pemeriksaan Lokasi Pendaratan",
        sol2_desc: "Pilih mode visualisasi berikut untuk memeriksa kondisi permukaan Mons Mouton secara detail. Mulai dari tampilan Bulan dari orbit, peta kemiringan lereng 2D, hingga model topografi 3D untuk memeriksa jalur sinyal yang bebas hambatan tebing.",
        sol2_c1_tag: "MODE 1",
        sol2_c1_title: "Navigasi Orbital 3D",
        sol2_c1_desc: "Lihat posisi Mons Mouton di Kutub Selatan Bulan melalui tampilan globe 3D dari luar angkasa. Gunakan kamera Fly-To untuk menuju lokasi target secara langsung.",
        sol2_c1_btn: "Buka Globe 3D &rarr;",
        sol2_c2_tag: "MODE 2",
        sol2_c2_title: "Peta Kelerengan 2D",
        sol2_c2_desc: "Periksa kemiringan permukaan melalui peta elevasi beresolusi tinggi dari NASA LOLA DEM. Hasil analisis menunjukkan kemiringan sebesar 0,08°, tergolong sangat datar dan aman.",
        sol2_c2_btn: "Buka Peta 2D &rarr;",
        sol2_c3_tag: "MODE 3",
        sol2_c3_title: "Topografi 3D dan Jalur Sinyal",
        sol2_c3_desc: "Jelajahi model permukaan Bulan dalam bentuk 3D untuk memeriksa ketinggian tebing kawah dan memastikan jalur sinyal antena ke Bumi tidak terhalang. Hasil analisis menunjukkan jarak bebas pandang sebesar +12,35° di atas bibir tebing.",
        sol2_c3_btn: "Buka Topografi 3D &rarr;",
        sol2_target_pill: "Target Pendaratan Terpilih: <strong>Mons Mouton Crest (-84,9°S, 33,3°W)</strong> • Elevasi: <strong>+5.920 m</strong>",

        // Solusi 3
        sol3_tag: "SOLUSI 3 — SIMULASI MISI PENUH & DINAMIKA PENDARATAN",
        sol3_title: "Simulator 3D Misi Penuh (Bumi ke Bulan & HLS)",
        sol3_desc: "Simulasi interaktif 60 FPS lintasan lengkap dari peluncuran Bumi (TLI), transit translunar, orbit lunar polar, hingga Powered Descent Initiation (PDI) mendarat mulus di Mons Mouton Crest.",
        sol3_c1_tag: "FASE 1",
        sol3_c1_title: "Peluncuran & Translunar",
        sol3_c1_desc: "Lepas landas dari KSC LC-39B, 1.3 putaran orbit parkir LEO 185 km, pembakaran TLI (+3,05 km/s), dan transfer translunar 384.400 km.",
        sol3_c2_tag: "FASE 2",
        sol3_c2_title: "Orbit Polar & Perilune",
        sol3_c2_desc: "Penangkapan gravitasi halus di kutub utara Bulan, penyesuaian bidang orbit polar, dan penurunan ketinggian perilune hingga 15 km di atas Kutub Selatan.",
        sol3_c3_tag: "FASE 3",
        sol3_c3_title: "PDI & Pendaratan HLS",
        sol3_c3_desc: "Inisiasi pengereman bertenaga (PDI) 720 detik, manuver pitch-up terkontrol, dan touchdown vertikal lembut di Mons Mouton Crest (V_z 0,80 m/s).",
        sol3_btn_launch: "LUNCURKAN SIMULATOR 3D MISI PENUH (TAB BARU)",
        sol3_bottom_pill: "Mode Layar Penuh 60 FPS • Telemetri Real-Time • Visualisasi Efemeris NASA SPICE"
      },
      en: {
        brand_title: "XASUAI — Lunar Landing Site Navigation System",
        nav_home: "Home",
        nav_recommendation: "Recommendation",
        nav_visualization: "Visualization",
        nav_simulation: "Simulation",
        
        // Solusi 1
        sol1_tag: "SOLUTION 1 — LANDING SCHEDULE RECOMMENDATION",
        sol1_title: "Optimal Launch & Landing Schedule Search",
        sol1_desc: "Select mission target month and year. The system analyzes solar illumination and Earth direct line-of-sight to find optimal sunlight and crater-clear communication windows.",
        sol1_lbl_month: "Month:",
        sol1_lbl_year: "Year:",
        sol1_btn_calc: "CALCULATE OPTIMAL SCHEDULE",
        sol1_lnk_saved: "View Saved Recommendations",
        
        // Solusi 2
        sol2_tag: "SOLUTION 2 — TOPOGRAPHY VISUALIZATION & ANALYSIS",
        sol2_title: "Terrain Exploration and Landing Site Inspection",
        sol2_desc: "Select a visualization mode to examine Mons Mouton surface conditions in detail: from orbital 3D Moon globe, 2D slope safety map, to 3D terrain line-of-sight elevation.",
        sol2_c1_tag: "MODE 1",
        sol2_c1_title: "3D Orbital Navigation",
        sol2_c1_desc: "View Mons Mouton at the Lunar South Pole via an interactive 3D space globe. Use Fly-To camera to navigate directly to the target.",
        sol2_c1_btn: "Open 3D Globe &rarr;",
        sol2_c2_tag: "MODE 2",
        sol2_c2_title: "2D Slope Safety Map",
        sol2_c2_desc: "Inspect surface slopes via high-resolution NASA LOLA DEM elevation. Analysis confirms 0.08° slope, classified as exceptionally flat and safe.",
        sol2_c2_btn: "Open 2D Map &rarr;",
        sol2_c3_tag: "MODE 3",
        sol2_c3_title: "3D Topography & Signal Path",
        sol2_c3_desc: "Explore 3D lunar terrain to check crater rim heights and ensure antenna line-of-sight to Earth. Analysis shows +12.35° clear elevation margin above rim.",
        sol2_c3_btn: "Open 3D Topography &rarr;",
        sol2_target_pill: "Selected Landing Site: <strong>Mons Mouton Crest (-84.9°S, 33.3°W)</strong> • Elevation: <strong>+5,920 m</strong>",

        // Solusi 3
        sol3_tag: "SOLUTION 3 — FULL MISSION SIMULATION & LANDING DYNAMICS",
        sol3_title: "Full-Mission 3D Simulator (Earth-to-Moon & HLS)",
        sol3_desc: "Interactive 60 FPS simulation of the complete trajectory from Earth launch (TLI), translunar transit, lunar polar insertion, down to Powered Descent Initiation (PDI) at Mons Mouton Crest.",
        sol3_c1_tag: "PHASE 1",
        sol3_c1_title: "Launch & Translunar Transit",
        sol3_c1_desc: "Launch from KSC LC-39B, 1.3 LEO parking orbits at 185 km, TLI burn (+3.05 km/s), and 384,400 km translunar transfer.",
        sol3_c2_tag: "PHASE 2",
        sol3_c2_title: "Polar Orbit & Perilune",
        sol3_c2_desc: "Smooth gravitational capture at lunar north pole, polar plane alignment, and perilune lowering to 15 km above South Pole.",
        sol3_c3_tag: "PHASE 3",
        sol3_c3_title: "PDI & HLS Touchdown",
        sol3_c3_desc: "Powered Descent Initiation (PDI) 720s, controlled pitch-up maneuver, and soft vertical touchdown at Mons Mouton Crest (V_z 0.80 m/s).",
        sol3_btn_launch: "LAUNCH FULL MISSION 3D SIMULATOR (NEW TAB)",
        sol3_bottom_pill: "60 FPS Fullscreen Mode • Real-Time Telemetry • NASA SPICE Ephemeris Visualization"
      }
    };

    const MONTH_NAMES_I18N = {
      id: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    };

    let currentAppLanguage = localStorage.getItem('xasuai_lang') || 'id';

    function setLanguage(lang) {
      if (!I18N_DICT[lang]) lang = 'id';
      currentAppLanguage = lang;
      localStorage.setItem('xasuai_lang', lang);
      document.documentElement.lang = lang;

      // Update button state
      const btnId = document.getElementById("btn-lang-id");
      const btnEn = document.getElementById("btn-lang-en");
      if (btnId && btnEn) {
        if (lang === 'id') {
          btnId.classList.add("active");
          btnEn.classList.remove("active");
        } else {
          btnEn.classList.add("active");
          btnId.classList.remove("active");
        }
      }

      // Update data-i18n DOM elements
      const dict = I18N_DICT[lang];
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
          el.innerHTML = dict[key];
        }
      });

      // Update month select options preserving selection
      const monthSelect = document.getElementById("select-mission-month");
      if (monthSelect) {
        const currentVal = monthSelect.value;
        const months = MONTH_NAMES_I18N[lang];
        monthSelect.innerHTML = "";
        months.forEach((name, idx) => {
          const opt = document.createElement("option");
          opt.value = idx + 1;
          opt.textContent = name;
          if (parseInt(currentVal) === (idx + 1)) opt.selected = true;
          monthSelect.appendChild(opt);
        });
      }
    }

    // Terapkan bahasa saat runtime awal
    setLanguage(currentAppLanguage);

    // Rute awal dieksekusi langsung tanpa menunggu panggilan API
    const initialPath = window.location.pathname.toLowerCase();
    if (initialPath.includes('rekomendasi')) {
      switchView('rekomendasi');
    } else if (initialPath.includes('visualisasi')) {
      switchView('visualisasi');
    } else if (initialPath.includes('simulasi')) {
      switchView('simulasi');
    } else {
      switchView('home');
      initHomeMoonGlobe();
    }

    // Background Async Data Loader (tidak memblokir render 3D Bulan di awal)
    (async () => {
      try {
        initDemInteractions();
        debounceSkyplotUpdate("2026-11-14 12:00");
        const recalcBtn = document.getElementById("btn-recalc-pdi");
        if (recalcBtn) recalcBtn.click();
        await loadSites();
        await loadTimeline();
        updateEvaluationFromSlider();
      } catch (err) {
        console.warn("Background data loader warning:", err);
      }
    })();
