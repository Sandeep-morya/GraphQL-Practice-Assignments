import { GraphQLError } from "graphql";
import MessageModel from "../model/messages.js";
import UserModel from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Mutation = {
	createUser: async (_, { bioData }) => {
		const hashedPassword = await bcrypt.hash(bioData.password, 5);
		const user = new UserModel({ ...bioData, password: hashedPassword });
		await user.save();
		return "Account Created Successfully";
	},

	loginUser: async (_, { credetails }) => {
		// :: While Login we will throw error to the user that if email not registerd ::
		const isUserExists = await UserModel.findOne({ email: credetails.email });
		if (!isUserExists) {
			throw new GraphQLError("Email or Password is not valid", {
				extensions: { code: "BAD_USER_INPUT" },
			});
		}
		console.log("email exists");
		// :: if email is valid then furthur we will match the password ::
		const { password, _id } = isUserExists;
		const verify = await bcrypt.compare(credetails.password, password);

		if (!verify) {
			throw new GraphQLError("Email or Password is not valid", {
				extensions: { code: "BAD_USER_INPUT" },
			});
		} else {
			// :: Atlast we will send the signed token to the user ::
			const token = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
			return { message: "Login Succesfull", token };
		}
	},

	createMessage: async (_, { messageData }, { userId }) => {
		if (!userId) {
			throw new GraphQLError("You need to provide a valid token", {
				extensions: { code: "UNAUTHORIZED" },
			});
		}
		console.log({ userId });
		const message = new MessageModel({ ...messageData, sender: userId });
		const data = await message.save();
		return data;
	},
};

export default Mutation;
