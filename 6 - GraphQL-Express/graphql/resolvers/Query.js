const Query = {
	todos: async (_, {}, { axios }) => (await axios.get("/todos")).data,
	todo: async (_, { id }, { axios }) => (await axios.get(`/todos/${id}`)).data,
	users: async (_, {}, { axios }) => (await axios.get("/users")).data,
	user: async (_, { id }, { axios }) => (await axios.get(`/users/${id}`)).data,

	// :: The below is to check what context conatins ::
	test: async (_, {}, context) => console.log(context),
};

export default Query;
