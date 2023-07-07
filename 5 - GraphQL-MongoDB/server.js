import "dotenv/config";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/schema.js";
import Query from "./graphql/resolvers/query.js";
import Mutation from "./graphql/mutation.js";
import User from "./graphql/user.js";

const server = new ApolloServer({
	typeDefs,
	resolvers: {
		Query,
		User,
		Mutation,
	},
});

try {
	// MongoDB Connection
	const { connection } = await mongoose.connect(process.env.MONGO_URI);
	console.log(`connected with the database of ${connection.name}`);

	//  Server Connection
	const { url } = await startStandaloneServer(server);
	console.log(`Server in running on ${url}`);
} catch (err) {
	console.log(`error in making connection \nReseason: ${err}`);
}
