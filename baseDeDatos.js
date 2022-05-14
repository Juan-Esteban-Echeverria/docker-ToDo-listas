const { Pool } = require("pg")

const pool = new Pool()

//LISTAR
module.exports.getTodo= async () => {
    const client = await pool.connect()
    try {
        const respuesta = await client.query("SELECT * FROM todos;")
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}

// CREAR 
module.exports.postTodos = async (nombre, descripcion) => {
    const client = await pool.connect()

    const query = {
        text: "INSERT INTO todos (nombre, descripcion) values ($1, $2) RETURNING *",
        values: [nombre, descripcion]
    }

    try {
        const respuesta = await client.query(query)
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}

// ELIMINAR
module.exports.deleteTodos = async (id) => {
    const client = await pool.connect()

    const query = {
        text: "DELETE FROM todos WHERE id = $1 RETURNING *",
        values: [id]
    }

    try {
        const respuesta = await client.query(query)
        return respuesta.rows
    } catch (error) {
        console.log(error)
        return error
    } finally {
        client.release()
    }
}