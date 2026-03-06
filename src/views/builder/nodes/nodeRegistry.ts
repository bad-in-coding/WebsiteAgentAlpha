import type { NodeDefinition } from '@/types/nodeSchema';
const modules = import.meta.glob('@shared/schemas/**/*.json', { eager: true });

export const NODE_REGISTRY: Record<string, NodeDefinition> = {};
for (const path in modules) {
  const schema = (modules[path] as any).default;
  if (schema.type) {
    NODE_REGISTRY[schema.type] = {
      ...schema,
      // Map string icon names to actual logic in BaseNode if needed, 
      // or just pass the string string to be handled there.
      name: schema.type, 
    };
  }
}

export const getDefinition = (type: string): NodeDefinition | undefined => {
  return NODE_REGISTRY[type];
};

export const getAllDefinitions = (): NodeDefinition[] => {
  return Object.values(NODE_REGISTRY);
};
