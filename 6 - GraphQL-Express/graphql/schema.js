const typeDefs = `#graphql
    type User {
        id:ID
        name:String
        username:String
        email:String
        address:Address
        phone:String
        website:String
        company:Company
    }

    type Address {
        street:String
        suite:String
        city:String
        zipcode:String
        geo:Geo
    }
    type Geo {
        lat:String
        lng:String
    }
    type Company {
        name:String
        catchPhrase:String
        bs:String
    }
    type Todo {
        id:ID
        userId:ID
        title:String
        completed:Boolean
        createdBy:User
    }
    type Query {
        todos:[Todo]
        todo(id:ID):Todo
        users:[User]
        user(id:ID):User
        test:String
    }
`;
export default typeDefs;
