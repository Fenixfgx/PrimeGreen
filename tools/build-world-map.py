"""Genera el mapamundi de puntos que sustituye a los tiles de OpenStreetMap.

Motivo: el sitio es comercial y los servidores de tiles de OSM son de
voluntarios; su politica de uso prohibe el uso intensivo y bloquea la app
(pagina 403 «Access blocked») cuando se pasa de volumen. Este mapamundi se
sirve desde el propio dominio: sin terceros, sin bloqueos y con el contraste
bajo control.

Datos: Natural Earth 110m «land» (dominio publico, sin restricciones).
Proyeccion: equirrectangular (plate carree), recortada en latitud para que no
domine la Antartida.

Uso:
    python tools/build-world-map.py            # descarga los datos si faltan
    python tools/build-world-map.py ruta.geojson
"""
import json
import os
import sys
import urllib.request

from PIL import Image, ImageDraw

FUENTE = ("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/"
          "master/geojson/ne_110m_land.geojson")
CACHE = os.path.join(os.environ.get("TEMP", "/tmp"), "ne_110m_land.geojson")

# Recorte de latitud: deja fuera la Antartida (como el mapa anterior, que
# limitaba los bounds a -60..85) para que el hemisferio norte no quede diminuto.
LAT_N, LAT_S = 84.0, -58.0
ALTO = 800
ANCHO = int(round(ALTO * 360.0 / (LAT_N - LAT_S)))   # 360 de longitud / 142 de latitud

PASO = 10        # separacion entre puntos, en px
RADIO = 2.4      # radio del punto
COLOR = (154, 172, 152, 255)   # salvia apagada, secundaria frente a los marcadores


def datos(ruta=None):
    if ruta:
        with open(ruta, encoding="utf-8") as fh:
            return json.load(fh)
    if not os.path.exists(CACHE):
        print("descargando Natural Earth 110m land...")
        urllib.request.urlretrieve(FUENTE, CACHE)
    with open(CACHE, encoding="utf-8") as fh:
        return json.load(fh)


def proyectar(lon, lat):
    x = (lon + 180.0) / 360.0 * ANCHO
    y = (LAT_N - lat) / (LAT_N - LAT_S) * ALTO
    return x, y


def mascara(geo):
    """Rasteriza la tierra a 1 bit sobre el lienzo de la proyeccion."""
    img = Image.new("L", (ANCHO, ALTO), 0)
    dibujo = ImageDraw.Draw(img)

    def anillo(ring, valor):
        pts = [proyectar(lon, lat) for lon, lat in ring]
        if len(pts) >= 3:
            dibujo.polygon(pts, fill=valor)

    for feat in geo["features"]:
        g = feat.get("geometry") or {}
        if g.get("type") == "Polygon":
            polys = [g["coordinates"]]
        elif g.get("type") == "MultiPolygon":
            polys = g["coordinates"]
        else:
            continue
        for poly in polys:
            # primer anillo = contorno, el resto = huecos
            for i, ring in enumerate(poly):
                anillo(ring, 255 if i == 0 else 0)
    return img


def mapa_de_puntos(mask, escala=1.0):
    """Dibuja la rejilla de puntos a la escala pedida.

    Se renderiza nativo por tamano (no se reduce una imagen grande): al
    reducir, los puntos se vuelven grises y borrosos, y ademas pesan mas.
    """
    ancho = int(round(ANCHO * escala))
    alto = int(round(ALTO * escala))
    paso = PASO * escala
    radio = max(1.1, RADIO * escala)

    out = Image.new("RGBA", (ancho, alto), (0, 0, 0, 0))
    d = ImageDraw.Draw(out)
    px = mask.load()
    n = 0
    y = paso / 2.0
    while y < alto:
        x = paso / 2.0
        while x < ancho:
            mx = min(ANCHO - 1, int(x / escala))
            my = min(ALTO - 1, int(y / escala))
            if px[mx, my] > 128:
                d.ellipse([x - radio, y - radio, x + radio, y + radio], fill=COLOR)
                n += 1
            x += paso
        y += paso
    return out, n


def main():
    geo = datos(sys.argv[1] if len(sys.argv) > 1 else None)
    print(f"lienzo {ANCHO}x{ALTO} (proyeccion equirrectangular {LAT_S}..{LAT_N})")
    mask = mascara(geo)

    salida = os.path.join("img", "world-map.webp")
    for sufijo, escala in (("", 1.0), ("-sm", 0.5)):
        capa, n = mapa_de_puntos(mask, escala)
        destino = salida.replace(".webp", sufijo + ".webp")
        capa.save(destino, "WEBP", quality=90, method=6)
        print(f"  {destino}  {capa.size}  {n} puntos  {os.path.getsize(destino)/1024:.1f} KB")
    return 0


if __name__ == "__main__":
    sys.exit(main())
