import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. pastikan middleware menerima token
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token);
        // 2. jika token tidak tersedia, maka kirim error
        if (!token) {
            throw { code: 400, message: "Token not exist" }
        }
        // 3. Jalankan fungsi penerjemahan token
        const decript = verify(token, process.env.SECRET || "secret");

        // 4. Jika berhasil diterjemahkan, teruskan ke controller
        res.locals.decript = decript;

        next();
    } catch (error) {
        res.status(500).send(error)
    }
}