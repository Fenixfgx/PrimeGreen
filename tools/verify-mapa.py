"""Verificacion del mapamundi de la seccion «Presencia global» (#nuestros-verdes).

Comprueba lo que motivo el cambio y lo que debe seguir funcionando:
  · no se pide ningun tile ni libreria externa (era el origen del 403)
  · las 12 coordenadas caen dentro del mapamundi y no se solapan en exceso
  · los marcadores tienen contraste suficiente sobre el fondo del mapa
  · al pulsar (raton y teclado) se abre el panel del pais
  · sin desbordes en toda la matriz de resoluciones

Uso: python tools/verify-mapa.py [url]
"""
import re
import sys
from playwright.sync_api import sync_playwright

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8899/?verify=mapa"
results = []


def say(txt, good, detail=""):
    results.append(good)
    print(f"{'SI' if good else 'NO'}  {txt}  {detail}")


def contraste(a, b):
    def lum(color):
        color = color.lstrip("#")
        if len(color) == 3:
            color = "".join(c * 2 for c in color)
        canales = []
        for i in (0, 2, 4):
            v = int(color[i:i + 2], 16) / 255
            canales.append(v / 12.92 if v <= 0.03928 else ((v + 0.055) / 1.055) ** 2.4)
        r, g, bl = canales
        return 0.2126 * r + 0.7152 * g + 0.0722 * bl
    la, lb = lum(a), lum(b)
    hi, lo = max(la, lb), min(la, lb)
    return round((hi + 0.05) / (lo + 0.05), 2)


with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 900})

    externas, errores = [], []
    page.on("request", lambda r: externas.append(r.url) if r.url.startswith("http") and "127.0.0.1" not in r.url else None)
    page.on("pageerror", lambda e: errores.append(str(e)))

    page.goto(URL, wait_until="load")
    page.evaluate("() => document.querySelector('#nuestros-verdes').scrollIntoView({block:'center'})")
    page.wait_for_timeout(2500)

    # --- 1. nada de tiles ni librerias externas ---
    tiles = [u for u in externas if "tile" in u or "openstreetmap" in u]
    leaflet = [u for u in externas if "leaflet" in u]
    say("no se pide ningun tile a OpenStreetMap", not tiles, f"{len(tiles)} peticiones")
    say("no se descarga Leaflet", not leaflet, f"{len(leaflet)} peticiones")

    # --- 2. la imagen del mapamundi ---
    mapa = page.evaluate("""() => {
        const img = document.querySelector('.pg-worldmap__img');
        const box = document.querySelector('.pg-worldmap').getBoundingClientRect();
        return {src: (img.currentSrc || '').split('/').pop(), nw: img.naturalWidth,
                ratio: +(box.width / box.height).toFixed(3),
                objetivo: +(2028 / 800).toFixed(3)};
    }""")
    say("el mapamundi propio carga", mapa["nw"] > 0, str(mapa))
    say("el contenedor conserva la proporcion de la imagen (los % cuadran)",
          abs(mapa["ratio"] - mapa["objetivo"]) < 0.02, f"{mapa['ratio']} vs {mapa['objetivo']}")

    # --- 3. los 12 marcadores ---
    pins = page.evaluate("""() => {
        const box = document.querySelector('.pg-worldmap').getBoundingClientRect();
        return [...document.querySelectorAll('.pg-pin')].map(p => {
            const r = p.getBoundingClientRect();
            return {
              pais: p.getAttribute('aria-label').replace('Ver información de ', ''),
              color: getComputedStyle(p).backgroundColor,
              cx: r.left + r.width / 2 - box.left,
              cy: r.top + r.height / 2 - box.top,
              w: box.width, h: box.height
            };
        });
    }""")
    say("se dibujan los 12 marcadores", len(pins) == 12, f"{len(pins)} marcadores")
    fuera = [q["pais"] for q in pins if not (0 <= q["cx"] <= q["w"] and 0 <= q["cy"] <= q["h"])]
    say("todos los marcadores caen dentro del mapamundi", not fuera, f"fuera={fuera}")

    # --- 3-bis. ninguno tapa a otro (España, Francia y Alemania coinciden casi) ---
    def solapados(lista):
        pares = []
        for i in range(len(lista)):
            for j in range(i + 1, len(lista)):
                dx = lista[i]["cx"] - lista[j]["cx"]
                dy = lista[i]["cy"] - lista[j]["cy"]
                if abs(dx) < lista[i]["lado"] * 0.8 and abs(dy) < lista[i]["lado"] * 0.8:
                    pares.append((lista[i]["pais"], lista[j]["pais"],
                                  round(abs(dx), 1), round(abs(dy), 1)))
        return pares

    for w, h in ((1440, 900), (390, 844)):
        page.set_viewport_size({"width": w, "height": h})
        page.evaluate("() => document.querySelector('#nuestros-verdes').scrollIntoView({block:'center'})")
        page.wait_for_timeout(1200)
        medidos = page.evaluate("""() => {
            const box = document.querySelector('.pg-worldmap').getBoundingClientRect();
            return [...document.querySelectorAll('.pg-pin')].map(p => {
                const r = p.getBoundingClientRect();
                return {pais: p.getAttribute('aria-label').replace('Ver información de ', ''),
                        cx: r.left + r.width / 2 - box.left,
                        cy: r.top + r.height / 2 - box.top,
                        lado: r.width};
            });
        }""")
        choques = solapados(medidos)
        say(f"{w}px: ningun marcador tapa a otro", not choques, f"choques={choques}")

    page.set_viewport_size({"width": 1440, "height": 900})
    page.evaluate("() => document.querySelector('#nuestros-verdes').scrollIntoView({block:'center'})")
    page.wait_for_timeout(900)

    # --- 4. contraste de cada marcador sobre el fondo del mapa ---
    fondo = "#f3efe5"   # --pg-surface-2
    bajos = []
    for q in pins:
        m = re.match(r"rgb\((\d+), (\d+), (\d+)\)", q["color"])
        hexa = "#%02x%02x%02x" % (int(m.group(1)), int(m.group(2)), int(m.group(3)))
        c = contraste(hexa, fondo)
        if c < 3:
            bajos.append((q["pais"], hexa, c))
    say("los 12 marcadores superan 3:1 sobre el fondo del mapa", not bajos, f"bajos={bajos}")

    # --- 5. el panel del pais se abre con raton y con teclado ---
    page.click(".pg-pin")
    page.wait_for_timeout(900)
    panel = page.evaluate("""() => {
        const s = document.getElementById('country-sidebar');
        const c = document.getElementById('sidebar-content');
        return {visible: getComputedStyle(s).display !== 'none',
                titulo: document.getElementById('sidebar-title').textContent.trim(),
                largo: c.textContent.trim().length,
                seleccionado: document.querySelectorAll('.pg-pin.is-selected').length};
    }""")
    say("al pulsar un marcador se abre el panel del pais",
          panel["visible"] and panel["largo"] > 50, str(panel))
    say("el marcador pulsado queda marcado como seleccionado",
          panel["seleccionado"] == 1, f"seleccionados={panel['seleccionado']}")

    page.click("#close-sidebar")
    page.wait_for_timeout(700)
    cerrado = page.evaluate("() => getComputedStyle(document.getElementById('country-sidebar')).display")
    say("el boton de cerrar oculta el panel", cerrado == "none", f"display={cerrado}")

    page.focus(".pg-pin:nth-child(3)")
    page.keyboard.press("Enter")
    page.wait_for_timeout(800)
    teclado = page.evaluate("""() => ({
        visible: getComputedStyle(document.getElementById('country-sidebar')).display !== 'none',
        titulo: document.getElementById('sidebar-title').textContent.trim()
    })""")
    say("con teclado (Enter) tambien se abre el panel", teclado["visible"], str(teclado))

    say("sin errores de JS", not errores, str(errores[:3]))
    page.close()

    # --- 6. matriz de resoluciones ---
    print()
    for w, h in ((320, 568), (390, 844), (576, 800), (768, 1024), (1024, 768),
                 (1440, 900), (1920, 1080), (2560, 1440)):
        m = browser.new_page(viewport={"width": w, "height": h})
        m.goto(URL, wait_until="load")
        m.evaluate("() => document.querySelector('#nuestros-verdes').scrollIntoView({block:'center'})")
        m.wait_for_timeout(900)
        geo = m.evaluate("""() => {
            const caja = document.querySelector('.pg-worldmap').getBoundingClientRect();
            const pins = [...document.querySelectorAll('.pg-pin')].map(p => p.getBoundingClientRect());
            const fuera = pins.filter(r => r.right > caja.right + 1 || r.left < caja.left - 1).length;
            const alto = document.querySelector('.pg-pin').getBoundingClientRect().height;
            const tactil = document.querySelector('.pg-pin').getBoundingClientRect();
            // area tactil real = el punto mas el ::after (inset negativo)
            const after = getComputedStyle(document.querySelector('.pg-pin'), '::after');
            return {desborde: document.documentElement.scrollWidth - window.innerWidth,
                    altoMapa: Math.round(caja.height), altoPin: Math.round(alto),
                    fuera, after: after.inset, ratio: +(caja.width / caja.height).toFixed(2)};
        }""")
        say(f"{w}x{h}: sin desbordes y marcadores dentro del mapa",
              geo["desborde"] <= 0 and geo["fuera"] == 0, str(geo))
        m.close()

    browser.close()

fallos = sum(1 for r in results if not r)
print(f"\n{len(results) - fallos}/{len(results)} comprobaciones OK")
sys.exit(1 if fallos else 0)
