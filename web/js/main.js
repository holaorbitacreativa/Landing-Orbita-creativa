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

  /* ───────── Cursor de estrella con estela de estrella fugaz (solo mouse) ───────── */
  if (!sinMovimiento && window.matchMedia('(pointer: fine)').matches) {
    var cursor = document.querySelector('.cursor');
    var lienzo = document.querySelector('.estela');
    var ctx = lienzo.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var puntos = [];   // la cola: últimas posiciones del mouse
    var chispas = [];  // destellos que se desprenden de la cola
    var animando = false;
    var colorEstela = '';
    function medirLienzo() {
      lienzo.width = innerWidth * dpr;
      lienzo.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function leerColor() { colorEstela = getComputedStyle(cursor).color; }
    function conAlfa(alfa) { return colorEstela.replace('rgb(', 'rgba(').replace(')', ', ' + alfa + ')'); }
    medirLienzo();
    leerColor();
    window.addEventListener('resize', medirLienzo);
    botonModo.addEventListener('click', function () { setTimeout(leerColor, 50); });

    function dibujar() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      var ahora = performance.now();
      puntos = puntos.filter(function (p) { return ahora - p.t < 420; });
      // Cola: trazo que se adelgaza y se desvanece hacia atrás.
      for (var i = 1; i < puntos.length; i++) {
        var vida = 1 - (ahora - puntos[i].t) / 420;
        ctx.strokeStyle = conAlfa(vida * 0.7);
        ctx.shadowColor = conAlfa(vida);
        ctx.shadowBlur = 10 * vida;
        ctx.lineWidth = 1 + vida * 5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(puntos[i - 1].x, puntos[i - 1].y);
        ctx.lineTo(puntos[i].x, puntos[i].y);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      // Destellos: pequeñas estrellas que caen y se apagan.
      chispas = chispas.filter(function (c) { return c.vida > 0; });
      chispas.forEach(function (c) {
        c.x += c.vx; c.y += c.vy; c.vy += 0.03; c.vida -= 0.025;
        var r = c.r * c.vida;
        ctx.fillStyle = conAlfa(Math.max(c.vida, 0));
        ctx.beginPath();
        ctx.moveTo(c.x, c.y - r);
        ctx.quadraticCurveTo(c.x, c.y, c.x + r, c.y);
        ctx.quadraticCurveTo(c.x, c.y, c.x, c.y + r);
        ctx.quadraticCurveTo(c.x, c.y, c.x - r, c.y);
        ctx.quadraticCurveTo(c.x, c.y, c.x, c.y - r);
        ctx.fill();
      });
      if (puntos.length || chispas.length) requestAnimationFrame(dibujar);
      else { animando = false; ctx.clearRect(0, 0, innerWidth, innerHeight); }
    }

    var visible = false;
    var ultimo = null;
    window.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)';
      if (!visible) { visible = true; raiz.classList.add('con-cursor'); }
      puntos.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      var rapidez = ultimo ? Math.hypot(e.clientX - ultimo.x, e.clientY - ultimo.y) : 0;
      if (rapidez > 6 && Math.random() < 0.55) {
        chispas.push({ x: e.clientX, y: e.clientY, vx: (Math.random() - 0.5) * 1.2, vy: Math.random() * 0.6, r: 2.5 + Math.random() * 4, vida: 1 });
      }
      ultimo = { x: e.clientX, y: e.clientY };
      if (!animando) { animando = true; requestAnimationFrame(dibujar); }
    });
    document.addEventListener('mouseleave', function () { visible = false; raiz.classList.remove('con-cursor'); });
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
  var capasBanda = Array.prototype.slice.call(document.querySelectorAll('[data-paralaje]'));
  var volver = document.querySelector('.volver-arriba');
  var banner = document.querySelector('.banner');
  var bannerImagen = document.querySelector('.banner__imagen');
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
    if (!sinMovimiento && banner) {
      var caja = banner.getBoundingClientRect();
      if (caja.bottom > 0 && caja.top < window.innerHeight) {
        var avance = (window.innerHeight - caja.top) / (window.innerHeight + caja.height);
        bannerImagen.style.transform = 'translate3d(0,' + ((0.5 - avance) * 0.4 * caja.height) + 'px,0)';
      }
    }
    if (!sinMovimiento) {
      capasBanda.forEach(function (capa) {
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
