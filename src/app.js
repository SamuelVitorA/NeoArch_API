import "dotenv/config"
import express from "express"
import cors from "cors"

import serveradd from "./route.js"

const serv = express()
serv.use(cors())
serv.use(express.json({ limit:"10mb" }))

serveradd(serv)

serv.listen(process.env.PORTA, () => console.log(`A porta ${process.env.PORTA} está na rede!`))