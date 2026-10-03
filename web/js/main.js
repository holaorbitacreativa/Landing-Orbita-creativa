// Comportamiento de la web: copia las animaciones del template (precarga, cursor, revelado al hacer scroll,
// contadores, encabezado fijo, volver arriba, pestañas y acordeón) sin jQuery ni librerías.
(function () {
  'use strict';

  var raiz = document.documentElement;
  var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ───────── Precarga ───────── */
  var precarga = document.querySelector('.precarga');
  var paginaLista = false;
  function quitarPrecarga() {
    if (paginaLista) return;
    paginaLista = true;
    if (precarga) {
      precarga.classList.add('precarga--lista');
      setTimeout(function () { precarga.classList.add('precarga--fuera'); }, 1200);
    }
    document.dispatchEvent(new Event('oc:lista'));
  }
  if (sinMovimiento) quitarPrecarga();
  else {
    var inicio = Date.now();
    var alCargar = function () { setTimeout(quitarPrecarga, Math.max(0, 1400 - (Date.now() - inicio))); };
    if (document.readyState === 'complete') alCargar();
    else window.addEventListener('load', alCargar);
    setTimeout(quitarPrecarga, 4000); // Por si alguna imagen tarda demasiado.
  }

  /* ───────── Modo claro / oscuro ───────── */
  var botonModo = document.getElementById('cambiar-modo');
  function pintarBotonModo() {
    var oscuro = raiz.dataset.theme === 'oscuro';
    botonModo.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  botonModo.addEventListener('click', function () {
    raiz.dataset.theme = raiz.dataset.theme === 'oscuro' ? 'claro' : 'oscuro';
    try { localStorage.setItem('oc-modo', raiz.dataset.theme); } catch (e) {}
    pintarBotonModo();
  });
  pintarBotonModo();

  /* ───────── Cursor de estrella con propulsor (solo mouse) ───────── */
  // Al moverse, la estrella suelta partículas pequeñas hacia atrás, como el escape de un propulsor.
  if (!sinMovimiento && window.matchMedia('(pointer: fine)').matches) {
    var cursor = document.querySelector('.cursor');
    var lienzo = document.querySelector('.estela');
    var ctx = lienzo.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var particulas = [];
    var animando = false;
    var rgb = [124, 104, 240];
    function medirLienzo() {
      lienzo.width = innerWidth * dpr;
      lienzo.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function leerColor() {
      var m = getComputedStyle(cursor).color.match(/\d+(\.\d+)?/g);
      if (m) rgb = m.slice(0, 3).map(Number);
    }
    medirLienzo();
    leerColor();
    window.addEventListener('resize', medirLienzo);
    botonModo.addEventListener('click', function () { setTimeout(leerColor, 50); });

    function dibujar() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      // En oscuro las partículas suman luz; en claro se pintan normal para que se vean sobre el fondo.
      var oscuro = raiz.dataset.theme === 'oscuro';
      ctx.globalCompositeOperation = oscuro ? 'lighter' : 'source-over';
      particulas = particulas.filter(function (p) { return p.vida > 0; });
      particulas.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.92; p.vy *= 0.92;
        p.vida -= 0.045;
        var r = p.r * (0.4 + p.vida * 0.6);
        // Núcleo claro cerca de la estrella que se vuelve del color de la marca al alejarse.
        var mezcla = oscuro ? Math.max(p.vida - 0.55, 0) / 0.45 : 0;
        var c = rgb.map(function (v) { return Math.round(v + (255 - v) * mezcla); });
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 2.2);
        g.addColorStop(0, 'rgba(' + c.join(',') + ',' + (p.vida * 0.9) + ')');
        g.addColorStop(1, 'rgba(' + c.join(',') + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
      if (particulas.length) requestAnimationFrame(dibujar);
      else { animando = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
    }

    var visible = false;
    var ultimo = null;
    window.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      if (!visible) { visible = true; raiz.classList.add('con-cursor'); }
      if (ultimo) {
        var dx = e.clientX - ultimo.x;
        var dy = e.clientY - ultimo.y;
        var rapidez = Math.hypot(dx, dy);
        if (rapidez > 1.5) {
          var angulo = Math.atan2(-dy, -dx); // hacia atrás del movimiento
          var cantidad = Math.min(1 + Math.floor(rapidez / 14), 3);
          for (var k = 0; k < cantidad; k++) {
            var a = angulo + (Math.random() - 0.5) * 0.7;
            var v = 0.8 + Math.random() * Math.min(rapidez / 8, 2.4);
            particulas.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v, r: 1.6 + Math.random() * 1.8, vida: 1 });
          }
          if (particulas.length > 90) particulas.splice(0, particulas.length - 90);
          if (!animando) { animando = true; requestAnimationFrame(dibujar); }
        }
      }
      ultimo = { x: e.clientX, y: e.clientY };
    });
    document.addEventListener('mouseleave', function () { visible = false; ultimo = null; raiz.classList.remove('con-cursor'); });
    document.addEventListener('mouseover', function (e) {
      cursor.classList.toggle('cursor--hover', !!e.target.closest('a, button, label, input'));
    });
  }

  /* ───────── Revelado al entrar en pantalla ───────── */
  // Las imágenes con recorte están 100 % recortadas al inicio y el observador no las "ve": se observa su contenedor.
  var porRevelar = document.querySelectorAll('[data-revelar], .proyecto__imagen');
  porRevelar.forEach(function (el) {
    if (el.dataset.retraso) el.style.setProperty('--retraso', el.dataset.retraso + 's');
  });
  function revelarTodo() { porRevelar.forEach(function (el) { el.classList.add('revelado'); }); }
  var observador = null;
  if (sinMovimiento || !('IntersectionObserver' in window)) revelarTodo();
  else {
    observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        var el = entrada.target;
        el.classList.add('revelado');
        el.querySelectorAll('.anim-recorte--scroll').forEach(function (img) { img.classList.add('revelado'); });
        observador.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  }
  // El hero espera a que se vaya la precarga; el resto se observa desde ya.
  document.addEventListener('oc:lista', function () {
    document.querySelectorAll('.hero .anim-recorte').forEach(function (el) { el.classList.add('revelado'); });
    if (observador) porRevelar.forEach(function (el) { observador.observe(el); });
  });
  if (paginaLista) document.dispatchEvent(new Event('oc:lista'));

  /* ───────── Contadores ───────── */
  var contadores = document.querySelectorAll('[data-contar]');
  function contar(el) {
    var meta = parseInt(el.dataset.contar, 10);
    if (sinMovimiento) { el.textContent = meta; return; }
    var duracion = 1600;
    var t0 = null;
    function paso(t) {
      if (!t0) t0 = t;
      var avance = Math.min((t - t0) / duracion, 1);
      el.textContent = Math.round(meta * (1 - Math.pow(1 - avance, 3)));
      if (avance < 1) requestAnimationFrame(paso);
    }
    el.textContent = '0';
    requestAnimationFrame(paso);
  }
  if ('IntersectionObserver' in window) {
    var obsContador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        contar(entrada.target);
        obsContador.unobserve(entrada.target);
      });
    }, { threshold: 0.6 });
    contadores.forEach(function (el) { obsContador.observe(el); });
  }

  /* ───────── Encabezado que se esconde al bajar, volver arriba, paralaje y sección activa ───────── */
  var encabezado = document.getElementById('encabezado');
  var menu = document.querySelector('.menu-movil');
  var yAnterior = window.scrollY;
  var capasParalaje = Array.prototype.slice.call(document.querySelectorAll('[data-paralaje]'));
  var volver = document.querySelector('.volver-arriba');
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.navegacion__enlace'));
  var secciones = enlaces.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var pendiente = false;
  function alDesplazar() {
    pendiente = false;
    var y = window.scrollY;
    var menuAbierto = menu && menu.getAttribute('aria-expanded') === 'true';
    if (Math.abs(y - yAnterior) > 6 || y < 80) {
      encabezado.classList.toggle('encabezado--oculto', y > 120 && y > yAnterior && !menuAbierto);
      yAnterior = y;
    }
    volver.classList.toggle('volver-arriba--visible', y > 400);
    if (!sinMovimiento) {
      capasParalaje.forEach(function (capa) {
        var c = capa.parentElement.getBoundingClientRect();
        if (c.bottom < 0 || c.top > window.innerHeight) return;
        var desfase = window.innerHeight / 2 - (c.top + c.height / 2);
        capa.style.transform = 'translate3d(0,' + desfase * Number(capa.dataset.paralaje) + 'px,0)';
      });
    }
    var actual = 0;
    secciones.forEach(function (s, i) { if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) actual = i; });
    enlaces.forEach(function (a, i) { a.setAttribute('aria-current', i === actual ? 'true' : 'false'); });
  }
  window.addEventListener('scroll', function () {
    if (!pendiente) { pendiente = true; requestAnimationFrame(alDesplazar); }
  }, { passive: true });
  alDesplazar();
  volver.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: sinMovimiento ? 'auto' : 'smooth' }); });

  /* ───────── Menú móvil ───────── */
  var navegacion = document.getElementById('navegacion');
  function cerrarMenu() {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Abrir menú');
    navegacion.classList.remove('navegacion--abierta');
  }
  menu.addEventListener('click', function () {
    var abrir = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(abrir));
    menu.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    navegacion.classList.toggle('navegacion--abierta', abrir);
  });
  enlaces.forEach(function (a) { a.addEventListener('click', cerrarMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') cerrarMenu(); });

  /* ───────── Pestañas de Nosotros (con flechas del teclado) ───────── */
  var pestanas = Array.prototype.slice.call(document.querySelectorAll('.nosotros__pestanas [role="tab"]'));
  function activar(pestana, enfocar) {
    pestanas.forEach(function (p) {
      var activa = p === pestana;
      p.setAttribute('aria-selected', String(activa));
      p.tabIndex = activa ? 0 : -1;
      document.getElementById(p.getAttribute('aria-controls')).hidden = !activa;
    });
    if (enfocar) pestana.focus();
  }
  pestanas.forEach(function (p, i) {
    p.addEventListener('click', function () { activar(p); });
    p.addEventListener('keydown', function (e) {
      var siguiente = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
      if (!siguiente) return;
      e.preventDefault();
      activar(pestanas[(i + siguiente + pestanas.length) % pestanas.length], true);
    });
  });

  /* ───────── Acordeón de preguntas ───────── */
  document.querySelectorAll('.oc-faq__boton').forEach(function (boton) {
    boton.addEventListener('click', function () {
      var abrir = boton.getAttribute('aria-expanded') !== 'true';
      document.querySelectorAll('.oc-faq__boton').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      boton.setAttribute('aria-expanded', String(abrir));
    });
  });

  /* ───────── Agenda: calendario de octubre 2026 ───────── */
  var calendario = document.getElementById('calendario');
  var disponibles = [1, 2, 5, 7, 9, 12, 13, 14, 15, 16, 19, 21, 22, 23, 26, 28, 29, 30];
  var diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  var abreviados = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
  var seleccion = { dia: 14, hora: '12:00' };
  ['L', 'M', 'M', 'J', 'V', 'S', 'D'].forEach(function (letra) {
    var celda = document.createElement('span');
    celda.className = 'agenda__dia-semana';
    celda.setAttribute('aria-hidden', 'true');
    celda.textContent = letra;
    calendario.appendChild(celda);
  });
  var primerDia = (new Date(2026, 9, 1).getDay() + 6) % 7; // lunes = 0
  for (var v = 0; v < primerDia; v++) calendario.appendChild(document.createElement('span'));
  for (var d = 1; d <= 31; d++) {
    var dia = document.createElement('button');
    dia.type = 'button';
    dia.className = 'oc-dia';
    dia.textContent = d;
    dia.dataset.dia = d;
    var libre = disponibles.indexOf(d) !== -1;
    dia.disabled = !libre;
    dia.setAttribute('aria-label', diasSemana[new Date(2026, 9, d).getDay()] + ' ' + d + ' de octubre' + (libre ? '' : ', sin horarios'));
    if (libre) dia.classList.add('oc-dia--disponible');
    calendario.appendChild(dia);
  }
  function pintarAgenda() {
    calendario.querySelectorAll('.oc-dia').forEach(function (b) {
      var elegido = Number(b.dataset.dia) === seleccion.dia;
      b.classList.toggle('oc-dia--seleccionado', elegido);
      b.setAttribute('aria-pressed', String(elegido));
    });
    var fecha = new Date(2026, 9, seleccion.dia);
    document.getElementById('titulo-horarios').textContent = 'Horarios · ' + diasSemana[fecha.getDay()] + ' ' + seleccion.dia + ' de octubre';
    document.getElementById('cta-agenda-texto').textContent = 'Agenda tu sesión · ' + abreviados[fecha.getDay()] + ' ' + seleccion.dia + ' oct, ' + seleccion.hora;
    document.querySelectorAll('.oc-horario').forEach(function (h) { h.setAttribute('aria-pressed', String(h.textContent === seleccion.hora)); });
  }
  calendario.addEventListener('click', function (e) {
    var b = e.target.closest('.oc-dia');
    if (!b || b.disabled) return;
    seleccion.dia = Number(b.dataset.dia);
    pintarAgenda();
  });
  document.querySelectorAll('.oc-horario').forEach(function (h) {
    h.addEventListener('click', function () { seleccion.hora = h.textContent; pintarAgenda(); });
  });
  pintarAgenda();
})();
