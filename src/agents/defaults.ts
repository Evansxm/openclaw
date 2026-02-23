// Defaults for agent metadata when upstream does not supply them.
// Uses Ollama as the default provider for local/consumer hardware.
export const DEFAULT_PROVIDER = "ollama";
export const DEFAULT_MODEL = "llama3.2:1b";
// Conservative fallback used when model metadata is unavailable.
export const DEFAULT_CONTEXT_TOKENS = 128_000;
