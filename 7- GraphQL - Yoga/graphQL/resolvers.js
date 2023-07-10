import { v4 } from "uuid";

const messages = [];

export const Query = {
	messages: () => messages,
};

export const Mutation = {
	createMessage: (_, { content, user }) => {
		const newMessage = { id: v4(), content, user };
		messages.push(newMessage);
		return newMessage.id;
	},
};
