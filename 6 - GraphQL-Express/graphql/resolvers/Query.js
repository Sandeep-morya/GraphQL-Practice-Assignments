import fs, { readFileSync } from "node:fs";
import { v4 } from "uuid";
const file = readFileSync("messages.json", "utf-8");
const chats = JSON.parse(file.trim());

const Query = {
	todos: async (_, {}, { axios }) => (await axios.get("/todos")).data,
	todo: async (_, { id }, { axios }) => (await axios.get(`/todos/${id}`)).data,
	users: async (_, {}, { axios }) => (await axios.get("/users")).data,
	user: async (_, { id }, { axios }) => (await axios.get(`/users/${id}`)).data,
	chats: async (_, {}) => chats,

	// :: The below is to check what context conatins ::
	test: async (_, {}, context) => console.log(context),
};

export const updateChats = (content, user) => {
	const newMessage = { id: v4(), content, user };
	chats.push(newMessage);
	fs.writeFile("messages.json", JSON.stringify(chats), () => {});
	return chats;
};
export default Query;
