import MessageModel from "../model/messages.js";
import UserModel from "../model/users.js";

const Mutation = {
	createUser: async (_, { bioData }) => {
		const user = new UserModel(bioData);
		const data = await user.save();
		return data;
	},
	createMessage: async (_, { messageData }) => {
		const message = new MessageModel(messageData);
		const data = await message.save();
		return data;
	},
};

export default Mutation;
