import con from "../core/connection.js";

export async function verifyUser(login) {
    try{
        const command = `select * from tb_user_settings where email = ? and senha = ?`;
        let [[response]] = await con.query(command, [login.email, login.senha]);

        if (response) {
            return { "id": response.id_personal, "email": response.email };
        } else {
            return "Usuário não encontrado ou credenciais incorretas.";
        }
    }
    catch (error) {
        console.error(error);
        return "Ocorreu um erro ao verificar o usuário.";
    }
}

export async function createUser(register) {
    try {
        const command = `insert into tb_user_settings (email, senha) values (?, ?);`
        let [response] = await con.query(command, [register.email, register.senha]);
        return { userId: response.insertId };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return 'E-mail já cadastrado. Por favor, use outro e-mail.';
        } else {
            return 'Ocorreu um erro ao criar o usuário.';
        }
    }
}

export async function deleteUser(id) {
    try {
        let [ [ is_last ] ] = await con.query(`select count(*) from tb_user_settings`)
        
        if (is_last["count(*)"] > 1) {
            const command = `delete from tb_user_settings where id_personal = ?`
            let [ response ] = await con.query(command, [ id ])    
            return response.insertId
        }
        else {
            return 'Só há um usuário, impossivel excluir essa conta, crie outra para possibilitar exclusão.'
        }
    }
    catch (error) {
        console.error(error);
        return 'Ocorreu um erro ao excluir o usuário.';
    }
}

export async function getUserInfo( id ) {
    try {     
        const command = `select * from tb_user_settings where id_personal = ?`;
        let [resposta] = await con.query(command, [id]);        
    
        return resposta
    }
    catch (error) {
        console.error(error);
        return 'Ocorreu um erro ao pegar as informações do usuário.';
    }
}

export async function updateUser( id, data ) {
    try {     
        const command = `update tb_user_settings set nome = ?, cpf = ?, endereco = ?, email = ?, telefone = ?, senha = ? where id_personal = ?`;
        let [resposta] = await con.query(command, [data.nome, data.cpf, data.endereco, data.email, data.telefone, data.senha, id]);        
    
        return resposta
    }
    catch (error) {
        console.error(error);
        return 'Ocorreu um erro ao alterar as informações do usuário.';
    }
}
