# 📝 CLI Todo App

A simple Node.js command-line application to manage a todo list using Commander.js.  

You can add a todo using `node index.js add -i 1 -t "Task" -d "2025-04-05"`,  
list all todos with `node index.js list`,  
edit a todo by ID using `node index.js edit -i 1 -t "New Title"`,  
and delete a todo with `node index.js delete 1`. 

All todos are stored locally in a `db.json` file.

To get started, run `npm install commander` and create a `db.json` file with empty brackets: `[]`.
