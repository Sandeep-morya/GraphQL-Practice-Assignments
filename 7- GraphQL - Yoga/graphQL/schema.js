import { createSchema } from "graphql-yoga";
import { Mutation, Query } from "./resolvers.js";

const typeDefs = `#graphql
    type Message {
        id:ID!
        content:String
        user:String
    }
    type Query {
        messages:[Message]
    }
    type Mutation {
        createMessage(content:String!,user:String!):ID!
    }
`;

const schema = createSchema({
	typeDefs,
	resolvers: { Query, Mutation },
});

export default schema;
