import React, { useState, useEffect } from "react";
import { getTodos } from "../../service/todo.js";
import TodoList from "./todoList.jsx";

//create your first component
const Home = () => {
	const [listTodo, setListTodo] = useState([]);
	const [newTodo, setNewTodo] = useState({ label: "New todo", done: false });

	const getAllTodos = () => {
		getTodos()
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setListTodo(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		getAllTodos();
	}, []);

	const printTodos = () => {
		return listTodo.map((todo, index) => (
			<TodoList
				key={index}
				todo={todo}
				id={index}
				deleteTodo={deleteTodo}
			/>
		));
	};

	const handleClick = () => {
		const newListTodo = [...listTodo, newTodo];
		setNewTodo({ label: "New todo", done: false });
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
				getAllTodos();
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	const deleteTodo = (id) => {
		const newList = listTodo.filter(function (todo, index) {
			return index != id;
		});
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				getAllTodos();
			})
			.catch((error) => {
				//error handling
				console.log(error);
			});
	};

	return (
		<div>
			<div
				className="container col-8 pb-2"
				style={{ background: "#AFFFC0" }}>
				<h1 className="text-center">Todo List con Fetch</h1>
				<div className="input-group mt-3 w-75 m-auto">
					<input
						type="text"
						className="form-control"
						value={newTodo.label}
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

				<div className="w-75 m-auto mt-3">
					{!listTodo.length ? "No hay TODOS" : printTodos()}
				</div>
			</div>
		</div>
	);
};

export default Home;
