const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get('/user', (req, res) => {
    res.send(users)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})