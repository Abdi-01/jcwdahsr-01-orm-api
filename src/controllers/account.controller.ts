import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { Account } from "../generated/prisma/client";
import { hashPassword } from "../utils/hashPassword";
import { compare } from "bcrypt";

export const createAccount = async (req: Request, res: Response) => {
    try {
        const create = await prisma.account.create({
            data: { ...req.body, password: await hashPassword(req.body.password) }
        })

        res.status(201).send("Create Account Success")
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, newPassword } = req.body;
        const update = await prisma.account.update({
            where: { email },
            data: { password: await hashPassword(newPassword) }
        })

        res.status(201).send("Reset Password Success")
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        // 1. get data from req.body
        const { email, password } = req.body;
        // 2. filter to prisma.account
        const account = await prisma.account.findUnique({
            where: {
                email
            }
        })

        if (!account) {
            return res.status(404).send("Account not found")
        }

        // 3. compare password
        const checkPassword = await compare(password, account?.password as string);
        if (!checkPassword) {
            return res.status(401).send("Wrong password")
        }

        res.status(200).send(account);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getAccounts = async (req: Request, res: Response) => {
    try {
        const filterData: Partial<Account> = {};

        const limit = Number(req.query.limit) || 2;
        const page = Number(req.query.page) || 1;

        if (req.query.name) {
            filterData.name = req.query.name as string;
        }

        if (req.query.email) {
            filterData.email = req.query.email as string;
        }

        // access prisma model with function
        const accounts = await prisma.account.findMany({
            where: filterData,
            include: {
                addresses: {
                    omit: {
                        id: true,
                        accountId: true
                    }
                }
            },
            omit: {
                updatedAt: true
            },
            skip: (page - 1) * limit,
            take: limit
        });
        // send data result

        res.status(200).send(accounts)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getAgeAverage = async (req: Request, res: Response) => {
    try {
        // access prisma model with function
        const ageAVG = await prisma.account.aggregate({
            _avg: {
                age: true
            },
            _max: {
                age: true
            },
            _min: {
                age: true
            }
        });
        // send data result

        res.status(200).send(ageAVG)
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getAccountById = async (req: Request, res: Response) => {
    try {
        // access prisma model with function
        const account = await prisma.account.findUnique({
            where: { id: Number(req.params.id) }
        });
        // send data result

        res.status(200).send(account)
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