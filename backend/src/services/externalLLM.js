const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) {
  throw new Error(
    "Please define the GROQ_API_KEY environment variable inside .env.local"
  );
}

function getMessage(task) {
  const message = {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content:
          "Analyze this JavaScript/TypeScript code and provide feedback on best practices, performance, and possible errors." +
          task,
      },
    ],
    max_tokens: 200,
    temperature: 0.7,
  };

  return message;
}

export async function getRevievedCode(task) {
  const res = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(getMessage(task)),
  });

  // console.log("Response from GROQ:", res);

  if (!res.ok) {
    throw new Error("Failed to fetch data from GROQ");
  }

  const data = await res.json();
  const responce = data.choices[0].message.content;
  if (!responce) {
    throw new Error("No response from GROQ");
  }

  return responce;
}
