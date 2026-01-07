import { Router } from "express";
import { createAccount, deleteAccount, getAccountById, getAccounts, getAgeAverage, updateAccount } from "../controllers/account.controller";

const route: Router = Router();


route.post("/create", createAccount);
route.get("/", getAccounts);
route.get("/age-info", getAgeAverage);

route.get("/:id", getAccountById);
route.patch("/update/:id", updateAccount)
route.delete("/remove/:id", deleteAccount)

export default route;