import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_API_ENDPOINT;
const token = process.env.ASTRA_DB_APPLICATION_TOKEN;
const collection = process.env.ASTRA_DB_COLLECTION || "default_keyspace";

export async function getVectorStore() {
  if (!endpoint || !token) {
    throw new Error("Astra DB environment variables are not configured.");
  }

  return AstraDBVectorStore.fromExistingIndex(
    new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
    {
      token,
      endpoint,
      collection,
      collectionOptions: {
        vector: { dimension: 1536, metric: "cosine" },
      },
    },
  );
}

export async function getEmbeddingsCollection() {
  if (!endpoint || !token) {
    throw new Error("Astra DB environment variables are not configured.");
  }

  const client = new DataAPIClient(token);
  const db = client.db(endpoint);

  return db.collection(collection);
}
