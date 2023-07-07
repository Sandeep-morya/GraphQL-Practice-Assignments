import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import typeDefs from "./graphql/schema.js";

import {
	User,
	Teacher,
	Student,
	Query,
	Complaint,
} from "./graphql/resolvers/queries/index.js";

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: { Query, User, Teacher, Student, Complaint },
});

const { url } = await startStandaloneServer(server);
console.log(`🌐 Server in running on ${url}`);
