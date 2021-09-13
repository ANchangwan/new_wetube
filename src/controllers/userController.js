import User from "../models/User";
import fetch from "node-fetch";
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
    console.log(user);
    
    if(!user){
        return res.status(400).render("login",{pageTitle,errorMessage:"계정이 존재하지 않습니다."});
    }
    
    const ok = await bcrypt.compare(password, user.password);
    if (!ok){
        return res.status(400).render("login",{pageTitle, errorMessage:"Wrong password"});
    }
    req.session.loggedIn = true;
    req.session.user = user;// session에 정보 추가
    res.redirect("/");
}

export const startGithubLogin = (req, res) =>{
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config ={
        client_id:process.env.GH_CLIENT,
        allow_signup:false,
        scope:"read:user user:email" // 공백으로 해야한다.
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl =  `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
}

export const finishGithub = async (req, res) =>{
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id:process.env.GH_CLIENT,
        client_secret:process.env.GH_SCRET,
        code:req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
            await fetch(finalUrl, {
            method:"POST",
            headers:{
                Accept: "application/json",
            },
        })
    ).json();
   
    if ("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user` ,{
                headers:{
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        
        const emailData = await(
            await fetch(`${apiUrl}/user/emails` ,{
                headers:{
                    Authorization: `token ${access_token}`,
                }, 
            })).json();
        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!emailObj){
            return res.redirect("/login");
        }
        let user = await User.findOne({email:emailObj.email});
        if (!user){
            user = await User.create({
                 name:userData.name,
                 avatarUrl: userData.avatar_url,
                 username:userData.login,
                 email:emailObj.email, 
                 password:"", 
                 socialOnly:true,
                 loacation:userData.location,
                });
           
            }
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        
    }else{
        return res.redirect("/login")
    }
}

export const logout = async (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
export const getEdit = (req, res) =>{
    
    return res.render("edit-profile", {pageTitle:"Edit Profile"});
}
export const postEdit = async(req, res)=> {
    
    const {session: {
        user: {_id, email:sessionEmail,username:sessionUsername},
    },
    body: {name, email, username, location},
    } = req;
    
    let existsAccount = [];
    if (sessionEmail !== email){
        existsAccount.push({email})
    }
    if (sessionUsername !== username){
        existsAccount.push({username})
    }
    
    if (existsAccount.length >0){
        const exists = await User.findOne({$or:existsAccount});
        console.log(exists, _id,"exists");
        if (exists && exists._id.toString() !== _id){
            return res.status(404).render("edit-profile",{
                pageTitle:"Edit Profile",
                errorMessage: "already Taken"
            })
        }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
        _id,{
            name,
            email,
            username,
            location
        },
        {new:true}
    );
    req.session.user = updatedUser;

    return res.redirect("edit-profile");
};
export const getChangePassword = (req, res) => {
    if(req.session.user.socialOnly === true){
        return res.redirect("/")
    }
    return res.render("users/change-password", {pageTitle:"Change Password"});
}
export const postChangePassword = async (req, res) => {
    const {session: {
        user: { _id, password },
    },
    body: {oldPassword,
        newPassword,
        newPasswordConfirmation},
    } = req;
    const ok = await bcrypt.compare(oldPassword, password);
    if (!ok){
        return res.status(400).render("users/change-password", 
        {
            pageTitle:"Change Password", 
            errorMessage:"현재 비밀번호와 일치하지 않습니다."
        });
    }
    if (newPassword !== newPasswordConfirmation){
        return res.status(400).render("users/change-password", 
        {
            pageTitle:"Change Password", 
            errorMessage:"새로운 비밀번호가 일치하지 않습니다."
        });
    }
    const user = await User.findById(_id);
    user.password = newPassword;
    await user.save();
    req.session.user.password = user.password;
    return res.redirect("/users/logout")
}
export const remove = (req, res) => res.send("remove User");
export const see = (req, res) => res.render("see");

