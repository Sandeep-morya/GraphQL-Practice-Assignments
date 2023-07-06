import fs from "fs";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const data = fs.readFileSync("db.json", "utf-8");
let users = JSON.parse(data.trim());

const typeDefs = `#graphql
type User{
    name:String
    age:Int
	gender:String
}
type Query{
    users:[User]
	user(gender:String!):[User]
}
input NewUser{
    name:String!
    age:Int!
	gender:String!
}
input EditUserProperties{
  	name:String
    age:Int
	gender:String
}
type Mutation{
    createUser(data:NewUser!):User
	editUser(name:String!,modifications:EditUserProperties!):User
	deleteUser(name:String):Boolean
}
`;

const resolvers = {
	Query: {
		users: () => users,
		user: (_, { gender }) => users.filter((user) => user.gender === gender),
	},
	Mutation: {
		async createUser(_, { data }) {
			users.push(data);
			fs.writeFileSync("./db.json", JSON.stringify(users));
			return data;
		},
		async editUser(_, { name, modifications }) {
			users = users.map((user) =>
				user.name === name ? { ...user, ...modifications } : user,
			);
			fs.writeFileSync("./db.json", JSON.stringify(users));
			return users.find((user) => user.name === name);
		},
		async deleteUser(_, { name }) {
			let newUsers = users.filter(
				(user) => !new RegExp(name, "i").test(user.name),
			);
			const isDeleted = newUsers.length < users.length;
			if (isDeleted) {
				fs.writeFileSync("./db.json", JSON.stringify(newUsers));
			}
			return isDeleted;
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, { listen: { port: 8080 } });
// if you did'nt specify this ```{listen:{port:8080}}``` then the default port will be 4000

console.log(`Server is running on ${url}`);
