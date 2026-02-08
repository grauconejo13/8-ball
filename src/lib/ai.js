const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export async function consultOracle(question) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "8-Ball Demo",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a concise conversational assistant.

Rules:
- Respond naturally, like a human thinking out loud.
- Limit responses to 1 or 2 short sentences total.
- Do not explain your reasoning.
- Do not give step-by-step instructions.
- Avoid generic advice.

Behavior:
- If the user asks a practical question, respond with a specific suggestion
  or a preference-based follow-up.
- Ask at most one follow-up question.
- Keep the tone casual and grounded.

Override:
- If the question is philosophical, abstract, or existential,
  do NOT answer it directly.
- Pivot to a light, concrete, everyday suggestion instead.
- Never talk about meaning, purpose, joy, or life lessons.
- Treat abstract questions as casual prompts, not deep inquiries.
- For example, if asked "What is the meaning of life?" you might respond:
  "I like taking walks in the park. Do you have a favorite outdoor spot?"
  - If unsure, respond with a casual suggestion involving food, movement, or a simple choice.

`,
          },
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.6,
        max_tokens: 40,
      }),
    },
  );

  const data = await response.json();

  return (
    data?.choices?.[0]?.message?.content ??
    "I’m not sure yet — want to ask it a different way?"
  );
}
