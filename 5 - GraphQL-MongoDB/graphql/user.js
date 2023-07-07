import MessageModel from "../model/messages.js";

const User = {
	messages: async (user) => {
		const data = await MessageModel.find({
			$or: [{ sender: user._id }, { reciever: user._id }],
		});
		return data;
	},
};

export default User;
