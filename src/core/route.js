import app from "../controller/app.js"
import user from "../controller/user.js"

export default function serveradd(serv){
    serv.use(app)
    serv.use(user)
}