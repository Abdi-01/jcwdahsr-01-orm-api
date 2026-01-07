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

export const updateAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.account.update({
            where: { id: Number(id as string) },
            data: req.body
        })

        res.status(200).send({
            success: true,
            message: "Update data success"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.account.delete({
            where: { id: Number(id as string) },
        })

        res.status(200).send({
            success: true,
            message: "Delete data success"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}