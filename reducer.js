import storage from "./utils/storage.js";

// [
  //   {
  //     title: 'Learn Javascript',
  //     completed: false,
  //   },
  //   {
  //     title: 'Learn HTML, CSS',
  //     completed: true,
  //   }
  // ]
const init = {
  todos: storage.get(),
  filter: 'all',
  filters: {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed
  },
  editIndex: null
}

const actions = {
  add({ todos }, title) {
    // todos = [{ title, completed: false }, ...todos]
    if(title){
      todos.push({ title, completed: false })
      storage.set(todos);
    }
  },
  toggle({ todos }, index) {
    const todo = todos[index];
    todo.completed = !todo.completed;
    storage.set(todos);
  },
  toggleAll({ todos }, completed) {
    todos.forEach(todo => todo.completed = completed);
    storage.set(todos);
  },
  remove({todos}, index) {
    todos.splice(index, 1);
    storage.set(todos);
  },
  changeFilter(state, type) {
    state.filter = type;
  },
  clearCompleted(state) {
    state.todos = state.todos.filter(state.filters.active);
    storage.set(state.todos);
  },
  startEdit(state, index) {
    state.editIndex = index;
  },
  saveEdit(state, title) {
    if(state.editIndex !== null) {
      if(title){
        state.todos[state.editIndex].title = title;
        storage.set(state.todos);
      } else{
        this.remove(state, state.editIndex);
      }
    }
    state.editIndex = null;
  },
  cancelEdit(state) {
    state.editIndex = null;
  }
}

export default function reducer(state = init, action, args) {
  actions[action] && actions[action](state, ...args);
  return state;
  // switch (action) {
  //   case 'ADD':
  //     return {
  //       ...state,
  //       todos: [{title: args, completed: false}, ...state.todos]
  //     }
  //     break;
  //   default:
  //     return state;
  // }
}