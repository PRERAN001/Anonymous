
export async function POST(req: Request) {
  const systemPrompt = `
  Create a list of three open-ended and engaging questions formatted as a single string.
  Each question should be separated by ' || '.

  These questions are for an anonymous social messaging platform like Qooh.me
  and should be suitable for a diverse audience.

  Avoid personal or sensitive topics. Focus on universal themes that encourage
  friendly interaction.

  For example, your output should be structured like this:
  "What's a hobby you've recently started? || If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?"

  Ensure the questions are intriguing, foster curiosity, and contribute to a
  positive and welcoming conversational environment.
  `;
  let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "stepfun/step-3.5-flash:free",
      "messages": [
        {
          "role": "user",
          "content": systemPrompt
        }
      ],
      "reasoning": {"enabled": true}
    })
  });


  const result = await response.json();
  response = result.choices[0].message;
  return Response.json({
    success:true,
    response:response
  })
}