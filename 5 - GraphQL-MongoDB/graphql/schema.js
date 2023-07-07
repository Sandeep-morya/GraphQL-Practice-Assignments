const typeDefs = `#graphql
    type User {
        _id:ID
        name: String
        email: String
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
    input BioData {
        name: String!
        email: String!
	    age: Int!
	    gender: String!
        password:String!
    }
    input MessageData {
        content:String!
        reciever:ID!
    }
    type LoginResponse {
        message:String
        token:String
    }
    input Credetails {
        email:String
        password:String
    }
    type Query {
        users:[User]
        user(id:ID!):User
    }
    type Mutation {
        createUser(bioData:BioData!):String
        loginUser(credetails:Credetails):LoginResponse
        createMessage(messageData:MessageData!):Message
    }
`;

export default typeDefs;
