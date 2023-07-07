const typeDefs = `#graphql
        type Address{
        city:String
        country:String
    }
    type User{
        id:ID
        name: String
        age: Int
        email: String
        address: Address
        role: String
        complaints:[Complaint]
    }
    type Teacher{
        id:ID
        userId:ID
        subject:String
        experience:Int
        about:User
    }
    type Student{
        id:ID
        userId:ID
        rollNumber:Int
        isFeePending:Boolean
        about:User
    }
    type Complaint{
        id:ID
        userId:ID
        title:String
        proved:Boolean
        about:User
    }
    type Query{
        users:[User]
        user(id:ID!):User

        teachers:[Teacher]
        teacher(id:ID!):Teacher

        students:[Student]
        student(id:ID!):Student

        complaints:[Complaint]
        complaint(id:ID!):Complaint
    }
    input BioData{
        name: String
        age: Int
        email: String
        address: Address
        role: String
    }
    type Mutation {
        createUser(bioData:BioData!):User
    }
`;
export default typeDefs;
