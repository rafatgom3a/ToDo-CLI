const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

// Add command
program.command("add")
    .description("adds a new todo to the todo list")
    .option("-i, --id <number>", "id of the todo")
    .option("-t, --title <string>", "title of the todo")
    .option("-d, --date <string>", "date of the todo")
    .action(options => {
        const dataString = fs.readFileSync("./db.json", "utf-8");
        const data = JSON.parse(dataString);

        const newTodo = {
            id: parseInt(options.id),
            title: options.title,
            date: options.date
        };

        data.push(newTodo);
        fs.writeFileSync("./db.json", JSON.stringify(data, null, 4));
        console.log("Todo added successfully!");
    });

// List command
program.command("list")
    .description("lists all todos")
    .action(() => {
        const dataString = fs.readFileSync("./db.json", "utf-8");
        const data = JSON.parse(dataString);
        console.log(data);
    });

// Edit command
program.command("edit")
    .description("edits a todo by id")
    .option("-i, --id <number>", "id of the todo to edit")
    .option("-t, --title <string>", "new title")
    .action(options => {
        const dataString = fs.readFileSync("./db.json", "utf-8");
        const data = JSON.parse(dataString);
        const todoIndex = data.findIndex(todo => parseInt(todo.id) === parseInt(options.id));

        if (todoIndex !== -1) {
            data[todoIndex].title = options.title;
            fs.writeFileSync("./db.json", JSON.stringify(data, null, 4));
            console.log("Todo edited successfully!");
        } else {
            console.log("Todo with id " + options.id + " not found!");
        }
    });

// Delete command
program.command("delete <id>")
    .description("deletes a todo by id")
    .action(id => {
        const dataString = fs.readFileSync("./db.json", "utf-8");
        const data = JSON.parse(dataString);
        const filteredData = data.filter(todo => parseInt(todo.id) !== parseInt(id));

        if (filteredData.length !== data.length) {
            fs.writeFileSync("./db.json", JSON.stringify(filteredData, null, 4));
            console.log("Todo deleted successfully!");
        } else {
            console.log("Todo with id " + id + " not found!");
        }
    });

program.parse(process.argv);
