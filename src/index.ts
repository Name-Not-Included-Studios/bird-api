import 'reflect-metadata';

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { config } from 'dotenv';
import neo4j, { Driver } from 'neo4j-driver';
import { buildSchema } from 'type-graphql';

import { UserResolver } from './resolvers/UserResolver';

config();

export const neo4jDriver: Driver = neo4j.driver(
	process.env.NEO4J_URI || "",
	neo4j.auth.basic(
		process.env.NEO4J_USERNAME || "",
		process.env.NEO4J_PASSWORD || ""
	),
	{ connectionAcquisitionTimeout: 1000, connectionTimeout: 1000 }
);

const main = async () => {
	// try {

	// } catch (error) {
	// 	console.error(error);
	// }

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

process.on("exit", async () => {
	await neo4jDriver.close();
});
