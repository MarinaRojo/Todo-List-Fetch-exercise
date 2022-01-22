import { bool } from "prop-types";
import React, { useState, useEffect } from "react";
import { getTodos } from "../../service/todo.js";
import TodoList from "./todoList.jsx";

//create your first component
const Home = () => {
	const [listTodo, setListTodo] = useState([]);
	const [newTodo, setNewTodo] = useState({ label: "", done: false });

	const getAllTodos = () => {
		getTodos()
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setListTodo(data);
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getAllTodos();
	}, []);

	const handleClick = () => {
		const newListTodo = [...listTodo, newTodo];
		setListTodo(newListTodo);
		//console.log(newListTodo);
		//crear tarea añadiéndola a la lista del servidor con PUT
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR", {
			method: "PUT",
			body: JSON.stringify(newListTodo),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
			})
			.then((data) => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});

		getAllTodos();
	};

	const printTodos = () => {
		return listTodo.map((todo, index) => (
			<TodoList
				key={index}
				todo={todo}
				id={index}
				//deleteTodo={deleteTodo}
			/>
		));
	};

	return (
		<div>
			<div className="container col-8">
				<h1 className="text-center">Todo List</h1>
				<div className="input-group mt-3">
					<input
						type="text"
						className="form-control"
						placeholder="New todo"
						aria-label="New todo"
						onChange={(event) => {
							setNewTodo({
								label: event.target.value,
								done: false,
							});
						}}
					/>

					<button
						className="btn btn-outline-secondary"
						type="button"
						id="button-addon2"
						onClick={handleClick}>
						Add
					</button>
				</div>

				<div>{!listTodo.length ? "No hay TODOS" : printTodos()}</div>
			</div>
		</div>
	);
};

export default Home;
