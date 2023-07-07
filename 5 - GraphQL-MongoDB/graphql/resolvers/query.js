import UserModel from "../../model/users.js";

const Query = {
	users: async () => {
		const data = await UserModel.find();
		return data;
	},
	user: async (_, { id }) => {
		const data = await UserModel.findById(id);
		return data;
	},
};

export default Query;
