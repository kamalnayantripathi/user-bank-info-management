import { Router } from "express"

const route = Router()

import { verifyAuth, verifyAdmin } from "../middlewares/auth.js";
import { getAllBankAccounts, createBankAccount, getUserBankAccounts, updateUserBankAccount,             deleteUserBankAccount, getFilteredBankAccounts } from "../controllers/banks.controller.js"

route.get("/accounts", verifyAuth, verifyAdmin, getAllBankAccounts)
route.post("/:id/account", verifyAuth, createBankAccount)
route.get("/:id/accounts", verifyAuth, getUserBankAccounts)
route.patch("/:id/account/:bankId", verifyAuth, updateUserBankAccount)
route.delete("/:id/account/:bankId", verifyAuth, deleteUserBankAccount)
route.get("/filtered-accounts", verifyAuth, verifyAdmin, getFilteredBankAccounts)

export default route;