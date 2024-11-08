import con from "../core/connection.js";

export async function createOrder(order) {
    try {

        const command = `insert into tb_agendamentos_orders (nome, preco, comeco, fim, telefone, email, telefone_opc, email_opc) values (?, ?, ?, ?, ?, ?, ?, ?)`; 
        let [response] = await con.query(command, [order.nome, order.preco, order.comeco, order.fim, order.telefone, order.email, order.telefone_opc, order.email_opc]);

        return { orderId: response.insertId };
    } catch (error) {
        console.error(error);
        return 'Ocorreu um erro ao criar o pedido.';
    }
}
/*
{
    "nome": "",
    "preco": "",
    "comeco": "",
    "fim": "",
    "telefone": "",
    "email": ""
    "telefone_opc": "",
    "email_opc": "",
    "imagem": ""
}
*/

export async function listOrders() {
    try {
        const command = `select * from tb_agendamentos_orders;`;

        let [response] = await con.query(command);

        return response;
    } catch (error) {
        console.error(error);
        return 'Ocorreu um erro ao listar os pedidos.';
    }
}

export async function updateOrder(order, id) {
    try {
        const command = `update tb_agendamentos_orders set nome = ?, preco = ?, comeco = ?, fim = ?, telefone = ?, email = ?, telefone_opc = ?, email_opc = ? where id_agendamento = ?;`;
        let [response] = await con.query(command, [order.nome, order.preco, order.comeco, order.fim, order.telefone, order.email, order.telefone_opc, order.email_opc, id]);
        return { updatedRows: response.changedRows };
    } catch (error) {
        console.error(error);
        return 'Ocorreu um erro ao atualizar o pedido.';
    }
}

export async function deleteOrder(id) {
    try {
        const command = `delete from tb_agendamentos_orders where id_agendamento = ?;`;
        let [response] = await con.query(command, [id]);
        return response.affectedRows > 0 ? { deleted: true } : { deleted: false };
    } catch (error) {
        console.error(error);
        return 'Ocorreu um erro ao deletar o pedido.';
    }
}