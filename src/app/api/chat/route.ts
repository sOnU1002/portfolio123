import {
  CHAT_SUGGESTIONS,
  getFallbackResponse,
  SAKET_KNOWLEDGE,
} from "@/lib/knowledge";
import { streamTextResponse } from "@/lib/stream";
import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Saket Nigam's AI portfolio assistant. Answer questions about Saket professionally, concisely, and helpfully using ONLY the knowledge below. Use markdown formatting. If asked about contacting Saket, mention sjnigam10@gmail.com and the contact page. For resume, link to /resume.pdf.

${SAKET_KNOWLEDGE}`;

function getAIClient() {
  const groqKey = process.env.GROQ_API_KEY?.trim();
  const openaiKey = process.env.OPENAI_API_KEY?.trim();

  if (groqKey) {
    return {
      client: new OpenAI({
        apiKey: groqKey,
        baseURL: "https://api.groq.com/openai/v1",
      }),
      model: "llama-3.3-70b-versatile",
    };
  }

  if (openaiKey) {
    return {
      client: new OpenAI({ apiKey: openaiKey }),
      model: "gpt-4o-mini",
    };
  }

  return null;
}

export async function POST(request: Request) {
  let lastMessage = "";

  try {
    const { messages } = await request.json();
    lastMessage = messages[messages.length - 1]?.content || "";

    const ai = getAIClient();

    if (!ai) {
      return streamTextResponse(getFallbackResponse(lastMessage));
    }

    const response = await ai.client.chat.completions.create({
      model: ai.model,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API error:", error);
    return streamTextResponse(
      lastMessage
        ? getFallbackResponse(lastMessage)
        : "Sorry, I encountered an error. Please try again or email Saket at sjnigam10@gmail.com.",
    );
  }
}

export async function GET() {
  return Response.json({
    suggestions: CHAT_SUGGESTIONS,
    hasAI: Boolean(
      process.env.GROQ_API_KEY?.trim() || process.env.OPENAI_API_KEY?.trim(),
    ),
  });
}
