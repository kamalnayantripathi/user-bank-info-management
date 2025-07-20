import Bank from "../models/bank.model.js";
import User from "../models/user.model.js";
import mongoose from "mongoose";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllBankAccounts = async(req, res) => {
    try {
        const banks = await Bank.find()
        return res.status(200).json({statusCode: 200, banks, message: "Banks fetched successfully."})
    } catch (error) {
        return res.status(500).json({statusCode: 500, message: error.message})
    }
}

const createBankAccount = async(req, res) => {
    const userId = req.params.id;
    console.log("create: ",userId)
    if (!userId || !isValidId(userId)) {
        return res.status(400).json({ statusCode: 400, message: "Invalid or missing userId." });
    }
    console.log("body",req.body)
    const { ifscCode, bankName, branchName, accountNumber, accountHolderName } = req.body;
    try {
        if([ifscCode, bankName, branchName, accountHolderName].some((val)=>val.trim()==="") || !accountNumber){
            return res.status(400).json({ statusCode: 400, message: "All fields are required."})
        }
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ statusCode: 404, message: "User not found."})
        }

        const existing = await Bank.findOne({ accountNumber });
        if (existing) {
            return res.status(409).json({ statusCode: 409, message: "Account number already exists." });
        }

        const bank = await Bank.create({
            userId,
            ifscCode, 
            bankName, 
            branchName, 
            accountNumber, 
            accountHolderName
        })
        return res.status(201).json({statusCode: 201, bank, message: "Bank account registered successfully."})
    } catch (error) {
        console.error("Bank creation error:", error);

        // Check for Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", ") // Combine all field errors
            });
        }

        // Duplicate key error (e.g., accountNumber unique constraint)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `Duplicate field value: ${Object.keys(error.keyValue)}`
            });
        }

        // Fallback error
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the bank account."
        });
    }
}

const getUserBankAccounts = async(req, res) => {
    const userId = req.params.id;
    console.log(userId, req.params)
    if (!userId || !isValidId(userId)) {
        return res.status(400).json({ statusCode: 400, message: "Invalid or missing userId." });
    }
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ statusCode: 404, message: "User not found."})
        }
        const banks = await Bank.find({ userId })
        return res.status(200).json({statusCode: 200, banks, message: "User bank accounts fetched successfully."})
    } catch (error) {
        return res.status(500).json({statusCode: 500, message: error.message})
    }
}

const updateUserBankAccount = async(req, res) => {
    const userId = req.params.id;
    const bankId = req.params.bankId
    console.log("update: ",userId, bankId)
    if (!isValidId(userId) || !isValidId(bankId)) {
    return res.status(400).json({ statusCode: 400, message: "Invalid identifiers." });
  }
    const { ifscCode, bankName, branchName, accountHolderName } = req.body;
    try {
        if([ifscCode, bankName, branchName, accountHolderName].some((val)=>val.trim()==="")){
            return res.status(400).json({ statusCode: 400, message: "All fields are required."})
        }
        const bankDoc = await Bank.findOne({ _id: bankId, userId });
        if (!bankDoc) {
            return res.status(404).json({ statusCode: 404, message: "Bank account not found for this user." });
        }
        bankDoc.ifscCode = ifscCode.trim();
        bankDoc.bankName = bankName.trim();
        bankDoc.branchName = branchName.trim();
        bankDoc.accountHolderName = accountHolderName.trim();
        await bankDoc.save();
        return res.status(200).json({statusCode: 200, bankDoc, message: "User bank account updated successfully."})
    } catch (error) {
        console.error("Bank creation error:", error);

        // Check for Mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", ") // Combine all field errors
            });
        }

        // Duplicate key error (e.g., accountNumber unique constraint)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: `Duplicate field value: ${Object.keys(error.keyValue)}`
            });
        }

        // Fallback error
        res.status(500).json({
            success: false,
            message: "Something went wrong while creating the bank account."
        });
    }
}

const deleteUserBankAccount = async(req, res) => {
    const userId = req.params.id;
    const bankId = req.params.bankId;
    console.log("delete: ",userId, bankId)
    if (!isValidId(userId) || !isValidId(bankId)) {
    return res.status(400).json({ statusCode: 400, message: "Invalid identifiers." });
  }
    try {
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({ statusCode: 404, message: "User not found."})
        }
        const deleted = await Bank.findOneAndDelete({ _id: bankId, userId });
        if (!deleted) {
            return res.status(404).json({ statusCode: 404, message: "Bank account not found for this user." });
        }
        return res.status(200).json({statusCode: 200, message: "User bank account deleted successfully."})
    } catch (error) {
        return res.status(500).json({statusCode: 500, message: error.message})
    }
}

const getFilteredBankAccounts = async (req, res) => {
    try {
        console.log("Filter")
        const { search, bankName, branchName } = req.query;
        console.log(search, bankName, branchName)

        let filter = {};

        if (search) {
        const regex = new RegExp(search, "i");
        filter.$or = [
            { bankName: regex },
            { ifscCode: regex },
            { accountHolderName: regex },
            { accountNumber: regex },
        ];
        }
        if (bankName) filter.bankName = new RegExp(bankName, "i");
        if (branchName) filter.branchName = new RegExp(branchName, "i");

        const banks = await Bank.find(filter);
        return res.status(200).json({ statusCode: 200, banks, message: "Filtered bank accounts fetched successfully."});
    } catch (error) {
        return res.status(500).json({ statusCode: 500, message: error.message });
    }
}

export{
    getAllBankAccounts,
    createBankAccount,
    getUserBankAccounts,
    updateUserBankAccount,
    deleteUserBankAccount,
    getFilteredBankAccounts
}