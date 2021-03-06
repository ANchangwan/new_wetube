import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({ creatAt: "desc" })
      .populate("owner");
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("server-error");
  }
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await await Video.findById(id)
    .populate("owner")
    .populate("comments");
  console.log(video);
  if (video) {
    return res.render("watch", { pageTitle: video.title, video });
  } else {
    return res.render("404", { pageTitle: "Video not found!" });
  }
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found!" });
  }
  if (String(video.owner) !== String(_id)) {
    req.flash("error", "인증 되지 않은 사용자입니다.");
    return res.status(403).redirect("/");
  }

  return res.render("edit", { pageTitle: `Edit : ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found!" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });

  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    user: { _id },
  } = req.session;
  const file = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: file.path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
      meta: {
        views: 0,
        rating: 0,
      },
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .render("upload", {
        pageTitle: "Upload Video",
        errorMassage: error._message,
      });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(_id).populate("owner");
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found!" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id);

  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: { $regex: keyword, $options: "i" },
    }).populate("owner");
  }

  return res.render("search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views = video.meta.views + 1;
  video.save();
  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const {
    session: { user },
    body: { text },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  if (!video) {
    return res.sandStatus(404);
  }
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment._id);
  video.save();
  return res.status(201).json({ newCommentId: comment._id });
};

export const deleteComment = async (req, res) => {
  console.log("hi");
  const { id } = req.params;
  // const comment = await Comment.findById(id).populate("owner");
  // if (!comment){
  //   console.log("fist");
  //   return res.status(404).render("404",{pageTitle:"Video not found!"});
  // }
  // if(String(comment.owner) !== String(comment)){
  //   console.log("fist2");
  //   return res.status(403).redirect("/");
  // }
  await Comment.findByIdAndDelete(id);
  // sendStatus(200);
  // console.log(res.status);
  return res.redirect(`videos/:id([0-9a-f]{24})`); // redirect url
  // console.log("hi");

  // const{
  //   session:{user:{_id}},
  //   params:{videoId, newCommentId}
  // } = req;
  // //db에있는 comment id값 -> 이게변수이름이머야
  // const video = await Video.findById(videoId).populate("owner").populate("comments");
  // console.log(video);
  // if (!video){
  //   return res.status(404);
  // }

  // const comment = video.comments.find(
  //   (comment) => String(comment._id) === newCommentId
  //   );

  //   if (!comment){
  //     return res.sendStatus(400);
  //   }
  //  await Video.findByIdAndDelete(comment.commentId);
  // //video -> video.findby~ commentid

  // video.comments = video.comments.filter(
  //   (comment) => String(comment._id) !== commentId
  // );
  // if(String(video.owner !== _id)){
  //   return res.status(403);
  // }

  // // await video.save();

  // return res.sendStatus(200);
};
