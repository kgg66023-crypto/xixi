/* ═══════════════════════════════════════════
   App — Main Logic
   ═══════════════════════════════════════════ */
(function () {
  'use strict';

  /* ════════════════════════════════════════
     1. Typewriter Effect
     ════════════════════════════════════════ */
  class Typewriter {
    constructor(el) {
      this.el = el;
      this.texts = {
        zh: '1 person + AI = 灵感无限',
        en: '1 person + AI = Infinite Inspiration',
      };
      this.speed = 80;
      this.deleteSpeed = 40;
      this.pauseTime = 2500;
      this.loop();
    }

    getText() {
      const lang = document.documentElement.getAttribute('data-lang') || 'zh';
      return this.texts[lang];
    }

    async loop() {
      while (true) {
        const text = this.getText();
        // Type in
        for (let i = 0; i <= text.length; i++) {
          this.el.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
          await this.wait(this.speed);
        }
        await this.wait(this.pauseTime);
        // Type out
        for (let i = text.length; i >= 0; i--) {
          this.el.innerHTML = text.slice(0, i) + '<span class="cursor"></span>';
          await this.wait(this.deleteSpeed);
        }
        await this.wait(500);
      }
    }

    restart() {
      // Will pick up new text on next cycle
    }

    wait(ms) {
      return new Promise((r) => setTimeout(r, ms));
    }
  }

  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    window.typewriterInstance = new Typewriter(typewriterEl);
  }

  /* ════════════════════════════════════════
     2. Theme Toggle
     ════════════════════════════════════════ */
  const themeToggle = document.getElementById('themeToggle');

  function getPreferredTheme() {
    const stored = localStorage.getItem('theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  setTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ════════════════════════════════════════
     3. Language Toggle
     ════════════════════════════════════════ */
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
  }

  /* ════════════════════════════════════════
     4. Navbar Scroll Effect
     ════════════════════════════════════════ */
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('.section, .hero');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  function updateActiveNav() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.id;
      }
    });
    navLinksAll.forEach((a) => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) {
        a.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

  /* ════════════════════════════════════════
     5. Mobile Menu
     ════════════════════════════════════════ */
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ════════════════════════════════════════
     6. Scroll Reveal (AOS-like)
     ════════════════════════════════════════ */
  function initScrollReveal() {
    const els = document.querySelectorAll('[data-aos]');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  initScrollReveal();

  /* ── Reveal items (timeline cards) ── */
  function initRevealItems() {
    const items = document.querySelectorAll('.reveal-item');
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10px 0px' }
    );

    items.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 50) {
        el.classList.add('revealed');
      } else {
        observer.observe(el);
      }
    });
  }

  initRevealItems();

  /* ── 点击放大弹窗 ── */
  (function initLightbox() {
    var overlay = document.getElementById('lightboxOverlay');
    var lightboxImg = document.getElementById('lightboxImg');
    var closeBtn = document.getElementById('lightboxClose');
    if (!overlay || !lightboxImg) return;

    document.querySelectorAll('.lightbox-trigger[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.stopPropagation();
        lightboxImg.src = el.getAttribute('data-lightbox');
        overlay.classList.add('active');
      });
    });

    function closeLightbox() {
      overlay.classList.remove('active');
      lightboxImg.src = '';
    }

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  })();

  /* ── 捕获野生西西墙（底轨抽取+全屏泡泡） ── */
  (function initSafari() {
    var wrapper = document.querySelector('.safari-section');
    var canvas = document.getElementById('bubbleCanvas');
    var ctx = canvas ? canvas.getContext('2d') : null;
    var track = document.getElementById('safariTrack');
    var showcase = document.getElementById('safariShowcase');
    if (!wrapper || !canvas || !ctx || !track || !showcase) return;

    // 音效管理（本地文件 + 防轰炸）
    var isSoundMuted = false;
    var muteBtn = document.getElementById('bubbleMuteBtn');
    var lastPlayTime = 0;
    var bubbleSoundURLs = [
      'assets/music/1.ogg',
      'assets/music/2.mp3',
      'assets/music/3.mp3',
      'assets/music/4.mp3'
    ];
    var audioPool = bubbleSoundURLs.map(function (src) {
      var a = new Audio(src);
      a.preload = 'auto';
      a.volume = 0.4;
      return a;
    });
    function playPopSound() {
      if (isSoundMuted) return;
      var now = Date.now();
      if (now - lastPlayTime < 50) { if (Math.random() > 0.4) return; }
      lastPlayTime = now;
      var idx = Math.floor(Math.random() * audioPool.length);
      var clone = audioPool[idx].cloneNode();
      clone.volume = 0.35;
      clone.play().catch(function () {});
    }
    if (muteBtn) {
      muteBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        isSoundMuted = !isSoundMuted;
        muteBtn.innerText = isSoundMuted ? '🔇' : '🔊';
        muteBtn.style.background = isSoundMuted ? 'rgba(255,75,114,0.3)' : 'rgba(255,255,255,0.15)';
      });
    }

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    // 泡泡引擎
    var backgroundBubbles = [];
    var burstParticles = [];

    function Bubble() { this.reset(); this.y = Math.random() * (canvas.height - 300); }
    Bubble.prototype.reset = function () {
      this.radius = Math.random() * 35 + 15;
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + this.radius + Math.random() * 100;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = -1.55;
      this.wobbleSpeed = Math.random() * 0.02;
      this.wobbleCount = Math.random() * 100;
    };
    Bubble.prototype.update = function () {
      this.x += this.vx + Math.sin(this.wobbleCount) * 0.3;
      this.y += this.vy;
      this.wobbleCount += this.wobbleSpeed;
      if (this.y < -this.radius) this.reset();
    };
    Bubble.prototype.draw = function () {
      ctx.save();
      var g = ctx.createRadialGradient(this.x - this.radius * 0.2, this.y - this.radius * 0.2, this.radius * 0.3, this.x, this.y, this.radius);
      g.addColorStop(0, 'rgba(255,255,255,0.01)');
      g.addColorStop(0.65, 'rgba(238,130,238,0.05)');
      g.addColorStop(0.85, 'rgba(0,255,255,0.09)');
      g.addColorStop(0.95, 'rgba(255,255,255,0.35)');
      g.addColorStop(1, 'rgba(139,92,246,0.15)');
      ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();
      ctx.beginPath(); ctx.arc(this.x - this.radius * 0.45, this.y - this.radius * 0.45, this.radius * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill();
      ctx.restore();
    };

    function Particle(x, y, color) {
      this.x = x; this.y = y; this.radius = Math.random() * 4 + 1; this.color = color;
      this.vx = (Math.random() - 0.5) * 7; this.vy = (Math.random() - 0.5) * 7 - 2; this.opacity = 1;
    }
    Particle.prototype.update = function () { this.x += this.vx; this.y += this.vy; this.vy += 0.12; this.opacity -= 0.02; };
    Particle.prototype.draw = function () { ctx.save(); ctx.globalAlpha = this.opacity; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); ctx.restore(); };

    for (var i = 0; i < 100; i++) backgroundBubbles.push(new Bubble());

    // 轨道无限循环（克隆1份，标记 data-clone 方便识别）
    var originalCards = Array.from(track.children);
    var CARD_W = 110, CARD_GAP = 30;
    var TOTAL_WIDTH = originalCards.length * (CARD_W + CARD_GAP);
    originalCards.forEach(function (card) {
      var c1 = card.cloneNode(true); c1.setAttribute('data-clone', 'true');
      track.appendChild(c1);
    });

    var currentX = 0, speed = 1.0;
    var isDraggingShowcase = false, trackStartX = 0, dragOffsetX = 0;

    // 右边界：最后一张克隆卡片的右边缘
    var MAX_X = TOTAL_WIDTH;

    // 抽取与甩飞
    var activeCard = null, sourceCard = null, isExtracted = false;
    var lastMouseY = 0, velocityY = 0;

    // 安全重置：清理可能残留的卡住状态
    function resetDragState() {
      if (sourceCard && sourceCard.classList.contains('transparent-placeholder')) {
        sourceCard.style.opacity = '1';
        sourceCard.classList.remove('transparent-placeholder');
      }
      if (activeCard && activeCard.isConnected) activeCard.remove();
      activeCard = null; sourceCard = null; isExtracted = false;
      isDraggingShowcase = false;
      velocityY = 0;
    }

    function checkCollisions(rect) {
      var hit = false;
      backgroundBubbles.forEach(function (bubble) {
        if (bubble.x > rect.left - 15 && bubble.x < rect.right + 15 && bubble.y > rect.top - 15 && bubble.y < rect.bottom + 15) {
          var colors = ['#ff7893', '#8b5cf6', '#3b82f6', '#ffffff'];
          for (var k = 0; k < 12; k++) burstParticles.push(new Particle(bubble.x, bubble.y, colors[Math.floor(Math.random() * colors.length)]));
          bubble.reset();
          hit = true;
        }
      });
      if (hit) playPopSound();
    }

    track.addEventListener('pointerdown', function (e) {
      // 清理上次可能残留的状态
      resetDragState();

      var targetCard = e.target.closest('.wild-card');
      if (targetCard && targetCard.style.opacity !== '0.2') {
        e.stopPropagation();
        sourceCard = targetCard;
        lastMouseY = e.clientY;
        velocityY = 0;
        isExtracted = false;
        return;
      }
      isDraggingShowcase = true;
      trackStartX = e.clientX;
      dragOffsetX = currentX;
    });

    window.addEventListener('pointermove', function (e) {
      // 抽取判定：向上拉动超过30px
      if (sourceCard && !isExtracted && !isDraggingShowcase) {
        var deltaY = e.clientY - lastMouseY;
        if (deltaY < -30) {
          isExtracted = true;
          activeCard = sourceCard.cloneNode(true);
          activeCard.classList.add('extracted');
          document.body.appendChild(activeCard);
          sourceCard.style.opacity = '0.15';
        }
      }

      if (isExtracted && activeCard) {
        activeCard.style.left = (e.clientX - 100) + 'px';
        activeCard.style.top = (e.clientY - 140) + 'px';
        velocityY = e.clientY - lastMouseY;
        lastMouseY = e.clientY;
        checkCollisions(activeCard.getBoundingClientRect());
        return;
      }

      if (isDraggingShowcase) {
        currentX = dragOffsetX + (e.clientX - trackStartX);
        // 边界限制，防止拖过头看到空白
        if (currentX > MAX_X) currentX = MAX_X;
        if (currentX < -TOTAL_WIDTH) currentX = -TOTAL_WIDTH;
      }
    });

    window.addEventListener('pointerup', function () {
      isDraggingShowcase = false;

      if (isExtracted && activeCard) {
        if (velocityY < -25) {
          // 速度够快 → 飞天引爆
          var flyingCard = activeCard;
          var curSource = sourceCard;
          flyingCard.style.transition = 'transform 0.4s cubic-bezier(0.25,1,0.5,1), opacity 0.4s';
          flyingCard.style.transform = 'translateY(-700px) scale(0.2) rotate(20deg)';
          flyingCard.style.opacity = '0';
          var timer = setInterval(function () { checkCollisions(flyingCard.getBoundingClientRect()); }, 30);
          setTimeout(function () {
            clearInterval(timer); flyingCard.remove();
            if (curSource) curSource.style.opacity = '1';
          }, 400);
        } else {
          // 速度不够 → 烟雾消散
          var droppingCard = activeCard;
          droppingCard.style.transition = 'transform 0.2s, opacity 0.2s';
          droppingCard.style.transform = 'scale(0.8)';
          droppingCard.style.opacity = '0';
          if (sourceCard) sourceCard.style.opacity = '1';
          setTimeout(function () { droppingCard.remove(); }, 200);
        }
      }
      activeCard = null; sourceCard = null; isExtracted = false;
    });

    // 主循环
    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      backgroundBubbles.forEach(function (b) { b.update(); b.draw(); });
      burstParticles = burstParticles.filter(function (p) { return p.opacity > 0; });
      burstParticles.forEach(function (p) { p.update(); p.draw(); });

      if (!isDraggingShowcase && !isExtracted) {
        currentX -= speed;
        // 无缝循环：滚过一整组后跳回起点
        if (currentX < -TOTAL_WIDTH) currentX += TOTAL_WIDTH;
      }
      track.style.transform = 'translateX(' + currentX + 'px)';
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  })();

  /* ── 悬浮预览系统（事件委托，切换语言后自动生效） ── */
  (function initHoverPreview() {
    var drawer = document.getElementById('hoverPreviewDrawer');
    var drawerImg = document.getElementById('previewDrawerImg');
    if (!drawer || !drawerImg) return;

    function positionDrawer(e) {
      var x = e.clientX + 22;
      var y = e.clientY - 100;
      if (x + drawer.offsetWidth > window.innerWidth) x = e.clientX - drawer.offsetWidth - 22;
      if (y + drawer.offsetHeight > window.innerHeight) y = window.innerHeight - drawer.offsetHeight - 20;
      if (y < 0) y = 20;
      drawer.style.left = x + 'px';
      drawer.style.top = y + 'px';
    }

    document.addEventListener('mouseenter', function (e) {
      var tile = e.target.closest('.micro-tile[data-preview], .view-media-badge[data-preview]');
      if (!tile) return;
      var url = tile.getAttribute('data-preview');
      if (url) {
        drawerImg.src = url;
        var ratio = tile.getAttribute('data-preview-ratio');
        if (ratio === '9:16') {
          drawer.style.width = '280px';
          drawer.style.height = '500px';
        } else {
          drawer.style.width = '640px';
          drawer.style.height = '420px';
        }
        drawer.classList.add('active');
        positionDrawer(e);
      }
    }, true);

    document.addEventListener('mousemove', function (e) {
      if (!drawer.classList.contains('active')) return;
      var tile = e.target.closest('.micro-tile[data-preview], .view-media-badge[data-preview]');
      if (tile) positionDrawer(e);
    }, true);

    document.addEventListener('mouseleave', function (e) {
      var tile = e.target.closest('.micro-tile[data-preview], .view-media-badge[data-preview]');
      if (tile) drawer.classList.remove('active');
    }, true);

    function positionDrawer(e) {
      var x = e.clientX + 22;
      var y = e.clientY - 100;
      if (x + drawer.offsetWidth > window.innerWidth) x = e.clientX - drawer.offsetWidth - 22;
      if (y + drawer.offsetHeight > window.innerHeight) y = window.innerHeight - drawer.offsetHeight - 20;
      if (y < 0) y = 20;
      drawer.style.left = x + 'px';
      drawer.style.top = y + 'px';
    }
  })();

  /* ════════════════════════════════════════
     7. Blindbox / Surprise Cards
     翻转显示照片 + Toast 解锁提示
     ════════════════════════════════════════ */
  const blindboxCards = document.querySelectorAll('.card-container');
  const toastEl = document.getElementById('blindboxToast');
  let openedCard = null;

  function getBackTitle(card) {
    const h4 = card.querySelector('.card-back-content h4');
    return h4 ? h4.textContent : '神秘属性';
  }

  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('show');
    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => toastEl.classList.remove('show'), 2300);
  }

  blindboxCards.forEach((card) => {
    card.addEventListener('click', () => {
      if (openedCard === card) {
        showToast('✨ 盲盒已经开启过啦，神秘属性永久生效 ✨');
        return;
      }
      if (openedCard) {
        openedCard.classList.remove('flipped');
      }
      card.classList.add('flipped');
      openedCard = card;
      showToast(`🎉 惊喜解锁：${getBackTitle(card)} 🎉`);
    });
  });

  /* 图片加载失败优雅降级 */
  document.querySelectorAll('.card-back-photo img').forEach((img) => {
    img.onerror = function () {
      this.onerror = null;
      const parent = this.parentElement;
      if (parent) {
        const fb = document.createElement('div');
        fb.className = 'photo-fallback';
        fb.textContent = '🌸 西西能量场';
        this.style.display = 'none';
        parent.appendChild(fb);
      }
    };
  });

  /* ════════════════════════════════════════
     8. Smooth Scroll for anchor links
     ════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 64; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ════════════════════════════════════════
     9. Work Card Glow Follow Mouse
     ════════════════════════════════════════ */
  document.querySelectorAll('.work-card').forEach((card) => {
    const glow = card.querySelector('.work-card-glow');
    if (!glow) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(circle 200px at ${x}px ${y}px, var(--accent-glow), transparent 70%)`;
      glow.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  });

  /* ════════════════════════════════════════
     10. Parallax Stars on Scroll
     ════════════════════════════════════════ */
  const stars = document.querySelectorAll('.star');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    stars.forEach((star, i) => {
      const speed = 0.1 + i * 0.05;
      star.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ════════════════════════════════════════
     12. Number counter animation for metrics
     ════════════════════════════════════════ */
  function animateCounters() {
    const counters = document.querySelectorAll('.metric-value');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.dataset.counted) {
            entry.target.dataset.counted = 'true';
            const text = entry.target.textContent;
            const match = text.match(/^(\d+)([Ww+%\+]*)$/);
            if (match) {
              const target = parseInt(match[1]);
              const suffix = match[2] || '';
              let current = 0;
              const step = Math.max(1, Math.floor(target / 40));
              const interval = setInterval(() => {
                current += step;
                if (current >= target) {
                  current = target;
                  clearInterval(interval);
                }
                entry.target.textContent = current + suffix;
              }, 30);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
  }

  animateCounters();

  /* ════════════════════════════════════════
     13. Page load
     ════════════════════════════════════════ */
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
  });

  /* ════════════════════════════════════════
     14. 电子工牌 3D 物理吊牌
     ════════════════════════════════════════ */
  (function initLanyard() {
    const canvas = document.querySelector('#lanyardCanvas');
    const container = document.querySelector('.lanyard-container');
    if (!canvas || typeof THREE === 'undefined') return;

    // 场景
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 灯光
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // 工牌贴图
    function createBadgeTexture() {
      const W = 480, H = 720;
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const ctx = c.getContext('2d');

      function rr(x, y, w, h, r) {
        ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
      }
      function rrTop(x, y, w, h, r) {
        ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath();
      }
      function rrBL(x, y, w, h, r) {
        ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h);
        ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y); ctx.closePath();
      }
      function rrBR(x, y, w, h, r) {
        ctx.moveTo(x, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x, y + h); ctx.lineTo(x, y); ctx.closePath();
      }

      // 白色底板
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); rr(0, 0, W, H, 24); ctx.fill();
      ctx.strokeStyle = 'rgba(212,120,156,0.25)'; ctx.lineWidth = 2;
      ctx.beginPath(); rr(3, 3, W - 6, H - 6, 22); ctx.stroke();

      // 渐变色带
      const hg = ctx.createLinearGradient(0, 0, W, 0);
      hg.addColorStop(0, '#d4789c'); hg.addColorStop(0.5, '#b07cd8'); hg.addColorStop(1, '#8888d8');
      ctx.fillStyle = hg; ctx.beginPath(); rrTop(0, 0, W, 120, 24); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.font = '600 20px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('✦ CREATIVE LAB ✦', W / 2, 45);
      ctx.fillStyle = 'rgba(255,255,255,0.7)'; ctx.font = '400 14px sans-serif';
      ctx.fillText('AI Native · Brand Marketing', W / 2, 72);

      // 挂绳孔
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.beginPath(); ctx.arc(W / 2, 105, 8, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();

      // 头像（先画占位渐异步加载照片后更新）
      ctx.save(); ctx.beginPath(); ctx.arc(W / 2, 210, 55, 0, Math.PI * 2); ctx.clip();
      const ag = ctx.createRadialGradient(W / 2, 200, 10, W / 2, 210, 55);
      ag.addColorStop(0, '#fde8f0'); ag.addColorStop(1, '#e8d8f0');
      ctx.fillStyle = ag; ctx.fillRect(W / 2 - 55, 155, 110, 110); ctx.restore();
      ctx.strokeStyle = '#d4789c'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(W / 2, 210, 55, 0, Math.PI * 2); ctx.stroke();

      // 姓名
      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#1a1a2e'; ctx.font = 'bold 36px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('西西 XIXI', W / 2, 310);
      ctx.fillStyle = '#d4789c'; ctx.font = '600 18px sans-serif';
      ctx.fillText('品牌策划经理 · AI探索者', W / 2, 345);

      // 分割线
      ctx.strokeStyle = 'rgba(212,120,156,0.15)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(60, 375); ctx.lineTo(W - 60, 375); ctx.stroke();

      // 技能标签
      const skills = ['品牌营销', 'AIGC', '数据分析', '内容策划'];
      const tw = 90, th = 30, gap = 12, sx = (W - (skills.length * (tw + gap) - gap)) / 2;
      ctx.font = '500 13px sans-serif';
      for (let i = 0; i < skills.length; i++) {
        const tx = sx + i * (tw + gap);
        ctx.fillStyle = 'rgba(212,120,156,0.08)'; ctx.beginPath(); rr(tx, 395, tw, th, 15); ctx.fill();
        ctx.strokeStyle = 'rgba(212,120,156,0.2)'; ctx.lineWidth = 1; ctx.stroke();
        ctx.fillStyle = '#b06888'; ctx.textAlign = 'center'; ctx.fillText(skills[i], tx + tw / 2, 415);
      }

      // 底部信息
      ctx.fillStyle = '#8888a8'; ctx.font = '400 13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('ISFJ · 处女座 · 英雄联盟大师段位', W / 2, 470);

      // 底部彩色条
      const bc = ['#FF64AE', '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B'], bw = W / bc.length;
      for (let j = 0; j < bc.length; j++) {
        ctx.fillStyle = bc[j];
        if (j === 0) { ctx.beginPath(); rrBL(0, H - 10, bw, 10, 24); ctx.fill(); }
        else if (j === bc.length - 1) { ctx.beginPath(); rrBR(j * bw, H - 10, bw, 10, 24); ctx.fill(); }
        else { ctx.fillRect(j * bw, H - 10, bw, 10); }
      }
      ctx.fillStyle = '#aaa'; ctx.font = '400 11px sans-serif';
      ctx.fillText('NO. 2025-XIXI-001', W / 2, H - 25);

      const t = new THREE.CanvasTexture(c); t.needsUpdate = true;
      return { texture: t, canvas: c, ctx: ctx, W: W, H: H };
    }

    // 工牌网格
    const cardGeometry = new THREE.BoxGeometry(2.2, 3.2, 0.05);
    const badge = createBadgeTexture();
    const badgeTexture = badge.texture;

    // 使用 HTML 预加载的头像图片
    function drawAvatar(img) {
      const ctx2 = badge.ctx;
      const cx = badge.W / 2, cy = 210, r = 55;
      ctx2.save();
      ctx2.beginPath(); ctx2.arc(cx, cy, r, 0, Math.PI * 2); ctx2.clip();
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const size = Math.min(iw, ih);
      const sx = (iw - size) / 2;
      const sy = (ih - size) / 2;
      ctx2.drawImage(img, sx, sy, size, size, cx - r, cy - r, r * 2, r * 2);
      ctx2.restore();
      ctx2.strokeStyle = '#d4789c'; ctx2.lineWidth = 3;
      ctx2.beginPath(); ctx2.arc(cx, cy, r, 0, Math.PI * 2); ctx2.stroke();
      badgeTexture.needsUpdate = true;
    }

    const preloaded = document.getElementById('avatarPreload');
    if (preloaded && preloaded.complete && preloaded.naturalWidth) {
      drawAvatar(preloaded);
    } else if (preloaded) {
      preloaded.addEventListener('load', function () { drawAvatar(preloaded); });
      preloaded.addEventListener('error', function () { console.warn('头像加载失败'); });
    }
    const cardMaterials = [
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.3 }),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.3 }),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.3 }),
      new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.3 }),
      new THREE.MeshPhysicalMaterial({ map: badgeTexture, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1 }),
      new THREE.MeshPhysicalMaterial({ map: badgeTexture, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.1 })
    ];
    const cardMesh = new THREE.Mesh(cardGeometry, cardMaterials);
    scene.add(cardMesh);

    // 绳子物理参数
    const segments = 7;
    const segLength = 0.4;
    const pinX = 0, pinY = 4, pinZ = 0;
    let points = [], oldPoints = [];
    for (let i = 0; i < segments; i++) {
      points.push({ x: pinX, y: pinY, z: 0 });
      oldPoints.push({ x: pinX, y: pinY, z: 0 });
    }

    // 绳子 3D 线条
    const lineGeo = new THREE.BufferGeometry();
    const linePos = new Float32Array(segments * 3);
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0xd4789c, linewidth: 2 });
    const ropeLine = new THREE.Line(lineGeo, lineMat);
    scene.add(ropeLine);

    // 挂钩
    const hookMat = new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.85, roughness: 0.25 });
    const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.25, 12), hookMat);
    scene.add(hook);

    // 鼠标交互
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    let isDragging = false;
    let hasStarted = false;

    canvas.addEventListener('pointerdown', (e) => {
      if (!hasStarted) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      if (raycaster.intersectObject(cardMesh).length > 0) {
        isDragging = true;
        canvas.style.cursor = 'grabbing';
      }
    });

    canvas.addEventListener('pointermove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / canvas.clientWidth) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / canvas.clientHeight) * 2 + 1;
      if (isDragging) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, intersection);
        points[segments - 1].x = intersection.x;
        points[segments - 1].y = intersection.y;
        points[segments - 1].z = intersection.z;
      } else {
        raycaster.setFromCamera(mouse, camera);
        canvas.style.cursor = raycaster.intersectObject(cardMesh).length > 0 ? 'grab' : 'default';
      }
    });

    window.addEventListener('pointerup', () => { isDragging = false; canvas.style.cursor = 'default'; });

    // 物理参数
    const gravity = -0.15;
    const bounce = 0.98;

    // 初始隐藏工牌（在屏幕上方）
    const startY = 15;
    for (let i = 0; i < segments; i++) {
      points[i].x = pinX; points[i].y = startY + i * segLength; points[i].z = 0;
      oldPoints[i].x = pinX; oldPoints[i].y = startY + i * segLength; oldPoints[i].z = 0;
    }

    var FLOOR_Y = -0.5;

    function animate() {
      requestAnimationFrame(animate);

      // Verlet 物理
      for (let i = 1; i < segments; i++) {
        if (isDragging && i === segments - 1) continue;
        let vx = (points[i].x - oldPoints[i].x) * bounce;
        let vy = (points[i].y - oldPoints[i].y) * bounce;
        let vz = (points[i].z - oldPoints[i].z) * bounce;
        oldPoints[i].x = points[i].x; oldPoints[i].y = points[i].y; oldPoints[i].z = points[i].z;
        points[i].x += vx; points[i].y += vy + gravity; points[i].z += vz;
      }

      // 物理层地板约束
      for (let i = 1; i < segments; i++) {
        if (points[i].y < FLOOR_Y) {
          points[i].y = FLOOR_Y;
          oldPoints[i].y = FLOOR_Y;
        }
      }

      for (let j = 0; j < 5; j++) {
        points[0].x = pinX; points[0].y = pinY; points[0].z = pinZ;
        for (let i = 0; i < segments - 1; i++) {
          let p1 = points[i], p2 = points[i + 1];
          let dx = p2.x - p1.x, dy = p2.y - p1.y, dz = p2.z - p1.z;
          let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          let error = segLength - dist;
          let percent = (error / dist) * 0.5;
          let ox = dx * percent, oy = dy * percent, oz = dz * percent;
          if (i !== 0) { p1.x -= ox; p1.y -= oy; p1.z -= oz; }
          if (!(isDragging && i + 1 === segments - 1)) { p2.x += ox; p2.y += oy; p2.z += oz; }
        }
      }

      // 同步 3D 视图
      const posAttr = ropeLine.geometry.attributes.position;
      for (let i = 0; i < segments; i++) { posAttr.setXYZ(i, points[i].x, points[i].y, points[i].z); }
      posAttr.needsUpdate = true;

      hook.position.set(points[0].x, points[0].y, points[0].z);

      const lastPoint = points[segments - 1];
      const secondLast = points[segments - 2];
      cardMesh.position.set(lastPoint.x, lastPoint.y - 1.0, lastPoint.z);

      if (!isDragging) {
        cardMesh.rotation.z = Math.max(-0.5, Math.min(0.5, (lastPoint.x - secondLast.x) * 1.0));
        cardMesh.rotation.y += (0 - cardMesh.rotation.y) * 0.1;
      } else {
        cardMesh.rotation.z *= 0.9;
      }

      renderer.render(scene, camera);
    }

    // 响应式
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // 鼠标滑入经历区域 → 触发掉落
    const section = document.getElementById('experience');
    if (section) {
      section.addEventListener('mouseenter', function onHover() {
        if (!hasStarted) {
          hasStarted = true;
          // 重置工牌到顶部
          for (let i = 0; i < segments; i++) {
            points[i].x = pinX; points[i].y = pinY; points[i].z = 0;
            oldPoints[i].x = pinX; oldPoints[i].y = pinY; oldPoints[i].z = 0;
          }
        }
        section.removeEventListener('mouseenter', onHover);
      });
    }

    animate();
  })();
})();

/* ════════════════════════════════════════
   爆款内容中台 — 全局交互函数
   ════════════════════════════════════════ */
function toggleLike(event, element) {
  event.stopPropagation();
  var currentCount = parseInt(element.getAttribute('data-count'), 10);
  if (isNaN(currentCount)) currentCount = 0;
  if (element.classList.contains('liked')) {
    element.classList.remove('liked');
    currentCount -= 1;
    element.innerHTML = '🤍 ' + formatLikeCount(currentCount);
  } else {
    element.classList.add('liked');
    currentCount += 1;
    element.innerHTML = '❤️ ' + formatLikeCount(currentCount);
  }
  element.setAttribute('data-count', currentCount);
}

function formatLikeCount(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

function navigateToNote(event, url) {
  if (!url) return;
  window.open(url, '_blank');
}
