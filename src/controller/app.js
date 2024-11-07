import { authToken } from "../security/auth.js";
import * as db from "../repository/app.js";
import { Router } from "express";

const endpoint = Router();

endpoint.post("/orders/create", authToken, async (req, resp) => {
    let order = req.body;
    let query = await db.createOrder(order);

    if (typeof query === "string") {
        resp.send({ error: query });
    } else {
        resp.send({ "NewOrderID": query.orderId });
    }
});

endpoint.get("/orders/list", authToken, async (req, resp) => {
    let query = await db.listOrders();
    if (typeof query === "string") {
        resp.send({ error: query });
    } else {
        resp.send(query);
    }
});

endpoint.put("/orders/update", authToken, async (req, resp) => {
    let order = req.body;
    let orderId = req.query.id;
    let query = await db.updateOrder(order, orderId);

    if (typeof query === "string") {
        resp.send({ error: query });
    } else {
        resp.send({ updated: query.updatedRows > 0 });
    }
});

endpoint.delete("/orders/delete", authToken, async (req, resp) => {
    let orderId = req.query.id;
    let query = await db.deleteOrder(orderId);

    if (typeof query === "string") {
        resp.send({ error: query });
    } else {
        resp.send(query);
    }
});

export default endpoint;
