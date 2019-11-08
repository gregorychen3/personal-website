import express from "express";

const testController = express.Router();

testController.get("/", (req, res, next) => res.send("ok"));

export default testController;
