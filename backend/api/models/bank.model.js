import mongoose, { Schema } from "mongoose";

const bankSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ifscCode: {
        type: String,
        required: true,
        match: /^[A-Z]{4}0[A-Z0-9]{6}$/ // Validates IFSC format
    },
    bankName: {
        type: String,
        required: true,
        trim: true
    },
    branchName: {
        type: String,
        required: true,
        trim: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{9,18}$/ // Ensures numeric account number
    },
    accountHolderName: {
        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z\s]+$/ // Only letters and spaces
    }
}, { timestamps: true });

const Bank = mongoose.model("Bank", bankSchema);

export default Bank;


// Valid IFSC Codes (11 characters)
// Your regex is:
// /^[A-Z]{4}0[A-Z0-9]{6}$/

// SBIN0001234 (SBI)
// HDFC0005678 (HDFC)
// ICIC0004321 (ICICI)
// PUNB0123456 (PNB)
// KARB0009876 (Karnataka Bank)

// Valid Account Numbers (9-18 digits)
// Your regex is:
// /^[0-9]{9,18}$/

// Examples:

// 123456789
// 987654321012
// 456789123456789
// 1002003004005006

// Valid Account Holder Names (Only letters and spaces)
// Your regex is:
// /^[a-zA-Z\s]+$/

// Examples:

// Ravi Kumar
// Anjali
// John Doe
// Kamal Nayan Tripathi

