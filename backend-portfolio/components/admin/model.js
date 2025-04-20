const mongoose = require("mongoose");
const { scryptSync } = require("crypto");
const db = require("../../db");

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Admin = mongoose.model("Admin", adminSchema);

async function getAdmin(user) {
    await db.connect();
    return await Admin.findOne({ username: user }) || false;
}

async function addAdmin(user, pass) {
    await db.connect();
    let existingAdmin = await getAdmin(user);
    
    if (!existingAdmin) {
        let secret = process.env.SALT;
        let hashedPassword = scryptSync(pass, secret, 64).toString("base64");

        let newAdmin = new Admin({ username: user, password: hashedPassword });
        await newAdmin.save();
        return true;
    }
    
    return false;
}

async function authenticateAdmin(user, pass) {
    await db.connect();
    let secret = process.env.SALT;
    let hashedPassword = scryptSync(pass, secret, 64).toString("base64");

    let admin = await Admin.findOne({ username: user, password: hashedPassword });
    return admin ? true : false;
}

module.exports = { getAdmin, addAdmin, authenticateAdmin };
