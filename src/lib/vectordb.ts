import { DataAPIClient } from "@datastax/astra-db-ts";
import { AstraDBVectorStore } from "@langchain/community/vectorstores/astradb";
import { OpenAIEmbeddings } from "@langchain/openai";

const endpoint = process.env.ASTRA_DB_API_ENDPOINT || "https://1da7f99c-e468-4c6a-b962-d9093abd5710-us-east-2.apps.astra.datastax.com";
const token = process.env.ASTRA_DB_APPLICATION_TOKEN || "AstraCS:mhKJXHzimvmszUaeyRfsOPTT:9125e37b714ac1bcd7f4217717f7737de53d785f0b5f3e98d3ac0dfcb17f31c3";
const collection = process.env.ASTRA_DB_COLLECTION || "defualt_keyspace";

if (!endpoint || !token || !collection) {
  throw new Error("Please set environmental variables for Astra DB!");
}

export async function getVectorStore() {
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
  const client = new DataAPIClient(token);
  const db = client.db(endpoint);

  return db.collection(collection);
}
