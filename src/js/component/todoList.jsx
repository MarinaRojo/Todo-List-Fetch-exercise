import React from "react";
import propTypes from "prop-types";

const TodoList = (props) => {
	return (
		<div>
			<li>
				{props.todo.label}
				<button
					className="btn btn-primary"
					//onClick={() => props.deleteTodo(props.id)}
				>
					Delete
				</button>
			</li>
		</div>
	);
};

TodoList.propTypes = {
	id: propTypes.number,
	todo: propTypes.object,
	//deleteTodo: propTypes.func,
};

export default TodoList;
