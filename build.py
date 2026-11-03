# Run: python build.py   (inlines src/ into app.html)
import json
t = open('src/app.template.html').read(); css = open('src/styles.css').read(); js = open('src/app.js').read(); eng = open('src/engines.json').read()
json.loads(eng)
js = js.replace("fetch('engines/engines.json').then(r => r.json())", "Promise.resolve(INLINE_ENGINES)").replace("register('sw.js'))", "register('sw.js').catch(() => {}))")
js = "const INLINE_ENGINES = " + eng.strip() + ";\n" + js
t = t.replace('<link rel="stylesheet" href="styles.css">', '<style>' + css + '</style>').replace('<script src="app.js"></script>', '<script>' + js + '</script>')
t = t.replace('<body>', '<body>\n<script>onerror=function(m,s,l){document.body.insertAdjacentHTML("afterbegin","<pre style=\\"background:#fee;color:#900;padding:1rem;white-space:pre-wrap;margin:0\\">BlockBuilder error: "+m+" (line "+l+")</pre>")}</script>', 1)
open('app.html', 'w').write(t)
