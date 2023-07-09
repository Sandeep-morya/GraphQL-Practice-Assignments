const Todo = {
	createdBy: async (todo, _, { axios }) =>
		(await axios.get(`/users/${todo.userId}`)).data,
};

export default Todo;
