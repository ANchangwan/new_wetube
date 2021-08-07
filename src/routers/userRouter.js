import express from "express";

const userRounter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRounter.get("/edit", handleEditUser);

export default userRounter;