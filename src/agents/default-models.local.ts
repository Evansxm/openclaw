import type { ModelDefinitionConfig } from "../config/types.models.js";

const LOCAL_MODEL_COST: ModelDefinitionConfig["cost"] = {
  input: 0,
  output: 0,
  cacheRead: 0,
  cacheWrite: 0,
};

const LOCAL_MODEL_CONTEXT_WINDOW = 128000;
const LOCAL_MODEL_MAX_TOKENS = 8192;

export const LOCAL_DEFAULT_MODELS: ModelDefinitionConfig[] = [
  {
    id: "llama3.2:1b",
    name: "Llama 3.2 1B",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 128000,
    maxTokens: 4096,
  },
  {
    id: "qwen2.5:0.5b",
    name: "Qwen 2.5 0.5B",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 32768,
    maxTokens: 8192,
  },
  {
    id: "mistral:7b",
    name: "Mistral 7B",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 128000,
    maxTokens: 8192,
  },
  {
    id: "phi3:mini",
    name: "Phi-3 Mini",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 4096,
    maxTokens: 4096,
  },
  {
    id: "llama3.2:3b",
    name: "Llama 3.2 3B",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 128000,
    maxTokens: 8192,
  },
  {
    id: "qwen2.5:1.5b",
    name: "Qwen 2.5 1.5B",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 32768,
    maxTokens: 8192,
  },
  {
    id: "phi3:3.8b",
    name: "Phi-3 3.8B",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 4096,
    maxTokens: 4096,
  },
  {
    id: "gemma2:2b",
    name: "Gemma 2 2B",
    reasoning: false,
    input: ["text"],
    cost: LOCAL_MODEL_COST,
    contextWindow: 8192,
    maxTokens: 8192,
  },
];
