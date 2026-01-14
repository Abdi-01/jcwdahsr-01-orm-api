import { Router } from "express";
import { createAccount, deleteAccount, getAccountById, getAccounts, getAgeAverage, login, resetPassword, updateAccount } from "../controllers/account.controller";
import { verifyToken } from "../middleware/verifyTokent";

const route: Router = Router();


route.get("/", getAccounts);
route.get("/age-info", getAgeAverage);
route.post("/auth", login);
route.post("/create", createAccount);
route.patch("/reset-password", resetPassword);

route.get("/:id", getAccountById);
route.patch("/update", verifyToken, updateAccount)
route.delete("/remove/:id", deleteAccount)

export default route;