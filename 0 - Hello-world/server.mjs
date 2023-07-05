import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// The GraphQL schema
const typeDefs = `#graphql
    type Query {
        greet: String
        message:String
    }
`;

// A map of functions which return data for the schema.
const resolvers = {
	Query: {
		greet: () => "Hello world",
		message: () => "This is GraphQL, Used by Sandeep",
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server);

console.log(`Server is ready at ${url}`);
