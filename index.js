const express = require('express')
const handlebars = require('express-handlebars')
const getTodos = require('./get-todos')
const {getTodo, postTodos, deleteTodos} = require("./baseDeDatos")

const app = express()
const port = 4000

// CONFIGURACIONES 
app.use('/static', express.static('public'))
app.use(express.json())
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// RUTA RAIZ
app.get('/', async (req, res) => {
    const todos = await getTodos()
    res.render('index', { todos });
})

// RUTA PARA FORMULARIO DE CREAR TODOS
app.get('/todo-create', (req, res) => { 
    res.render('crear')
 })

 // RUTA PATA FORMULARIO DE ELIMINAR TODOS
app.get('/todo-delete/:id', async(req, res) => { 
    const {id} = req.params
    res.render('eliminar', {id, deleteTodos})
 })

// API GET
 app.get("/todos", async (req, res) => {
     const respuesta = await getTodo()
     return res.json(respuesta)
 })
// API POST
app.post("/todos", async (req, res) => {
    const {nombre, descripcion} = req.body
    const respuesta = await postTodos(nombre, descripcion)
    return res.status(201).json(respuesta)
})
// API DELETE
app.delete("/todos/:id", async(req, res) => {
    const {id} = req.params
    const respuesta = await deleteTodos(id)
    if(respuesta.length === 0){
        return res.status(404).json({msg: "id not found"})
    }
    return res.json(respuesta)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})