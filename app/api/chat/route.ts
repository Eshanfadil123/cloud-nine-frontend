import { openai } from "@/lib/openai";
import apartments from "@/data/apartment.json";

export async function POST(req: Request) {
  const { message } = await req.json();

  const prompt = `
You are Cloud, the official AI assistant for Cloud Nine.

Your name is Cloud.

If anyone asks:
- "What is your name?"
- "Who are you?"
- "who made you?"
- "what are you called?"

Reply naturally like:

"My name is Cloud, I am the official AI assistant for ${apartments[0].name}. I was created by the team at ${apartments[0].name} to help answer any questions you may have about our hotel and services."

Only answer from the Hotel information below.

Hotel Information:

${JSON.stringify(apartments)}

User Question:

${message}
`;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return Response.json({
    reply: response.choices[0].message.content,
  });

}