import { Router } from "express";
import { createAccount, deleteAccount, getAccounts, updateAccount } from "../controllers/account.controller";

const route: Router = Router();


route.post("/create", createAccount);
route.get("/", getAccounts);

route.patch("/update/:id", updateAccount)
route.delete("/remove/:id", deleteAccount)

export default route;