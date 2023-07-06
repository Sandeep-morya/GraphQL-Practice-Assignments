import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./db.json" assert { type: "json" };

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
`;

const resolvers = {
	Query: {
		// :: Get all document of a collection::
		users: () => db.users,
		teachers: () => db.teachers,
		students: () => db.students,
		complaints: () => db.complaints,

		// :: Get document by ID ::
		user: (_, { id }) => db.users.find((user) => user.id == id),
		teacher: (_, { id }) => db.teachers.find((teacher) => teacher.userId == id),
		student: (_, { id }) => db.students.find((student) => student.userId == id),
		complaint: (_, { id }) => db.complaints.find((compl) => compl.userId == id),
	},

	// :: Resolving complaints of user ::
	User: {
		complaints: (user) => db.complaints.filter((x) => user.id === x.userId),
	},

	// :: Resolving about of Teacher ::
	Teacher: {
		about: (teacher) => db.users.find((user) => user.id === teacher.userId),
	},

	// :: Resolving about of Student ::
	Student: {
		about: (student) => db.users.find((user) => user.id === student.userId),
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server);

console.log(`Server startd on ${url}`);
