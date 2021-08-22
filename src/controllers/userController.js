import { response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";


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
        return res.status(400).render("join", {pageTitle:"Join",errorMessage:`이미존재하는 계정입니다.` });
    };
    try {
        await User.create({
            email,
            username, 
            password, 
            name, 
            loacation
        });
        return res.redirect("/login");
    } catch (error) {
        
        return res.status(400).render("join",{
            pageTitle:"Join",
            errorMessage:error._message
        });
    }
}
export const getLogin = (req, res) => res.render("login", {pageTitle:"login"});

export const postLogin = async (req, res) =>{
    const {username, password} = req.body;
    const pageTitle = "login";
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{pageTitle,errorMessage:"계정이 존재하지 않습니다."});
    }
    
    const ok = await bcrypt.compare(password, user.password);
    if (!ok){
        return res.status(400).render("login",{pageTitle, errorMessage:"Wrong password"});
    }
    console.log("로그인 구현 성공");
    res.redirect("/");
}

export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.send("remove User");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");

