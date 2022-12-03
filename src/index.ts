import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import neo4j from "neo4j-driver";
import { config } from "dotenv";

config();

/*
Make type-graphql work with apollo
*/

const driver = neo4j.driver(
  "neo4j+s://df3863d2.databases.neo4j.io",
  neo4j.auth.basic("quaildev", process.env.NEO4J_PASSWORD || "")
);

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

const main = async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();