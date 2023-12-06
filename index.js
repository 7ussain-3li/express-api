const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
let users = JSON.parse(data);

app.get('/', (req, res) => {
    res.send("Hello This is Api Task")
})

app.get('/users', (req, res) => {
    const { id, position, CompanyName, City } = req.query

    if (id) {
        const user = users.find((user) => user.id == (id))
        res.send(user)
    }
    else if (position === "first") {
        const user = users[0]
        res.send(user)
    }
    else if (position === "last") {
        const user = users[users.length - 1]
        res.send(user)
    }
    else if (CompanyName) {
        const user = users.filter((user) => user.company.name == (CompanyName))
        res.send([user])
    }
    else if (City) {
        const user = users.filter((user) => user.address.city == (City))
        res.send(user)
    }
    else {
        res.send(users)
    }
})

app.get('/users/getStreetById/:id', (req, res) => {
    let id = req.params.id;
    const user = users.find((user) => user.id == id)
    res.send(user.address.street)
})

app.post('/addUser', (req, res) => {
    let id = req.body.id
    let name = req.body.name
    let username = req.body.username
    let email = req.body.email
    let city = req.body.address.city
    let newUser = { id, name, username, email, address: { city } }
    users.push(newUser)
    fs.writeFileSync("./users.json", JSON.stringify(users))
    res.send({ success: true })
})

app.delete('/deleteUser/:id', (req, res) => {
    let id = Number(req.params.id)
    users = users.filter((user) => user.id !== id)
    fs.writeFileSync("./users.json", JSON.stringify(users))
    res.send({ success: true })
})

app.put('/updateUser/:id', (req, res) => {
    let id = Number(req.params.id)
    let name = req.body.name
    let username = req.body.username
    let email = req.body.email
    let city = req.body.address.city
    users = users.map((user) => {
        if (user.id === id) {
            user.name = name
            user.username = username
            user.email = email
            user.address.city = city
        }
        return user
    })
    fs.writeFileSync("./users.json", JSON.stringify(users))
    res.send({ success: true })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})