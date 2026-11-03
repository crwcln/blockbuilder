// EdgeOne Pages Function: POST /api/gemini
// Set GEMINI_API_KEY (and optionally GEMINI_MODEL) in EdgeOne Pages > Project settings > Environment variables.
const hits = new Map(); // best-effort per-instance rate limit
const json = (o, s = 200) => new Response(JSON.stringify(o), { status: s, headers: { 'content-type': 'application/json' } });
const SYSTEM = 'You are BlockBuilder, a careful engine teardown and rebuild assistant. Give short, practical answers. ' +
  'Never invent torque specs or clearances. If you are not certain, say so and tell the user to check the factory service manual. ' +
  'Flag safety risks such as fuel, refrigerant, hot coolant and heavy lifting.';

export async function onRequestPost({ request, env }) {
  const ip = request.headers.get('x-forwarded-for') || 'anon', now = Date.now();
  const recent = (hits.get(ip) || []).filter(t => now - t < 60000);
  if (recent.length >= 10) return json({ error: 'Too many questions. Wait a minute and try again.' }, 429);
  hits.set(ip, [...recent, now]);
  if (!env.GEMINI_API_KEY) return json({ error: 'The server is missing GEMINI_API_KEY.' }, 500);

  let b; try { b = await request.json(); } catch { return json({ error: 'Bad request.' }, 400); }
  const question = String(b.question || '').slice(0, 2000);
  if (!question) return json({ error: 'Ask a question first.' }, 400);

  const parts = [{ text: question }];
  if (b.image && typeof b.image.data === 'string' && b.image.data.length < 4e6)
    parts.push({ inline_data: { mime_type: 'image/jpeg', data: b.image.data } });
  const ctx = `\nEngine: ${String(b.engine || 'unknown').slice(0, 100)}. Current step: ${String(b.step || 'none').slice(0, 150)}.`;

  const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
    body: JSON.stringify({ system_instruction: { parts: [{ text: SYSTEM + ctx }] }, contents: [{ role: 'user', parts }] })
  });
  if (!r.ok) return json({ error: 'The AI service returned an error (' + r.status + '). Try again shortly.' }, 502);
  const d = await r.json();
  const answer = (d.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('').trim();
  return json({ answer: answer || 'The AI did not return an answer. Try rephrasing.' });
}
