import {
  actions,
  triggers,
  responses,
  resourceTemplates,
  nodes,
  findNodeById,
  findActionById,
  findTriggerById,
  findResponseById,
  findResourceTemplateById,
  findParentNodes
} from './datasource/dataLoader.ts';

import type { Node } from './datasource/dataLoader.ts';

export const resolvers = {
  Query: {
    node: (_: any, { nodeId }: { nodeId: string }, context: any) => {
      // Check authentication before proceeding
      context.requireAuth(context);
      return findNodeById(nodeId);
    },
    nodes: (_: any, __: any, context: any) => {
      context.requireAuth(context);
      return nodes;
    },
    actions: (_: any, __: any, context: any) => {
      context.requireAuth(context);
      return actions;
    },
    triggers: (_: any, __: any, context: any) => {
      context.requireAuth(context);
      return triggers;
    },
    responses: (_: any, __: any, context: any) => {
      context.requireAuth(context);
      return responses;
    },
    resourceTemplates: (_: any, __: any, context: any) => {
      context.requireAuth(context);
      return resourceTemplates;
    }
  },
  
  // Resolver for NodeObject type
  NodeObject: {
    // Resolve the trigger field
    trigger: (parent: Node) => {
      if (!parent.trigger) return null;
      return findTriggerById(parent.trigger);
    },
    
    // Resolve the responses field
    responses: (parent: Node) => {
      if (!parent.responses) return null;
      return parent.responses.map((id: string) => findResponseById(id)).filter(Boolean);
    },
    
    // Resolve the actions field
    actions: (parent: Node) => {
      if (!parent.actions) return null;
      return parent.actions.map((id: string) => findActionById(id)).filter(Boolean);
    },
    
    // Resolve preActions field
    preActions: (parent: Node) => {
      if (!parent.preActions) return null;
      return parent.preActions.map((id: string) => findActionById(id)).filter(Boolean);
    },
    
    // Resolve postActions field
    postActions: (parent: Node) => {
      if (!parent.postActions) return null;
      return parent.postActions.map((id: string) => findActionById(id)).filter(Boolean);
    },
    
    // Resolve parent nodes
    parents: (parent: Node) => {
      if (!parent.parents) return null;
      return findParentNodes(parent.parents);
    },
    
    // Add IDs for easier access in frontend
    triggerId: (parent: Node) => parent.trigger,
    responseIds: (parent: Node) => parent.responses,
    actionIds: (parent: Node) => parent.actions,
    preActionIds: (parent: Node) => parent.preActions,
    postActionIds: (parent: Node) => parent.postActions,
    parentIds: (parent: Node) => parent.parents,
    
    // Resolve redirect field
    redirect: (parent: Node) => parent.redirect,
    
    // Resolve position field
    position: (parent: Node) => parent.position
  },
  
  // Resolver for Action type
  Action: {
    // Resolve the resourceTemplate field
    resourceTemplate: (parent: any) => {
      if (!parent.resourceTemplateId) return null;
      return findResourceTemplateById(parent.resourceTemplateId);
    }
  },
  
  // Resolver for Trigger type
  Trigger: {
    // Resolve the resourceTemplate field
    resourceTemplate: (parent: any) => {
      if (!parent.resourceTemplateId) return null;
      return findResourceTemplateById(parent.resourceTemplateId);
    }
  },
  
  // Resolver for ResponseLocaleGroup type
  ResponseLocaleGroup: {
    // Map localeGroup to localeGroupId for consistency with schema
    localeGroupId: (parent: any) => parent.localeGroup
  }
};
