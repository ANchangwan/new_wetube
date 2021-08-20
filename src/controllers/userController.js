import User from "../models/User";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle:"Join"});
}
export const postJoin = async (req, res) => {
    const {email, username, password, name, loacation} = req.body;
    
    try{
        await User.create({
            email,
            username, 
            password, 
            name, 
            loacation
        });
    }catch(error){
        res.write("<script>alert('이미 존재하는 계정입니다.')</script>");
        res.redirect("/join");
    
    }
    console.log(req.body);
    return res.redirect("/login");
}
export const edit = (req, res) => res.render("edit");
export const remove = (req, res) => res.send("remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Log Out");
export const see = (req, res) => res.send("See User");

