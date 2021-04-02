const fs = require('fs')

const pathFile = "./db/db.json"

const saveDb = data => {
	fs.writeFileSync(pathFile, JSON.stringify(data))
}

const readDb = () => {
	if (!fs.existsSync(pathFile)) {
		return null
	}
	const data = fs.readFileSync(pathFile, { encoding: "utf-8" })
	const parsedData = JSON.parse(data)
	return parsedData
}

module.exports = {
	saveDb,
	readDb
}
