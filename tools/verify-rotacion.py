"""Verificacion de las fotos que rotan solas en Prime Green.

Cubre los dos grupos marcados con data-rotator:
  · «La finca»   (#acerca)  -> recuadro grande + recuadro pequeno superpuesto
  · «Galeria»    (#galeria) -> mosaico de 5 casillas

Comprueba lo pedido: la foto del recuadro pequeno se agranda en el grande y en
el pequeno entra la siguiente, con transicion y animacion; se muestran todas las
fotos de assets2; el boton detiene el movimiento; con prefers-reduced-motion no
hay rotacion; y no hay desbordes en ninguna resolucion.

Necesita el sitio servido en local y Playwright para Python:
    python -m http.server 8899
    pip install playwright && playwright install chromium
    python tools/verify-rotacion.py [url]

Sale con codigo distinto de cero si alguna comprobacion falla.
"""
import json
import re
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/?verify=rot"
BEAT = 6000
SETTLE = 2400  # deja asentar la transicion antes de muestrear
results = []

GRUPOS = [
    ("La finca (#acerca)", "#acerca .pg-about__media", 2),
    ("Galeria (#galeria)", "#pg-mosaic", 5),
]

# --- fragmentos de JS que se ejecutan en la pagina -------------------------

FOTOS = """(sel) => {
  const box = document.querySelector(sel);
  if (!box) return null;
  return [...box.querySelectorAll('img[data-rot-img]')].map(i => ({
    n: (i.getAttribute('src') || '').split('/').pop().replace('-800.webp', ''),
    w: i.naturalWidth,
    in: i.classList.contains('pg-rot-in')
  }));
}"""

ANIMACION = """(sel) => new Promise(resolve => {
  const box = document.querySelector(sel);
  const out = {};
  const mo = new MutationObserver(muts => {
    muts.forEach(m => {
      if (m.type === 'attributes') {
        const n = m.target;                       // le acaban de poner is-in
        if (!n.classList.contains('pg-rot-in') || !n.classList.contains('is-in')) return;
        const cs = getComputedStyle(n);
        out.transicion = cs.transitionProperty + ' / ' + cs.transitionDuration;
        return;
      }
      [...m.addedNodes].forEach(n => {
        if (n.nodeType !== 1 || !n.classList.contains('pg-rot-in')) return;
        if (n.classList.contains('is-in')) return;       // se busca el estado previo
        const k = n.getAttribute('data-rot-img') === 'big' ? 'big' : 'small';
        if (out[k]) return;
        out[k] = {transform: getComputedStyle(n).transform,
                  hermanas: box.querySelectorAll('img[data-rot-img]').length};
      });
    });
    if (out.big && out.small && out.transicion) { mo.disconnect(); resolve(out); }
  });
  mo.observe(box, {childList: true, subtree: true,
                   attributes: true, attributeFilter: ['class']});
  setTimeout(() => { mo.disconnect(); resolve(out); }, 16000);
})"""

PROMOTE = """(sel) => new Promise(resolve => {
  const box = document.querySelector(sel);
  const log = [];
  const name = u => (u || '').split('/').pop().replace('-800.webp', '');
  const imgs = () => [...box.querySelectorAll('img[data-rot-img]')];
  const primeraPequena = () =>
    imgs().find(x => x.getAttribute('data-rot-img') !== 'big' && !x.classList.contains('pg-rot-in'));
  const mo = new MutationObserver(muts => {
    muts.forEach(m => [...m.addedNodes].forEach(n => {
      if (n.nodeType !== 1 || !n.classList.contains('pg-rot-in')) return;
      if (n.getAttribute('data-rot-img') !== 'big') return;   // solo el paso a la grande
      const s = primeraPequena();
      log.push({grande: name(n.getAttribute('src')),
                pequenaAntes: s ? name(s.getAttribute('src')) : null});
    }));
    if (log.length >= 3) { mo.disconnect(); resolve(log); }
  });
  mo.observe(box, {childList: true, subtree: true});
  setTimeout(() => { mo.disconnect(); resolve(log); }, 28000);
})"""

REGLA_CSS = """.pg-rot-in.is-in"""


def say(txt, good, detail=""):
    results.append(good)
    print(f"{'SI' if good else 'NO'}  {txt}  {detail}")


def escala(transform):
    m = re.match(r"matrix\(([-\d.]+)", transform or "")
    return round(float(m.group(1)), 3) if m else None


def esperar(pg, compases=1):
    pg.wait_for_timeout(BEAT * compases + SETTLE)


def fotos(pg, sel):
    return pg.evaluate(FOTOS, sel)


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errores = []
    page.on("pageerror", lambda e: errores.append(str(e)))
    page.goto(URL, wait_until="load")
    page.wait_for_timeout(2500)

    # --- la regla de animacion existe y aplica a la foto que entra ---
    regla = page.evaluate("""() => {
        const halladas = [];
        for (const s of document.styleSheets) {
          let rs; try { rs = s.cssRules; } catch (e) { continue; }
          for (const r of rs) {
            if (r.selectorText && r.selectorText.indexOf('.pg-rot-in') >= 0) {
              halladas.push(r.selectorText);
            }
          }
        }
        return halladas;
    }""")
    say("las reglas del cambio de fotos estan cargadas",
        any(".pg-rot-in.is-in" == s for s in regla), str(regla))

    # --- cada grupo, por separado ---
    for nombre, sel, n_fotos in GRUPOS:
        print(f"\n--- {nombre} ---")
        page.evaluate("s => document.querySelector(s).scrollIntoView({block:'center'})", sel)
        page.wait_for_timeout(900)

        inicial = fotos(page, sel)
        say(f"{nombre}: tiene los {n_fotos} recuadros cargados",
            inicial is not None and len(inicial) == n_fotos and all(f["w"] > 0 for f in inicial),
            str(inicial))

        anim = page.evaluate(ANIMACION, sel)
        big, small = (anim.get("big") or {}), (anim.get("small") or {})
        say(f"{nombre}: el recuadro grande arranca encogido y crece",
            (escala(big.get("transform")) or 1) < 0.95,
            f"escala={escala(big.get('transform'))}")
        say(f"{nombre}: el recuadro pequeno arranca mayor y se asienta",
            (escala(small.get("transform")) or 0) > 1.02,
            f"escala={escala(small.get('transform'))}")
        say(f"{nombre}: la entrada se anima con una transicion, no es un salto",
            bool(anim.get("transicion")) and "opacity" in anim["transicion"]
            and "transform" in anim["transicion"], str(anim.get("transicion")))
        say(f"{nombre}: la foto entrante se superpone a la anterior (fundido)",
            big.get("hermanas") == n_fotos + 1,
            f"fotos simultaneas={big.get('hermanas')} (en reposo son {n_fotos})")

        log = page.evaluate(PROMOTE, sel)
        say(f"{nombre}: la del recuadro pequeno pasa al grande en cada compas",
            len(log) >= 3 and all(e["grande"] == e["pequenaAntes"] for e in log),
            "; ".join(f"grande={e['grande']} pequena_antes={e['pequenaAntes']}" for e in log) or "sin datos")

        esperar(page)
        en_reposo = fotos(page, sel)
        say(f"{nombre}: en reposo hay una sola foto por recuadro",
            len(en_reposo) == n_fotos and not any(f["in"] for f in en_reposo),
            str([f["n"] for f in en_reposo]))
        say(f"{nombre}: no hay fotos repetidas a la vez",
            len({f["n"] for f in en_reposo}) == n_fotos,
            str([f["n"] for f in en_reposo]))

    # --- las 18 fotos de assets2 ---
    print("\n--- catalogo de fotos ---")
    cargan = page.evaluate("""() => Promise.all(
        Array.from({length: 18}, (_, i) => {
          const n = (i < 9 ? 'p0' : 'p') + (i + 1);
          return ['img/drone/' + n + '-800.webp', 'img/drone/' + n + '-1600.webp']
            .map(u => new Promise(r => { const im = new Image();
              im.onload = () => r({u, ok: im.naturalWidth > 0});
              im.onerror = () => r({u, ok: false}); im.src = u; }));
        }).flat())""")
    rotas = [f["u"] for f in cargan if not f["ok"]]
    say("las 18 fotos de assets2 (p01-p18) cargan en 800 y 1600", not rotas, f"rotas={rotas}")

    # --- un boton de pausa manda sobre los dos grupos ---
    print("\n--- pausa ---")
    botones = page.evaluate("() => document.querySelectorAll('[data-rot-toggle]').length")
    say("cada grupo tiene su boton de pausa", botones == len(GRUPOS), f"botones={botones}")

    page.evaluate("() => document.querySelector('[data-rot-toggle]').click()")
    page.wait_for_timeout(2000)
    antes = {sel: [f["n"] for f in fotos(page, sel)] for _, sel, _ in GRUPOS}
    page.wait_for_timeout(8000)
    despues = {sel: [f["n"] for f in fotos(page, sel)] for _, sel, _ in GRUPOS}
    say("al pausar se detienen los dos grupos", antes == despues, f"{antes} == {despues}")
    marcados = page.evaluate("""() => [...document.querySelectorAll('[data-rot-toggle]')]
        .map(b => b.getAttribute('aria-pressed'))""")
    say("los dos botones reflejan la pausa", marcados == ["true", "true"], str(marcados))

    page.evaluate("() => document.querySelector('[data-rot-toggle]').click()")
    page.wait_for_timeout(200)
    antes = {sel: [f["n"] for f in fotos(page, sel)] for _, sel, _ in GRUPOS}
    esperar(page)
    despues = {sel: [f["n"] for f in fotos(page, sel)] for _, sel, _ in GRUPOS}
    say("al reanudar vuelven a rotar los dos", antes != despues, f"{antes} -> {despues}")

    # --- cobertura de una vuelta completa en el mosaico ---
    print("\n--- cobertura ---")
    vistos = {f["n"] for f in fotos(page, "#pg-mosaic")}
    for _ in range(17):
        page.wait_for_timeout(BEAT + 1400)
        vistos.update(f["n"] for f in fotos(page, "#pg-mosaic"))
    esperadas = {(("p0" if i < 9 else "p") + str(i + 1)) for i in range(18)}
    say("en una vuelta completa salen las 18 fotos", vistos == esperadas,
        f"vistas={len(vistos)}/18 faltan={sorted(esperadas - vistos)}")

    say("sin errores de JS", not errores, str(errores[:3]))
    page.close()

    # --- prefers-reduced-motion ---
    print("\n--- sin movimiento ---")
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, reduced_motion="reduce")
    rm = ctx.new_page()
    rm.goto(URL, wait_until="load")
    for _, sel, _ in GRUPOS:
        rm.evaluate("s => document.querySelector(s).scrollIntoView({block:'center'})", sel)
        rm.wait_for_timeout(600)
    a = {sel: [f["n"] for f in fotos(rm, sel)] for _, sel, _ in GRUPOS}
    rm.wait_for_timeout(8000)
    b = {sel: [f["n"] for f in fotos(rm, sel)] for _, sel, _ in GRUPOS}
    say("con reduced-motion no rota ninguno", a == b, f"{a} == {b}")
    hidden = rm.evaluate("""() => [...document.querySelectorAll('[data-rot-toggle]')]
        .map(b => b.hidden)""")
    say("con reduced-motion los botones no se muestran", hidden == [True, True], str(hidden))
    cargadas = rm.evaluate("""() => [...document.querySelectorAll('[data-rot-img]')]
        .filter(i => i.naturalWidth > 0).length""")
    say("con reduced-motion las fotos siguen visibles", cargadas >= 7, f"cargadas={cargadas}/7")
    ctx.close()

    # --- se recupera si el navegador no entrega el IntersectionObserver ---
    # Caso real: la pagina se abre en segundo plano y el observer no entrega
    # nunca. Al volver a la pestana el movimiento debe arrancar solo.
    print("\n--- recuperacion ---")
    ctx2 = browser.new_context(viewport={"width": 1440, "height": 900})
    ciego = ctx2.new_page()
    ciego.add_init_script("""
        window.IntersectionObserver = function () {
          this.observe = function () {}; this.unobserve = function () {};
          this.disconnect = function () {};
        };
    """)
    ciego.goto(URL, wait_until="load")
    ciego.evaluate("() => document.querySelector('#acerca').scrollIntoView({block:'center'})")
    ciego.wait_for_timeout(7000)
    parado = [f["n"] for f in fotos(ciego, "#acerca .pg-about__media")]
    ciego.evaluate("() => document.dispatchEvent(new Event('visibilitychange'))")
    ciego.wait_for_timeout(7600)
    movido = [f["n"] for f in fotos(ciego, "#acerca .pg-about__media")]
    say("sin observer, al volver a la pestana el movimiento arranca solo",
        parado == ["p09", "p10"] and movido != parado, f"{parado} -> {movido}")
    ctx2.close()

    # --- sin desbordes en toda la matriz ---
    print("\n--- resoluciones ---")
    for w, h in ((320, 568), (390, 844), (576, 800), (768, 1024), (1024, 768),
                 (1440, 900), (1920, 1080), (2560, 1440)):
        m = browser.new_page(viewport={"width": w, "height": h})
        m.goto(URL, wait_until="load")
        for _, sel, n in GRUPOS:
            m.evaluate("s => document.querySelector(s).scrollIntoView({block:'center'})", sel)
            m.wait_for_timeout(500)
        geo = m.evaluate("""() => {
            const desborde = document.documentElement.scrollWidth - window.innerWidth;
            const mal = [];
            for (const box of document.querySelectorAll('[data-rotator]')) {
              for (const i of box.querySelectorAll('img[data-rot-img]')) {
                const b = i.getBoundingClientRect();
                // La foto del recuadro grande debe llenarlo exactamente. Las
                // pequenas son superposiciones (el inset al 42 %, las casillas
                // del mosaico a su altura de rejilla), asi que solo se comprueba
                // que queden dentro de la pantalla.
                if (i.getAttribute('data-rot-img') === 'big') {
                  const p = i.parentElement.getBoundingClientRect();
                  if (Math.abs(b.width - p.width) > 1.5 || Math.abs(b.height - p.height) > 1.5) {
                    mal.push('grande ' + i.getAttribute('src').split('/').pop() + ' ' +
                             Math.round(b.width) + 'x' + Math.round(b.height) + ' vs ' +
                             Math.round(p.width) + 'x' + Math.round(p.height));
                  }
                }
                if (b.right > window.innerWidth + 1 || b.left < -1) {
                  mal.push('fuera de pantalla: ' + i.getAttribute('src'));
                }
              }
            }
            return {desborde, mal};
        }""")
        say(f"{w}x{h}: sin desbordes y cada recuadro en su caja",
            geo["desborde"] <= 0 and not geo["mal"], str(geo))
        m.close()

    browser.close()

fallos = sum(1 for r in results if not r)
print(f"\n{len(results) - fallos}/{len(results)} comprobaciones OK")
sys.exit(1 if fallos else 0)
