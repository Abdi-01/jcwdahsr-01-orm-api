import { Request, Response } from "express";

export const createAccount = (req: Request, res: Response) => {
    try {
        res.status(201).send("Create Account Success")
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getAccounts = (req: Request, res: Response) => {
    try {

        res.status(200).send("Get Data")
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}