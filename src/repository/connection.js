import mysql from "mysql2/promise"

const con = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PSW,
    database: process.env.DB
})
console.log(`Database "${process.env.DB}" connectada em:
Host: ${process.env.HOST}
User: ${process.env.USER}
Senha: ${process.env.PSW}
`)

export default con;