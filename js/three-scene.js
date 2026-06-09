/* ═══════════════════════════════════════════
   Three.js 3D Interactive Scene — Hero Canvas
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  /* ── Setup ── */
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 6);

  /* ── Theme-aware colors ── */
  function getColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    return {
      primary: isDark ? 0xe88aaf : 0xd4789c,
      secondary: isDark ? 0xc088e8 : 0xb07cd8,
      tertiary: isDark ? 0x9898e8 : 0x8888d8,
      wireframe: isDark ? 0x2a2a4a : 0xe8e0f0,
      particle: isDark ? 0xe88aaf : 0xd4789c,
    };
  }

  /* ── Central geometry: icosahedron wireframe ── */
  const colors = getColors();
  const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
  const icoMat = new THREE.MeshBasicMaterial({
    color: colors.wireframe,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const ico = new THREE.Mesh(icoGeo, icoMat);
  scene.add(ico);

  /* ── Orbiting rings ── */
  const ringGroup = new THREE.Group();
  scene.add(ringGroup);

  function createRing(radius, color, thickness) {
    const geo = new THREE.TorusGeometry(radius, thickness, 16, 64);
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.2,
    });
    return new THREE.Mesh(geo, mat);
  }

  const ring1 = createRing(2.0, colors.primary, 0.012);
  ring1.rotation.x = Math.PI * 0.35;
  ring1.rotation.y = Math.PI * 0.1;
  ringGroup.add(ring1);

  const ring2 = createRing(2.4, colors.secondary, 0.01);
  ring2.rotation.x = Math.PI * 0.6;
  ring2.rotation.y = Math.PI * 0.4;
  ringGroup.add(ring2);

  const ring3 = createRing(1.7, colors.tertiary, 0.008);
  ring3.rotation.x = Math.PI * 0.15;
  ring3.rotation.z = Math.PI * 0.5;
  ringGroup.add(ring3);

  /* ── Floating particles ── */
  const particleCount = 120;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  for (let i = 0; i < particleCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const r = 2.5 + Math.random() * 2.5;
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    velocities.push({
      x: (Math.random() - 0.5) * 0.003,
      y: (Math.random() - 0.5) * 0.003,
      z: (Math.random() - 0.5) * 0.003,
    });
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: colors.particle,
    size: 0.04,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  /* ── Inner glow sphere ── */
  const glowGeo = new THREE.SphereGeometry(0.8, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: colors.primary,
    transparent: true,
    opacity: 0.06,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  scene.add(glow);

  /* ── Mouse interaction ── */
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      onMouseMove(e.touches[0]);
    }
  }, { passive: true });

  /* ── Resize ── */
  function resize() {
    const parent = canvas.parentElement;
    if (!parent) return;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  window.addEventListener('resize', resize);
  resize();

  /* ── Theme observer ── */
  const observer = new MutationObserver(() => {
    const c = getColors();
    icoMat.color.setHex(c.wireframe);
    ring1.material.color.setHex(c.primary);
    ring2.material.color.setHex(c.secondary);
    ring3.material.color.setHex(c.tertiary);
    particleMat.color.setHex(c.particle);
    glowMat.color.setHex(c.primary);
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  /* ── Animation loop ── */
  let time = 0;

  function animate() {
    requestAnimationFrame(animate);
    time += 0.008;

    // Smooth mouse follow
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Rotate central icosahedron
    ico.rotation.x = time * 0.3 + mouse.y * 0.3;
    ico.rotation.y = time * 0.2 + mouse.x * 0.3;

    // Pulse scale
    const pulse = 1 + Math.sin(time * 2) * 0.03;
    ico.scale.setScalar(pulse);

    // Rotate rings at different speeds
    ring1.rotation.z = time * 0.15;
    ring2.rotation.z = -time * 0.1;
    ring3.rotation.y = time * 0.2;

    // Subtle ring tilt from mouse
    ringGroup.rotation.x = mouse.y * 0.15;
    ringGroup.rotation.y = mouse.x * 0.15;

    // Animate particles
    const posArr = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      posArr[i * 3] += velocities[i].x;
      posArr[i * 3 + 1] += velocities[i].y;
      posArr[i * 3 + 2] += velocities[i].z;

      // Soft boundary — reverse if too far
      const dist = Math.sqrt(
        posArr[i * 3] ** 2 +
        posArr[i * 3 + 1] ** 2 +
        posArr[i * 3 + 2] ** 2
      );
      if (dist > 5 || dist < 1.5) {
        velocities[i].x *= -1;
        velocities[i].y *= -1;
        velocities[i].z *= -1;
      }
    }
    particleGeo.attributes.position.needsUpdate = true;

    // Glow pulse
    const glowScale = 1 + Math.sin(time * 1.5) * 0.1;
    glow.scale.setScalar(glowScale);
    glow.material.opacity = 0.04 + Math.sin(time * 2) * 0.02;

    // Camera subtle sway
    camera.position.x = mouse.x * 0.3;
    camera.position.y = mouse.y * 0.2;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();
})();
