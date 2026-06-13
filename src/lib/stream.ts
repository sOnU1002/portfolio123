import { StreamingTextResponse } from "ai";

/** Stream plain text in the format expected by useChat (AI SDK v3). */
export function streamTextResponse(text: string) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      controller.enqueue(encoder.encode(`0:${JSON.stringify(text)}\n`));
      controller.enqueue(
        encoder.encode(`d:${JSON.stringify({ finishReason: "stop" })}\n`),
      );
      controller.close();
    },
  });
  return new StreamingTextResponse(stream);
}
