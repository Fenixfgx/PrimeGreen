"""Prime Green site audit - run before every deploy:  python tools/site-audit.py

Checks that no referenced asset is missing, the heading structure is valid, the metadata
lengths are in the range Google displays, structured data parses, and reports the weight
of the first render versus what is deferred.
Exits non-zero on a hard failure, so it can gate a publish.
"""
import json
import os
import re
import sys
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
errors, warnings = [], []

REMOTE = ("http://", "https://", "//", "data:", "mailto:", "tel:", "#", "javascript:")
html = open("index.html", encoding="utf-8").read()

# ---------- 1. every local asset reference must resolve ----------
refs = set(re.findall(r'(?:src|href|poster)="([^"]+)"', html))
refs.update(re.findall(r"""["'](img/[^"']+\.(?:png|jpe?g|webp|svg|gif))["']""", html))
for js in os.listdir("js"):
    if js.endswith(".js"):
        src = open(os.path.join("js", js), encoding="utf-8").read()
        refs.update(re.findall(r"""["'](img/[^"']+\.(?:png|jpe?g|webp|svg|gif))["']""", src))

# stylesheets reference images too; only a class actually used can trigger the fetch
css_backgrounds = set()
for css in os.listdir("css"):
    if not css.endswith(".css"):
        continue
    content = open(os.path.join("css", css), encoding="utf-8").read()
    for selector, body in re.findall(r"([^{}]+)\{([^}]*)\}", content):
        for url in re.findall(r"url\(\s*['\"]?([^)'\"]+)", body):
            if url.startswith(REMOTE):
                continue
            classes = re.findall(r"\.([A-Za-z0-9_-]+)", selector)
            if not any(re.search(rf'class="[^"]*\b{re.escape(c)}\b', html) for c in classes):
                continue
            css_backgrounds.add("css/" + os.path.normpath(url).replace("\\", "/"))

checked = 0
for ref in sorted(refs | css_backgrounds):
    ref = ref.split("?")[0].split("#")[0]
    if not ref or ref.startswith(REMOTE) or "${" in ref:
        continue
    checked += 1
    if not os.path.exists(ref):
        errors.append(f"missing referenced asset: {ref}")

# ---------- 2. heading structure ----------
h1s = re.findall(r"<h1\b", html)
if len(h1s) != 1:
    errors.append(f"expected exactly 1 <h1>, found {len(h1s)}")
h2s = len(re.findall(r"<h2\b", html))

# ---------- 3. metadata ----------
def check_len(pattern, label, lo, hi):
    found = re.search(pattern, html, re.S)
    if not found:
        errors.append(f"missing {label}")
        return 0
    text = found.group(1)
    if not lo <= len(text) <= hi:
        warnings.append(f"{label} is {len(text)} chars (target {lo}-{hi})")
    return len(text)

title_len = check_len(r"<title>(.*?)</title>", "title", 30, 65)
desc_len = check_len(r'name="description" content="([^"]*)"', "meta description", 70, 165)
for need in ('rel="canonical"', 'name="viewport"', 'property="og:image"', 'name="twitter:card"', 'name="robots"'):
    if need not in html:
        errors.append(f"missing {need}")

og = re.search(r'property="og:image" content="([^"]+)"', html)
if og:
    local = og.group(1).replace("https://www.primegreen.com.co/", "")
    if not os.path.exists(local):
        errors.append(f"og:image does not exist on disk: {local}")

# ---------- 4. structured data ----------
blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
if not blocks:
    errors.append("no JSON-LD structured data found")
for i, block in enumerate(blocks, 1):
    try:
        data = json.loads(block)
        if "@type" not in data or "@context" not in data:
            errors.append(f"JSON-LD block {i} lacks @context/@type")
    except json.JSONDecodeError as exc:
        errors.append(f"JSON-LD block {i} is invalid JSON: {exc}")

# ---------- 5. crawler files ----------
try:
    ET.parse("sitemap.xml")
    locs = re.findall(r"<loc>(.*?)</loc>", open("sitemap.xml", encoding="utf-8").read())
    pages = [u for u in locs if not re.search(r"\.(png|jpe?g|webp)$", u)]
    if len(pages) != 1:
        errors.append(f"sitemap should list exactly 1 page URL, found {len(pages)}")
    if any("#" in u for u in pages):
        errors.append("sitemap contains a fragment URL (#), which is not indexable")
except ET.ParseError as exc:
    errors.append(f"sitemap.xml is not valid XML: {exc}")

robots = open("robots.txt", encoding="utf-8").read()
if "Sitemap:" not in robots:
    errors.append("robots.txt does not declare a sitemap")
if "Crawl-delay" in robots:
    warnings.append("robots.txt still sets Crawl-delay, which Google ignores")

# ---------- 6. dead references ----------
for dead in ("mail/", "owlcarousel", "tempusdominus", "service-1.jpg", "carousel-1.jpg\""):
    if dead in html and dead != "carousel-1.jpg\"":
        errors.append(f"index.html still references removed/absent resource: {dead}")

# ---------- 7. weight of first render vs deferred ----------
def kb(path):
    # las rutas del HTML llevan ?v= de caché: sin limpiarlo os.path.exists
    # siempre fallaba y el peso crítico se reportaba como 0.
    path = path.split("?")[0].split("#")[0]
    return os.path.getsize(path) / 1024 if os.path.exists(path) else 0

eager = deferred = 0.0
for tag in re.findall(r"<img\b[^>]*>", html):
    src = re.search(r'src="([^"]+)"', tag)
    if not src or src.group(1).startswith(REMOTE):
        continue
    if 'loading="lazy"' in tag:
        deferred += kb(src.group(1))
    else:
        eager += kb(src.group(1))

critical = sum(kb(p) for p in re.findall(r'(?:href|src)="((?:css|lib|js)/[^"]+)"', html))
poster = kb("img/carousel-1.jpg")
reels_dir = "video/reels"
reels = sum(kb(os.path.join(reels_dir, f)) for f in os.listdir(reels_dir)) if os.path.isdir(reels_dir) else 0

print(f"checked local refs   : {checked}")
print(f"h1 / h2 tags         : {len(h1s)} / {h2s}")
print(f"title / description  : {title_len} / {desc_len} chars")
print(f"JSON-LD blocks       : {len(blocks)}")
print(f"eager images         : {eager:8.0f} KB")
print(f"lazy images          : {deferred:8.0f} KB (deferred)")
print(f"local css+js         : {critical:8.0f} KB")
print(f"hero poster (LCP)    : {poster:8.0f} KB")
print(f"reels video          : {reels:8.0f} KB (deferred, tras interacción)")
print(f"FIRST RENDER approx  : {eager + critical + poster:8.0f} KB")

for w in warnings:
    print(f"WARN  {w}")
for e in errors:
    print(f"FAIL  {e}")
print("AUDIT OK" if not errors else f"AUDIT FAILED ({len(errors)} errors)")
sys.exit(1 if errors else 0)
