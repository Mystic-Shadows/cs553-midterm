# Midterm Task Manager
## 1 Structure
```text
.
├── client/
│   ├── app.js
│   ├── index.html
│   └── styles.css
├── src/
│   ├── middleware
│   │   ├── errorHandler.js
│   │   └── logger.js
│   ├── routes
│   │   ├── health.js
│   │   └── tasks.js
│   └── server.js
├── answers.md
├── opernapi.yaml
├── package.json
└── README.md
```

## 2 How to run
1. Open 2 terminals at the top of the repo
1. Execute `npm install`
1. Execute `npm run server`
1. In the other terminal execute `npm run client` or use curl
commands (see examples in section 3)
1. If running the client, connect through browser on
localhost:5173

NOTE: server comes pre-loaded with 2 tasks.

## 3 Routes
|Method|URI/Route|Summary
|---|---|---|
|GET|`/health`| Returns API/server status
|GET|`/api/tasks`| Returns all tasks
|GET|`/api/tasks/:id`| Returns the task that matches the id
|POST|`/api/tasks`| Makes a new task
|PUT|`/api/tasks/:id`| Replaces the task that matches the id
|PATCH|`/api/tasks/:id`| Updates the task that matches the id
|DELETE|`/api/tasks/:id`| Removes the task that matches the id

## 4 Sample Curl Commands

### Get Health
`curl http://localhost:3000/health`

### Get Tasks
`curl http://localhost:3000/api/tasks`

### Get Tasks/:id
`curl http://localhost:3000/api/tasks/1`

### Post Tasks
`curl -X POST http://localhost:3000/api/tasks -H "Content-Type: application/json" -d '{"title": "lab 6", "course": "cs-553", "completed": "false"}'`

### Put Tasks/:id
`curl -X PUT http://localhost:3000/api/tasks/2 -H "Content-Type: application/json" -d '{"title": "lab 3", "course": "cs-553", "completed": "true"}'`

### Patch Tasks/:id
`curl -X PATCH http://localhost:3000/api/tasks/2 -H "Content-Type: application/json" -d '{"title": "lab 2"}'`

### Delete Tasks/:id
`curl -X DELETE http://localhost:3000/api/tasks/1`
