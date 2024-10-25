import con from "./connection.js"

// Usuario
export async function registrarUsuario(usuario) {
    const command = "insert into tb_user_settings(email, senha) values(?,?)"
    let [resposta] = await con.query(command, [usuario.email, usuario.senha]) 
    return resposta
    //post http://localhost:1234/registro { "email": "", "senha": ""}
    /*
    {
      "email": "",
      "senha": ""
    }
    */
    // {Foi_excluido: resposta.insertId}
}

export async function logarUsuario(usuario) {
    const command = "select * from tb_user_settings where id_personal = ?"
    let resposta = await con.query(command, [id.id]) 
    return resposta[0][0]

}

export async function pegarinfo(id) {
    const command = "select * from tb_user_settings where id_personal = ?"
    let resposta = await con.query(command, [id.id]) 
    return resposta[0][0]
}

export async function alterarUsuario(id, usuario) {
    const command = "update tb_user_settings set foto = ?, nome = ?, cpf = ?, endereco = ?, email = ?, telefone = ?, senha = ? where id_personal = ?"
    let [resposta] = await con.query(command, [usuario.foto, usuario.nome, usuario.cpf, usuario.endereco, usuario.email, usuario.telefone, usuario.senha, id.id])
    return {Foi_alterado: resposta.changedRows}
}
/*
query {
  id: 
}
body {
  "nome": "",
  "cpf": "",
  "endereco": "",
  "email": "",
  "telefone": "",
  "senha": ""
}
*/


////////////////////////////////////////////////////////////////
export async function img(imagem) {
    const command = "select foto from tb_user_settings where id_personal = ?"
    let resposta = await con.query(command, [imagem.id]) 
    return resposta[0][0]
}


// Pedidos

export async function adicionarPedidos(pedido) {
    const command = `
        insert into tb_agendamentos_orders(nome, preco, comeco, fim, telefone, email, telefone_opc, email_opc, imagem)
        values( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`

    let [resposta] = await con.query( command, [ pedido.nome, pedido.preco, pedido.comeco, pedido.fim, pedido.telefone, pedido.email, pedido.telefone_opc, pedido.email_opc, pedido.imagem ] )
    return {Add_Pedidos: resposta.insertId};
}
/*
body: {
    nome: "",
    preco: "",
    comeco: "",
    fim: "",
    telefone: "",
    email: ""
    telefone_opc: "",
    email_opc: "",
    imagem: ""
}
*/

export async function alterarPedidos(pedido) {
    const command = `
        update tb_agendamentos_orders
          set   nome = ?,
                preco = ?,
                comeco = ?,
                fim = ?,
                telefone = ?,
                email = ?,
                telefone_opc = ?,
                email_opc = ?,
                imagem = ?
        where id_agendamento = ?;
    `
    let [ resposta ] = await con.query( command, [ pedido.nome, pedido.preco, pedido.comeco, pedido.fim, pedido.telefone, pedido.email, pedido.telefone_opc, pedido.email_opc, pedido.imagem ] )
    return {Edit_Pedidos: resposta};
}
/*
body{

}
*/

export async function deletarPedidos( pedido ) {
    const command = `
        delete from tb_agendamentos_orders
          where id_agendamento = ?;
    `
    let [ resposta ] = await con.query( command, [ pedido.id_agendamento ] )
    return {Delete_Pedidos: resposta}
}
/*
body {

}
*/

export async function listarPedidos( pedido ) {
    const command = `
        select *
          from tb_agendamento_orders
    `
    let [ resposta ] = await console.query( command, [pedido] )
    return {Listagem_Pedidos: resposta}
}

////////////////////////////////////////////////////////////////

// Configurações/Dados


export async function alterarDados( id, atual ) {
    const command = `
        update set
                nome = ?,
                cpf = ?,
                endereco = ?,
                email = ?,
                telefone = ?,
                sehna = ?,
                imagem = ?
        where id_personal = ?;
    `
    let [ resposta ] = await con.query( command [ atual.nome, atual.cpf, atual.endereco, atual.email, atual.telefone, atual.senha, atual.imagem, id.id ] )
    return {Alter_personal: resposta}
}
