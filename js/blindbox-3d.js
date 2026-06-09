/* ═══════════════════════════════════════════
   彩色小球物理沙盒 — 首屏右侧
   挥动鼠标/手指击飞灵感球
   ═══════════════════════════════════════════ */
(function () {
  'use strict';
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('ballsCanvas');
  if (!canvas) return;
  const stage = canvas.parentElement;

  let width = stage.clientWidth;
  let height = stage.clientHeight;
  const scene = new THREE.Scene();
  let viewSize = 5;
  let aspect = width / height;
  const camera = new THREE.OrthographicCamera(-viewSize * aspect, viewSize * aspect, viewSize, -viewSize, 0.1, 100);
  camera.position.z = 10;
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 灯光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight.position.set(3, 5, 4);
  scene.add(dirLight);
  const backLight = new THREE.PointLight(0xff88aa, 0.4);
  backLight.position.set(0, 0, 3);
  scene.add(backLight);

  // 炫彩灵感球体
  const ballsData = [
    { color: 0xFF64AE, radius: 0.58, label: "💡 传播策划" },
    { color: 0xFF4D4D, radius: 0.64, label: "🔥 热点营销" },
    { color: 0x8B5CF6, radius: 0.6, label: "🤖 AI产品" },
    { color: 0x3B82F6, radius: 0.52, label: "📊 数据洞察" },
    { color: 0x06B6D4, radius: 0.55, label: "⚡ Vibe Coding" },
    { color: 0x10B981, radius: 0.57, label: "🌊 网感一流" },
    { color: 0xF59E0B, radius: 0.62, label: "🎨 AI内容" }
  ];
  const balls = [];
  ballsData.forEach(function (data) {
    const geometry = new THREE.SphereGeometry(data.radius, 48, 48);
    const material = new THREE.MeshPhysicalMaterial({
      color: data.color,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.35,
      clearcoat: 0.9,
      ior: 1.45
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 3.5, viewSize + Math.random() * 2.5, 0);
    scene.add(mesh);
    balls.push({
      mesh: mesh,
      radius: data.radius,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1,
      mass: data.radius * 1.8
    });
  });

  var GRAVITY = -0.16;
  var BOUNCE = 0.73;
  var BALL_BOUNCE = 0.85;
  var mouseWorld = new THREE.Vector3(0, 0, 0);
  var prevMouse = new THREE.Vector3(0, 0, 0);
  var mouseVel = new THREE.Vector3(0, 0, 0);
  var MOUSE_FORCE_RADIUS = 0.85;

  function getMousePosFromEvent(clientX, clientY) {
    var rect = renderer.domElement.getBoundingClientRect();
    var mx = ((clientX - rect.left) / rect.width) * 2 - 1;
    var my = -((clientY - rect.top) / rect.height) * 2 + 1;
    var curAspect = stage.clientWidth / stage.clientHeight;
    return new THREE.Vector3(mx * viewSize * curAspect, my * viewSize, 0);
  }

  function handlePointerMove(clientX, clientY) {
    var newPos = getMousePosFromEvent(clientX, clientY);
    prevMouse.copy(mouseWorld);
    mouseWorld.copy(newPos);
    mouseVel.subVectors(mouseWorld, prevMouse);
  }

  window.addEventListener('mousemove', function (e) {
    handlePointerMove(e.clientX, e.clientY);
  });
  window.addEventListener('touchmove', function (e) {
    if (e.touches.length) {
      e.preventDefault();
      handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: false });
  window.addEventListener('touchstart', function (e) {
    if (e.touches.length) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
  });

  function updatePhysics() {
    var currentWidth = stage.clientWidth;
    var currentHeight = stage.clientHeight;
    var currentAspect = currentWidth / currentHeight;
    var rightWall = viewSize * currentAspect;
    var leftWall = -viewSize * currentAspect;
    var topWall = viewSize;
    var bottomWall = -viewSize + 0.3;

    balls.forEach(function (ball, idx) {
      ball.vy += GRAVITY * 0.16;
      ball.mesh.position.x += ball.vx;
      ball.mesh.position.y += ball.vy;
      // 边界碰撞
      if (ball.mesh.position.y - ball.radius < bottomWall) {
        ball.mesh.position.y = bottomWall + ball.radius;
        ball.vy = -ball.vy * BOUNCE;
        ball.vx *= 0.98;
      }
      if (ball.mesh.position.y + ball.radius > topWall) {
        ball.mesh.position.y = topWall - ball.radius;
        ball.vy = -ball.vy * BOUNCE;
      }
      if (ball.mesh.position.x + ball.radius > rightWall) {
        ball.mesh.position.x = rightWall - ball.radius;
        ball.vx = -ball.vx * BOUNCE;
      }
      if (ball.mesh.position.x - ball.radius < leftWall) {
        ball.mesh.position.x = leftWall + ball.radius;
        ball.vx = -ball.vx * BOUNCE;
      }

      // 鼠标力场互动
      var dist = ball.mesh.position.distanceTo(mouseWorld);
      if (dist < ball.radius + MOUSE_FORCE_RADIUS) {
        var dir = new THREE.Vector3().subVectors(ball.mesh.position, mouseWorld).normalize();
        var overlap = (ball.radius + MOUSE_FORCE_RADIUS) - dist;
        ball.mesh.position.addScaledVector(dir, overlap);
        ball.vx += dir.x * 0.18 + mouseVel.x * 0.65;
        ball.vy += dir.y * 0.18 + mouseVel.y * 0.65;
      }

      // 球与球碰撞
      for (var j = idx + 1; j < balls.length; j++) {
        var other = balls[j];
        var delta = new THREE.Vector3().subVectors(other.mesh.position, ball.mesh.position);
        var dist2 = delta.length();
        var minDist = ball.radius + other.radius;
        if (dist2 < minDist) {
          var norm = delta.clone().normalize();
          var overlapDist = minDist - dist2;
          ball.mesh.position.addScaledVector(norm, -overlapDist * 0.5);
          other.mesh.position.addScaledVector(norm, overlapDist * 0.5);
          var relVX = ball.vx - other.vx, relVY = ball.vy - other.vy;
          var p = 2 * (norm.x * relVX + norm.y * relVY) / (ball.mass + other.mass);
          ball.vx -= p * other.mass * norm.x * BALL_BOUNCE;
          ball.vy -= p * other.mass * norm.y * BALL_BOUNCE;
          other.vx += p * ball.mass * norm.x * BALL_BOUNCE;
          other.vy += p * ball.mass * norm.y * BALL_BOUNCE;
        }
      }
      ball.mesh.rotation.z -= ball.vx * 0.12;
      ball.mesh.rotation.x += ball.vy * 0.12;
    });
    mouseVel.multiplyScalar(0.92);
  }

  function animate() {
    requestAnimationFrame(animate);
    updatePhysics();
    renderer.render(scene, camera);
  }
  animate();

  function handleResize() {
    var newW = stage.clientWidth;
    var newH = stage.clientHeight;
    var newAspect = newW / newH;
    camera.left = -viewSize * newAspect;
    camera.right = viewSize * newAspect;
    camera.top = viewSize;
    camera.bottom = -viewSize;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  }
  window.addEventListener('resize', handleResize);
  setTimeout(handleResize, 100);
})();
