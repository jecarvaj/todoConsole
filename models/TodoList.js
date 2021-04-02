const Todo = require("./Todo")

class TodoList {
	_list = {}

	get arrList() {
		const list = []
		Object.keys(this._list).forEach(key => {
			list.push(this._list[key])
		})
		return list
	}

	constructor() {
		this._list = {}
	}

	createTodo(desc = "") {
		const todo = new Todo(desc)
		this._list[todo.id] = todo
	}

	deleteTodo(id) {
		if (this._list[id]) {
			delete this._list[id]
		}
	}

	updateComplete(ids = []) {
		this.arrList.forEach(todo => {
			const _todo = this._list[todo.id]
			if (ids.includes(todo.id)) {
				_todo.isComplete = true
				_todo.dateComplete = new Date().toISOString()
			} else {
				_todo.isComplete = false
			}
		})
	}

	setDataFromDb(data) {
		data.forEach(todo => {
			this._list[todo.id] = todo
		})
	}

	showAll() {
		console.log("\n")
		this.arrList.forEach((todo, index) => {
			let idx = todo.isComplete ? `${"GOD ->".blue}` : `${"BAD ->".yellow}`
			console.log(
				idx,
				`${index + 1}.-`.green,
				todo.desc,
				":::",
				todo.isComplete ? `${"DONE, god work!".green}` : `${"DO IT!".red}`
			)
		})
	}
}

module.exports = TodoList
