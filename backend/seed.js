// seed.js
import mongoose from "mongoose";
import "dotenv/config.js";
import bcrypt from "bcrypt";

import User from "./api/models/user.model.js";
import Bank from "./api/models/bank.model.js";

const USERS = [
  { username: "kamal", email: "kamal@example.com", password: "Passw0rd!" },
  { username: "anita", email: "anita@example.com", password: "Passw0rd!" },
  { username: "rohan", email: "rohan@example.com", password: "Passw0rd!" }
];

// Bank accounts mapping by email for clarity
const BANK_ACCOUNTS = {
  "kamal@example.com": [
    {
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank",
      branchName: "Gomti Nagar",
      accountNumber: "123456789012",
      accountHolderName: "Kamal Nayan Tripathi"
    },
    {
      ifscCode: "SBIN0005678",
      bankName: "State Bank of India",
      branchName: "Hazratganj",
      accountNumber: "987654321045",
      accountHolderName: "Kamal Nayan Tripathi"
    }
  ],
  "anita@example.com": [
    {
      ifscCode: "ICIC0004321",
      bankName: "ICICI Bank",
      branchName: "Andheri East",
      accountNumber: "556677889900",
      accountHolderName: "Anita Sharma"
    },
    {
      ifscCode: "PUNB0123456",
      bankName: "Punjab National Bank",
      branchName: "Andheri West",
      accountNumber: "443322110099",
      accountHolderName: "Anita Sharma"
    }
  ],
  "rohan@example.com": [
    {
      ifscCode: "AXIS0007788",
      bankName: "Axis Bank",
      branchName: "Koramangala",
      accountNumber: "102938475610",
      accountHolderName: "Rohan Verma"
    },
    {
      ifscCode: "KARB0009876",
      bankName: "Karnataka Bank",
      branchName: "Indiranagar",
      accountNumber: "564738291056",
      accountHolderName: "Rohan Verma"
    }
  ]
};

async function seed() {
  try {
    console.log("🔌 Connecting to DB...");
    await mongoose.connect(process.env.MONGODB_URI);

    // Optional: wipe existing
    // await User.deleteMany({});
    // await Bank.deleteMany({});

    console.log("👤 Seeding users...");

    // If you have a pre-save hook that already hashes, you can skip manual hashing.
    const userDocs = [];
    for (const u of USERS) {
      const existing = await User.findOne({ email: u.email });
      if (existing) {
        console.log(`↺ Skipping (exists): ${u.email}`);
        userDocs.push(existing);
        continue;
      }

      // Manual hash ONLY if no pre-save hashing:
      // const hashed = await bcrypt.hash(u.password, 10);
      // const created = await User.create({ ...u, password: hashed });

      const created = await User.create(u); // relies on pre-save if present
      userDocs.push(created);
      console.log(`✅ Created user: ${u.email}`);
    }

    console.log("🏦 Seeding bank accounts...");
    for (const user of userDocs) {
      const accounts = BANK_ACCOUNTS[user.email] || [];
      for (const acc of accounts) {
        // Enforce uniqueness on accountNumber
        const exists = await Bank.findOne({ accountNumber: acc.accountNumber });
        if (exists) {
            console.log(`↺ Bank account exists: ${acc.accountNumber}`);
            continue;
        }
        await Bank.create({ ...acc, userId: user._id });
        console.log(`✅ Added account ${acc.accountNumber} for ${user.email}`);
      }
    }

    console.log("🌱 Seeding complete.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
}

seed();
