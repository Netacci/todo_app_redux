// generates random numnber
function generateId() {
	return (
		Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
	);
}

// Library code
// store that houses state
// function createStore(reducer) {
// 	let state;

// 	let listeners = [];
// 	// gets state
// 	const getState = () => state;
// 	// listen to state, takes in functions that will be called when the state changes
// 	const subscribe = (listener) => {
// 		listeners.push(listener);
// 		return () => {
// 			listeners = listeners.filter((l) => l !== listener);
// 		};
// 	};
// 	// updates/ modifies the state
// 	const dispatch = (action) => {
// 		state = reducer(state, action);
// 		listeners.forEach((listener) => listener());
// 	};

// 	return {
// 		getState,
// 		subscribe,
// 		dispatch,
// 	};
// }
// APP CODE
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';
// Action creators
function addTodoAction(todo) {
	return {
		type: ADD_TODO,
		todo,
	};
}
function removeTodoAction(id) {
	return {
		type: REMOVE_TODO,
		id,
	};
}
function toggleTodoAction(id) {
	return {
		type: TOGGLE_TODO,
		id,
	};
}
function addGoalAction(goal) {
	return {
		type: ADD_GOAL,
		goal,
	};
}
function removeGoalAction(id) {
	return {
		type: REMOVE_GOAL,
		id,
	};
}
// Toggle uses object.assign to create a new object {} and then adds the todo to the object excluding todo.complete, it then modifies todo.complete
// todos reducer
function todos(state = [], action) {
	if (action.type === ADD_TODO) {
		return state.concat([action.todo]);
	} else if (action.type === REMOVE_TODO) {
		return state.filter((todo) => todo.id !== action.id);
	} else if (action.type === TOGGLE_TODO) {
		return state.map(
			(todo) =>
				todo.id !== action.id
					? todo
					: Object.assign({}, todo, { complete: !todo.complete })
			// { ...todo, complete: !todo.complete }
		);
	} else {
		return state;
	}
}
// goals reducer
function goals(state = [], action) {
	if (action.type === ADD_GOAL) {
		return state.concat([action.goal]);
	} else if (action.type === REMOVE_GOAL) {
		return state.filter((goal) => goal.id !== action.id);
	} else {
		return state;
	}
}
// Middleware
// function checkAndDispatch(store, action) {
// 	if (
// 		action.type === ADD_TODO &&
// 		action.todo.name.toLowerCase().includes('bitcoin')
// 	) {
// 		return alert('Nope, thats a bad idea');
// 	}
// }
const checker = (store) => (next) => (action) => {
	if (
		action.type === ADD_TODO &&
		action.todo.name.toLowerCase().includes('bitcoin')
	) {
		return alert('Nope, thats a bad idea');
	}
	if (
		action.type === ADD_GOAL &&
		action.goal.name.toLowerCase().includes('bitcoin')
	) {
		return alert('Nope, thats a bad idea');
	}
	return next(action);
};
// root reducer
//Redux.combineReducuers replaces this function
// function app(state = {}, action) {
// 	return {
// 		todos: todos(state.todos, action),
// 		goals: goals(state.goals, action),
// 	};
// }
// root reducer is created because we can't pass two or more reducers directly to the store.

const store = Redux.createStore(
	Redux.combineReducers({
		todos,
		goals,
	}),
	Redux.applyMiddleware(checker)
);
store.subscribe(() => {
	const { goals, todos } = store.getState();
	document.getElementById('goals').innerHTML = '';
	document.getElementById('todos').innerHTML = '';
	goals.forEach(addGoalToDom);
	todos.forEach(addTodoToDom);
});

// store.dispatch(
// 	addTodoAction({
// 		name: 'Redux',
// 		id: 0,
// 	})
// );
// store.dispatch(removeTodoAction(1));
// store.dispatch(
// 	addTodoAction({
// 		name: 'Redx',
// 		id: 1,
// 	})
// );
// store.dispatch(
// 	addGoalAction({
// 		name: 'get babe',
// 		id: 1,
// 	})
// );
// store.dispatch(removeGoalAction(0));

function addTodo() {
	const input = document.getElementById('todo');
	const name = input.value;
	input.value = '';
	store.dispatch(
		addTodoAction({
			name,
			complete: false,
			id: generateId(),
		})
	);
}
function addGoal() {
	const input = document.getElementById('goal');
	const name = input.value;
	input.value = '';
	store.dispatch(
		addGoalAction({
			name,
			id: generateId(),
		})
	);
}
document.getElementById('todoBtn').addEventListener('click', addTodo);
document.getElementById('goalBtn').addEventListener('click', addGoal);

function createRemoveButton(onClick) {
	const removeBtn = document.createElement('button');
	removeBtn.innerHTML = 'X';
	removeBtn.addEventListener('click', onClick);
	return removeBtn;
}

function addTodoToDom(todo) {
	node = document.createElement('li');
	const text = document.createTextNode(todo.name);
	const removeBtn = createRemoveButton(() => {
		store.dispatch(removeTodoAction(todo.id));
	});
	node.appendChild(text);
	node.appendChild(removeBtn);
	node.style.textDecoration = todo.complete ? 'line-through' : 'none';

	node.addEventListener('click', () => {
		store.dispatch(toggleTodoAction(todo.id));
	});

	document.getElementById('todos').appendChild(node);
}

function addGoalToDom(goal) {
	node = document.createElement('li');
	const text = document.createTextNode(goal.name);
	const removeBtn = createRemoveButton(() => {
		store.dispatch(removeGoalAction(goal.id));
	});
	node.appendChild(text);
	node.appendChild(removeBtn);
	document.getElementById('goals').appendChild(node);
}





