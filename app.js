function List(props) {
	return (
		<ul>
			<li>LIST</li>
		</ul>
	);
}

class Todos extends React.Component {
	addItem=(e)=>{
		e.preventDefault()
		const name = this.input.value
		this.input = ''
		store.dispatch(addTodoAction({
			name,
			complete: false,
			id: generatedID()
		})) 
	}

	render() {
		return (
			<div>
				<h1>Todo List</h1>
				<input type='text' placeholder='Add Todo'
				ref={(input) => this.input = input}
				/>
				<button onClick={this.addItem} >Add Todo</button>
				<List />
			</div>
		);
	}
}
class Goals extends React.Component {
	state = {};
	render() {
		return (
			<div>
				GOALS
				<List />
			</div>
		);
	}
}
class App extends React.Component {
	render() {
		return (
			<div>
				<Todos />
				<Goals />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
