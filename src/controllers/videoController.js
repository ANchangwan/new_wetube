const fakeUser = {
    username:"anchangwan",
    loggedIn:false,
};


export const trending = (req, res) =>{
    const videos = [1,2,3,4,5,6,7,8,9,10];
    return  res.render("home", {pageTitle: "Home", fakeUser:fakeUser, videos})
};
export const see = (req, res) =>{
    return res.render("watch");
};
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload");
export const deleteVideo = (req, res) => res.send("Delete Videos");