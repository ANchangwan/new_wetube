import Video from "../models/Video";

/* callback 함수
Video.find({}, (error, videos) =>{
  if(error){
    return res.render("error-server");
  }else{
    return res.render("home", {pageTitle: "Home",videos} );
  }
})
 */

export const home = async (req, res) =>{
  try{
    const videos = await Video.find({});
    return  res.render("home", {pageTitle: "Home", videos} );
  } catch{
    return res.render("server-error"); 
  }
};
export const watch = (req, res) =>{
    const {id} = req.params
    return res.render("watch", {pageTitle:`watching` });
};
export const getEdit = (req, res) => {
  const {id} = req.params
  return res.render("edit", {pageTitle: `Editing`})
};

export const postEdit = (req, res) => {
  const {id} = req.params;
  const {title} = req.body;
  videos[id-1].title = title;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) =>{
  return res.render("upload", {pageTitle:"Upload Video"});
};

export const postUpload = async (req, res) => {
  const {title, description, hashtags} = req.body;
  try{
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) => `#${word}`),
      meta:{
        views:0,
        rating:0
      }
    });
    return res.redirect("/");
  }catch(error){
    console.log(error);
    return res.render("upload", {pageTitle:"Upload Video", errorMassage:error._message});
  }
};