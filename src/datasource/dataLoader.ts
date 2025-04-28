import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Interfaces for data types
export interface Action {
  _id: string;
  name: string;
  description: string;
  functionString: string | null;
  params: Record<string, any>;
  resourceTemplateId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Trigger {
  _id: string;
  name: string;
  description: string;
  params: Record<string, any>;
  functionString: string | null;
  resourceTemplateId: string;
  createdAt: number;
  updatedAt?: number;
}

export interface Response {
  _id: string;
  name: string;
  description: string;
  platforms: Array<{
    integrationId: string;
    localeGroups: Array<{
      localeGroup: string;
      variations: Array<{
        name: string;
        responses: Array<Record<string, any>>;
      }>;
    }>;
    build: number;
  }>;
  tags: string[];
  createdAt: number;
  updatedAt?: number;
}

export interface ResourceTemplate {
  _id: string;
  type: string;
  name: string;
  description?: string;
  schema: Record<string, any>;
  integrationId: string;
  functionString: string;
  key: string;
  updatedAt: number;
  requestedVerification?: boolean;
  verified?: boolean;
  published?: boolean;
  createdAt?: number;
}

export interface Node {
  _id: string;
  name: string;
  description: string;
  trigger: string | null;
  preActions: string[] | null;
  responses: string[] | null;
  postActions: string[] | null;
  actions: string[] | null;
  compositeId: string | null;
  global: boolean;
  redirect: {
    nodeCompositeId: string;
    sendResponse: boolean;
    runPreAction: boolean;
    runPostAction: boolean;
  } | null;
  analytics: any | null;
  memberTagging: any | null;
  type: any | null;
  tags: any | null;
  saveCompositeId: boolean;
  createdAt: number;
  updatedAt: number;
  parents: string[] | null;
  root: boolean | null;
  position?: {
    x: number;
    y: number;
  };
  colour?: string;
  priority?: number;
}

// Function to read JSON files
function readJsonFile<T>(filename: string): T[] {
  const filePath = path.join(__dirname, filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    return [];
  }
}

// Load all data from JSON files
export const actions = readJsonFile<Action>('action.json');
export const triggers = readJsonFile<Trigger>('trigger.json');
export const responses = readJsonFile<Response>('response.json');
export const resourceTemplates = readJsonFile<ResourceTemplate>('resourceTemplate.json');
export const nodes = readJsonFile<Node>('node.json');

// Helper functions to find items by ID
export function findNodeById(id: string): Node | undefined {
  return nodes.find(node => node._id === id);
}

export function findActionById(id: string): Action | undefined {
  return actions.find(action => action._id === id);
}

export function findTriggerById(id: string): Trigger | undefined {
  return triggers.find(trigger => trigger._id === id);
}

export function findResponseById(id: string): Response | undefined {
  return responses.find(response => response._id === id);
}

export function findResourceTemplateById(id: string): ResourceTemplate | undefined {
  return resourceTemplates.find(template => template._id === id);
}

// Helper function to find parent nodes
export function findParentNodes(parentIds: string[]): Node[] {
  if (!parentIds) return [];
  return nodes.filter(node => parentIds.includes(node._id));
}
