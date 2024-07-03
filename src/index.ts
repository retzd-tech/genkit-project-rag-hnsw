import { generate } from '@genkit-ai/ai';
import { configureGenkit } from '@genkit-ai/core';
import { defineFlow, startFlowsServer } from '@genkit-ai/flow';
import { geminiPro } from '@genkit-ai/googleai';
import * as z from 'zod';
import { googleAI } from '@genkit-ai/googleai';
import { hnswIndexer, hnswRetriever } from "genkitx-hnsw";

configureGenkit({
  plugins: [
    googleAI({ apiKey: process.env.GOOGLE_API_KEY }),
    hnswIndexer({ apiKey: process.env.GOOGLE_API_KEY }),
    hnswRetriever({ apiKey: process.env.GOOGLE_API_KEY })
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const menuSuggestionFlow = defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (subject) => {
    const llmResponse = await generate({
      prompt: `Suggest an item for the menu of a ${subject} themed restaurant`,
      model: geminiPro,
      config: {
        temperature: 1,
      },
    });

    return llmResponse.text();
  }
);

startFlowsServer();
