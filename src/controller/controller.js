import * as db from ".././repository/repository.js"

import { Router } from "express"
const endpoint = Router()

endpoint.post("/registro", async (req, resp) => {
    try{
        let novo_user = req.body

        let resposta = await db.registrarUsuario(novo_user)
        if (resp) {
            resp.send(resposta)
        }
        else {
            resp.send("Não conseguimos adicionar um novo usuário")
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.get("/logar", async (req, resp) => {
    try{
        let user_verificar = req.body

        let resposta = await db.logarUsuario(user_verificar)
        if (resp) {
            resp.send(resposta)
        }
        else {
            resp.send("Não conseguimos adicionar um novo usuário")
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.get("/verinfo", async (req, resp) => {
    try{
        let informaçoes = req.query

        let resposta = await db.pegarinfo(informaçoes)
        if (resp) {
            resp.send(resposta)
        }
        else {
            resp.send("Não conseguimos adicionar um novo usuário")
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.get("/verinfo/img", async (req, resp) => {
    try{
        let informaçoes = req.query

        let resposta = await db.img(informaçoes)
        if (resp) {
            resp.send(resposta)
        }
        else {
            resp.send("Não conseguimos adicionar um novo usuário")
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})


endpoint.get( "/listar/pedidos" , async ( req, resp ) => {
    try {
        let lista = req.body

        let resposta = await db.listarPedidos( lista )
        if ( resp ) {
            resp.send(resposta)
        }
        else {
            resp.status(400).send({
                error: err.message
            })
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
} )

endpoint.put("/alterar", async (req, resp) => {
    try{
        let user_alterado = req.body
        let id_user_alterado = req.query

        let resposta = await db.alterarUsuario(id_user_alterado, user_alterado)
        if (resp) {
            resp.send(resposta)
        }
        else {
            resp.send(`Não conseguimos excluir o usuario ${user_excluido}`)
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

endpoint.put( "/editar/pedidos", async ( req, resp ) => {
    try {
        let pedido_alterado = req.body

        let resposta = await db.alterarPedidos( pedido_alterado )

        if(resp) {
            resp.send(resposta)
        }
        else {
            resp.status(400).send({
                error: err.message
            })
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }

} )

endpoint.delete("/deletar", async (req, resp) => {
    try{
        let user_excluido = req.query

        let resposta = await db.excluirUsuario(user_excluido)
        if (resp) {
            resp.send(resposta)
        }
        else {
            resp.send(`Não conseguimos excluir o usuario ${user_excluido}`)
        }
    }
    catch(err){
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default endpoint