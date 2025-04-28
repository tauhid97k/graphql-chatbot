import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  LongTypeDefinition,
  JSONDefinition,
  LongResolver,
  JSONResolver,
} from "graphql-scalars";
import { typeDefs } from "./schema.ts";
import { resolvers } from "./resolvers.ts";
import { config } from "./config/env.ts";
import { getAuthContext, requireAuth } from "./auth/auth.ts";

// Create the Apollo Server
const server = new ApolloServer({
  typeDefs: [LongTypeDefinition, JSONDefinition, typeDefs],
  resolvers: {
    JSON: JSONResolver,
    Long: LongResolver,
    ...resolvers,
  },
});

// Start the server with authentication middleware
const { url } = await startStandaloneServer(server, {
  listen: { port: config.port },
  context: async ({ req }) => {
    // Get the authorization header from the request
    const authHeader = req.headers.authorization || '';
    
    // Create the auth context
    const auth = getAuthContext(authHeader);
    
    // Return the context with auth information
    return { auth, requireAuth };
  },
});

console.log(`🚀  Server ready at: ${url}`);