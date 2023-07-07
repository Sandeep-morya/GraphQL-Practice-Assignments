import {} from "@apollo/server";

const typeDefs = `#graphql
    type User {
        _id:ID
        name: String
	    age: Int
	    gender: String
	    createdAt: String
        messages:[Message]
    }
    type Message {
        _id:ID
        content:String
        sender:ID
        reciever:ID
        createdAt:String

    }
    type Query {
        users:[User]
        user(id:ID!):User
    }
    input BioData {
        name: String!
	    age: Int!
	    gender: String!
    }
    input MessageData {
        content:String!
        sender:ID!
        reciever:ID!
    }
    type Mutation {
        createUser(bioData:BioData!):User
        createMessage(messageData:MessageData!):Message
    }
`;

export default typeDefs;
