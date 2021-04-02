require("colors")
const { inquirerMenu, pause, readQuestion, listToDelete, isConfirm, listToUpdate } = require("./helpers/inquirer")
const { saveDb, readDb } = require("./db/actions")
const TodoList = require("./models/TodoList")

const main = async () => {
	let opt = ""
	const todoList = new TodoList()
	
  // Get data from db (json) and set on todoList model
  const dataFromDb = readDb()
	if (dataFromDb) {
		todoList.setDataFromDb(dataFromDb)
	}

  // Loop menu
	do {
		console.clear()

		opt = await inquirerMenu()
    
		switch (opt) {
			case "new":
				const desc = await readQuestion("Description: ")
				todoList.createTodo(desc)
				break
			case "complete":
        const ids = await listToUpdate(todoList.arrList)
        todoList.updateComplete(ids)
				break
			case "delete":
        const idToDelete = await listToDelete(todoList.arrList)
        if(idToDelete !== "exit"){
          const ok = await isConfirm("Sure?")
          if(ok) todoList.deleteTodo(idToDelete)
        }
				break
			case "show":
				todoList.showAll()
				break
			default:
				break
		}

		saveDb(todoList.arrList)

		console.log("\n")
		if (opt != "exit") await pause()
	} while (opt != "exit")
}

main()
