require("colors")
const inquirer = require("inquirer")

const menuItems = [
  { value: 'new', name: "1. Add TODO", event: "console.log(`hola menu apretado`)" },
  { value: 'complete', name: "2. Complete TODO", event: "console.log(`hola menu apretado`)" },
  { value: 'delete', name: "3. Delete TODO", event: "console.log(`hola menu apretado`)" },
  { value: 'show', name: "4. Show List", event: "console.log(`hola menu apretado`)" },
  { value: 'exit', name: "0. EXIT", event: "console.log(`hola menu apretado`)" }
]

const questions = [
  {
    type: 'list',
    name: 'opt',
    message: "Select optioN",
    choices: menuItems
  }
]


const inquirerMenu = async () => {
	console.log("================================".rainbow)
	console.log("----------  TODO LIST ----------".rainbow)
	console.log("================================\n".rainbow)
  const {opt} = await inquirer.prompt(questions)
  return opt
}

const pause = async () => {
  const question = [
		{
			type: "input",
			name: "opt",
			message: `Press ${"ENTER".blue} to continue ...`
		}
	]
  return await inquirer.prompt(question)
}

const readQuestion = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value){
        if(value.length === 0){
          return "Not empty!"
        }
        return true
      }
    }
  ]
  const {desc} = await inquirer.prompt(question)
  return desc
}

const listToDelete = async (todos = []) => {
  const choicesDelete = todos.map(el => {
    return {
      value: el.id,
      name: el.desc
    }
  })
  const questionDelete = [{
    type: "list",
    name: "id",
    message: "Which??",
    choices: [...choicesDelete, {value: "exit", name: "EXIT".yellow}],
    validate(value){
      if(value.length === 0){
        return "Not empty!"
      }
      return true
    }
  }]

  const {id} = await inquirer.prompt(questionDelete)
  return id
}

const listToUpdate = async (todos) => {
  const choicesUpdate = todos.map(el => {
    return {
      value: el.id,
      name: el.desc,
      checked: el.isComplete
    }
  })
  const questionUpdate = [{
    type: "checkbox",
    name: "ids",
    message: "Select",
    choices: choicesUpdate,
    validate(value){
      if(value.length === 0){
        return "Not empty!"
      }
      return true
    }
  }]

  const {ids} = await inquirer.prompt(questionUpdate)
  return ids
}

const isConfirm = async (message) => {
  const question = [{
    type: 'confirm',
    name: 'ok',
    message
  }]
  const {ok} = await inquirer.prompt(question)
  return ok
}




module.exports = {inquirerMenu, pause, readQuestion, listToDelete, isConfirm, listToUpdate}