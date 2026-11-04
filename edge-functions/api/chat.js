// EdgeOne Pages Edge Function → POST /api/chat  (streams Server-Sent Events from Gemini)
// Env vars: GEMINI_API_KEY (required), GEMINI_MODEL (optional, default gemini-2.5-flash)
const SYSTEM = `You are Block Builder, a veteran engine machinist and builder who helps people pull and take apart engines.
You know teardown order, bolt and fastener handling, timing sets, valvetrain, bottom-end disassembly, inspection and measuring, and what each failure looks like.
Rules:
- Lead with the direct answer, then the reasoning. Be concise and practical, written for someone standing at the engine with greasy hands.
- When given photos or video frames, describe what you actually see (wear, scoring, leaks, sludge, cracks, damage, missing parts, routing) and say what you cannot confirm from the media.
- Use the engine in the Active project block. Mention engine-specific gotchas (interference timing, torque-to-yield head bolts, VVT phasers, balance shafts, dry sump, aluminum blocks) when they apply.
- Never invent torque specs, clearances or firing orders. Give a value only when you are confident, and always tell the person to confirm it in the factory service manual for their exact engine.
- Flag safety first: rated hoist and stand, pinch points, fuel and high-pressure systems, hot or cracked parts, and solvent and dust exposure.
- If key information is missing, give a best provisional answer, then ask one targeted question.`;

const json = (b, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });

// GET /api/chat → quick deployment check (no secrets): open it in your browser to see if the function is live and the key is set
export async function onRequestGet({ env }) {
  return json({ ok: true, function: 'chat', keySet: !!env.GEMINI_API_KEY, model: env.GEMINI_MODEL || 'gemini-2.5-flash' });
}

export async function onRequestPost({ request, env }) {
  const key = env.GEMINI_API_KEY;
  if (!key) return json({ error: 'GEMINI_API_KEY is not set on the server.' }, 500);
  let p; try { p = await request.json(); } catch { return json({ error: 'Invalid JSON.' }, 400); }
  const contents = Array.isArray(p.contents) ? p.contents.slice(-20) : [];
  if (!contents.length) return json({ error: 'No messages.' }, 400);
  const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
  const ctx = typeof p.context === 'string' && p.context ? '\n\nActive project (from the app, may be incomplete):\n' + p.context.slice(0, 2500) : '';
  const generationConfig = { temperature: 0.4, maxOutputTokens: 2048 };
  if (model.includes('2.5-flash')) generationConfig.thinkingConfig = { thinkingBudget: 0 };
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: SYSTEM + ctx }] }, contents, generationConfig }),
  });
  if (!res.ok) { const d = await res.json().catch(() => ({})); return json({ error: d?.error?.message || 'Gemini request failed.' }, res.status); }
  return new Response(res.body, { headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache, no-transform' } });
}