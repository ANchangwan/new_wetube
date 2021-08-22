import { response } from "express";
import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle:"Join"});
}
export const postJoin = async (req, res) => {
    const {email, username, password, password2, name, loacation} = req.body;
    const exists = await User.exists({$or:[{username},{email}]});

    if (password !== password2 ){
   
        return res.status(400).render("join", {pageTitle:"Join",errorMessage:`패스워드가 일치하지 않습니다.` });
    };

    if(exists){
        return res.status(400).render("join", {pageTitle:"Join",errorMessage:`이미존재하는 ${exists}계정입니다.` });
    }
    
    await User.create({
        email,
        username, 
        password, 
        name, 
        loacation
    });
   
    console.log(req.body);
    return res.redirect("/login");
}
export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.send("remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");

