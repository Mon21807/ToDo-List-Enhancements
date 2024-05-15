// App.js
// ToDoList component
class ToDoList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: [],
        inputValue: ''
      };
    }
  
    // Function to handle input change
    handleInputChange = (event) => {
      this.setState({ inputValue: event.target.value });
    };
  
    // Function to handle form submission
    handleSubmit = (event) => {
      event.preventDefault();
      const { inputValue, todos } = this.state;
      if (inputValue.trim() !== '') {
        const newTodo = {
          id: todos.length + 1,
          text: inputValue,
          completed: false
        };
        this.setState({
          todos: [...todos, newTodo],
          inputValue: ''
        });
      }
    };
  
    // Function to handle deletion of todo item
    handleDelete = (id) => {
      const filteredTodos = this.state.todos.filter(todo => todo.id !== id);
      this.setState({ todos: filteredTodos });
    };
  
    // Function to handle completion of todo item
    handleComplete = (id) => {
      const updatedTodos = this.state.todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.setState({ todos: updatedTodos });
    };
  
    render() {
      const { todos, inputValue } = this.state;
  
      return (
        <div>
          <h2>ToDo List</h2>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
              placeholder="Add new ToDo"
            />
            <button type="submit">Add</button>
          </form>
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => this.handleComplete(todo.id)}
                />
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.text}
                </span>
                <button onClick={() => this.handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
  
  // Render the ToDoList component
  ReactDOM.render(<ToDoList />, document.getElementById('root'));
  