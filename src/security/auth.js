import jwt from "jsonwebtoken"
const key = "adm123"

//Após validar o usuario (existir na db) ele gera um token de sessão
export function gerarToken(user) {
    return jwt.sign(user, key)

}

//Faz uma validação do token de sessão que se existir permite continuar o endpoint
export function authToken(req, resp, next) {
    try {
        let token = req.headers["x-access-token"]

        if (token === undefined) {
            token = req.query["x-access-token"]
        }
        
        let signed = jwt.verify(token, key)

        req.user = signed

        next()
    }
    catch (e) {
        resp.status(400).end()
    }
}