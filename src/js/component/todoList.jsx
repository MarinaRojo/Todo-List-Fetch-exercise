import React from "react";
import propTypes from "prop-types";

const TodoList = (props) => {
	return (
		<div>
			<li
				className="list-group-item d-flex m-2 justify-content-end"
				style={{ background: "#80FF9B" }}>
				<p className="w-100">{props.todo.label}</p>
				<button
					className="btn-close btn-primary ml-3"
					type="button"
					onClick={() => props.deleteTodo(props.id)}></button>
			</li>
		</div>
	);
};

TodoList.propTypes = {
	id: propTypes.number,
	todo: propTypes.object,
	deleteTodo: propTypes.func,
};

export default TodoList;
