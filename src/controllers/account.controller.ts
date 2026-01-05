import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const create = await prisma.account.create({
            data: req.body
        })

        res.status(201).send("Create Account Success")
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getAccounts = async (req: Request, res: Response) => {
    try {
        // access prisma model with function
        const accounts = await prisma.account.findMany();
        // send data result

        res.status(200).send(accounts)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}