export const getTodos = async () => {
	return await fetch(
		`https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR`,
		{
			method: "GET",
		}
	);
};
