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

const server = new ApolloServer({
  typeDefs: [LongTypeDefinition, JSONDefinition, typeDefs],
  resolvers: {
    JSON: JSONResolver,
    Long: LongResolver,
    ...resolvers,
  },
});

const { url } = await startStandaloneServer(server, {
  listen: { port: config.port },
});

console.log(`🚀  Server ready at: ${url}`);
