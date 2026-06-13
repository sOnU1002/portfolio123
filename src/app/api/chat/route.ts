import {
  CHAT_SUGGESTIONS,
  getFallbackResponse,
  SAKET_KNOWLEDGE,
} from "@/lib/knowledge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are Saket Nigam's AI portfolio assistant. Answer questions about Saket professionally, concisely, and helpfully using ONLY the knowledge below. Use markdown formatting. If asked about contacting Saket, mention sjnigam10@gmail.com and the contact page. For resume, link to /resume.pdf.

${SAKET_KNOWLEDGE}`;

function getAIClient() {
  if (process.env.GROQ_API_KEY) {
    return new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });
  }

  if (process.env.OPENAI_API_KEY) {
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  return null;
}

function getModel() {
  if (process.env.GROQ_API_KEY) return "llama-3.3-70b-versatile";
  return "gpt-4o-mini";
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();
    const lastMessage = messages[messages.length - 1]?.content || "";

    const client = getAIClient();

    if (!client) {
      const answer = getFallbackResponse(lastMessage);
      const stream = new ReadableStream({
        start(controller) {
          const encoder = new TextEncoder();
          controller.enqueue(encoder.encode(answer));
          controller.close();
        },
      });
      return new StreamingTextResponse(stream);
    }

    const response = await client.chat.completions.create({
      model: getModel(),
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API error:", error);
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(
          encoder.encode(
            "Sorry, I encountered an error. Please try again or use the [contact form](/contact) to reach Saket directly.",
          ),
        );
        controller.close();
      },
    });
    return new StreamingTextResponse(stream);
  }
}

export async function GET() {
  return Response.json({ suggestions: CHAT_SUGGESTIONS });
}
