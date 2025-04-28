// Simple authentication module for GraphQL API
import { GraphQLError } from 'graphql';

// This would typically be stored securely, not hardcoded
const API_TOKEN = 'graphql-chatbot-token-2025';

export interface AuthContext {
  isAuthenticated: boolean;
  token?: string;
}

export function validateToken(token: string): boolean {
  return token === API_TOKEN;
}

export function getAuthContext(authHeader?: string): AuthContext {
  if (!authHeader) {
    return { isAuthenticated: false };
  }

  // Check if the authorization header has the correct format
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return { isAuthenticated: false };
  }

  const token = parts[1];
  const isAuthenticated = validateToken(token);

  return {
    isAuthenticated,
    token: isAuthenticated ? token : undefined
  };
}

export function requireAuth(context: any) {
  if (!context.auth?.isAuthenticated) {
    throw new GraphQLError('Authentication required', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 }
      }
    });
  }
}
