import { getVectorStore } from "@/lib/vectordb";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
  PromptTemplate,
} from "@langchain/core/prompts";
import { LangChainStream, Message, StreamingTextResponse } from "ai";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages;

    const latestMessage = messages[messages.length - 1].content;

    const { stream, handlers } = LangChainStream();

    // Create retriever from the vector store
    const retriever = (await getVectorStore()).asRetriever();

    // Get chat history from the messages
    const chatHistory = messages
      .slice(0, -1) // ignore latest message
      .map((msg: Message) =>
        msg.role === "user"
          ? new HumanMessage(msg.content)
          : new AIMessage(msg.content),
      );

    // Prepare the rephrase prompt
    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation history, generate a search query to look up information relevant to the current question. " +
          "Do not leave out any relevant keywords. " +
          "Only return the query and no other text. ",
      ],
    ]);

    // Create a history-aware retriever chain
   

    // Final system prompt
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You are Ted Support, a friendly chatbot for Ted's personal developer portfolio website. " +
          "You are trying to convince potential employers to hire Ted as a software developer. " +
          "Be concise and only answer the user's questions based on the provided context below. " +
          "Provide links to pages that contain relevant information about the topic from the given context. " +
          "Format your messages in markdown.\n\n" +
          "Context:\n{context}",
      ],
      new MessagesPlaceholder("chat_history"),
      ["user", "{input}"],
    ]);

    // Create the document chain that processes retrieved documents
    

    // Retrieve relevant documents and generate a response
    

    // Invoke the chain to generate the response
   

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
