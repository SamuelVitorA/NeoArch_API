import { gerarToken, authToken } from "../security/auth.js"
import * as db from "../repository/user.js"
import { Router } from "express"
import { validate } from "../security/validate.js"

const endpoint = Router()


endpoint.post("/login", async (req, resp) => {
    let user = req.body
/*  Vai entrar com os dados de login da pessoa em padrão json
    {
      email: "",
      senha: ""
    }*/

    let query = await db.verifyUser(user, "login")
//  Verifica apena os dados do usuario 
    
    if (query == null || query == "Usuário não encontrado ou credenciais incorretas.") {
//  Se os dados do usuario não existirem ele emite um erro
        resp.send({ error: `Não foi encontrado o user no banco de dados` })
    } else {
//  Se os dados do usuario existirem ele vai emitir um token para a sessão de login do usuário
        let token = gerarToken(query);
        resp.send({
            "token": token
        })
    }   
})

endpoint.post("/register", authToken, async (req, resp) => {
    let user = req.body
    /*Vai entrar com os dados de registro da pessoa em padrão json
    {
      "email": "",
      "senha": ""
    }*/
    user.email = user.email.toLowerCase()
    
    if (validate(user)) {
        let query = await db.createUser(user)
        if (query == "E-mail já cadastrado. Por favor, use outro e-mail." || query == "Ocorreu um erro ao criar o usuário.") {
            resp.send({ error: query })
        } else {
            resp.send({ "NewID": query })
        }   
    }
    else {
        resp.send({ error: "Invalid password or email" })
    }
})  

endpoint.delete("/delete", authToken, async (req, resp) => {
    let user = req.user.id
    
    let query = await db.deleteUser(user)

    if (query == null) {
        resp.send({ error: query })
    } else {
        resp.send({"Delete": "Accont deleted!"})
    }   
}) 

endpoint.post("/info", authToken, async (req, resp) => {
    let user = req.user.id

    let query = await db.getUserInfo(user)
    if (query == null || query == "Ocorreu um erro ao pegar as informações do usuário.") {
        resp.send({ error: query })
    } else {
        resp.send(query)
    }   
})

endpoint.put("/update", authToken, async (req, resp) => {
    let user = req.user.id
    let data = req.body

    let query = await db.updateUser(user, data)

    if (query == null || query == "Ocorreu um erro ao pegar as informações do usuário.") {
        resp.send({ error: query })
    } else {
        resp.send("Alterado com sucesso")
    }   
})
/*
{
    "nome": "Renas",
    "cpf": "123",
    "endereco": "Av.alguma coisa",
    "email": "renas@gmail.com",
    "telefone": "447504",
    "senha": "SIM",
    "foto": ""
}
*/

export default endpoint