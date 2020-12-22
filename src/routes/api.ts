import { Router, Application } from "express";
import { check } from "express-validator";
import { isLogged } from "middlewares/isLogged";
import multer from "multer";

import { storage } from "config/multer.config";

//Constants
import { constants } from "helpers/constants";

//Controllers
import user from "controllers/users.controller";
import categories from "controllers/category.controller";
import aptitudes from "controllers/aptitudes.controller";
import posts from "controllers/posts.controller";

const router: Router = Router();

function api(app: Application) {
  //user
  router.post(
    "/signIn",
    [
      check("email").not().isEmpty().withMessage("Email is required"),
      check("password").not().isEmpty().withMessage("Password is required"),
    ],
    user.signIn
  );
  router.post(
    "/signUp",
    [
      check("email").not().isEmpty().withMessage("Email is required"),
      check("firstName").not().isEmpty().withMessage("First name is required"),
      check("lastName").not().isEmpty().withMessage("Last name is required"),
    ],
    user.signUp
  );
  router.post("/getUser", isLogged, user.getUser);
  router.post("/googleAccess", user.googleAccess);
  router.post("/facebookAccess", user.facebookAccess);
  router.post("/assignAptitudes", isLogged, user.assignAptitudes);
  router.post("/validateAccessToken", user.validateAccessToken);
  router.post("/updateUserSettings", isLogged, user.updateUserSettings);
  router.put("/updateUserState", isLogged, user.updateUserState);
  router.post("/follow", isLogged, user.follow);
  router.post("/unfollow", isLogged, user.unfollow);
  router.post("/searchByUser", user.searchUserByName);
  router.post("/accountSettings", isLogged, user.accountSettings);
  router.post("/changePassword", isLogged, user.changePassword);

  //Categories
  router.get("/categories", categories.getCategories);

  //Aptitudes
  router.post("/aptitudes", isLogged, aptitudes.getAptitudes);

  //Posts
  router.post(
    "/posts",
    isLogged,
    multer({
      storage: storage,
    }).array("files[]", constants.maximumFilesSupported),
    check("bodyContent").not().isEmpty().withMessage("Post body is required"),
    posts.addPost
  );
  router.post("/getPostsProfile", isLogged, posts.getPostsProfile);
  router.post("/republishPost", isLogged, posts.republishPost);
  router.post("/countPosts", isLogged, posts.countPosts);

  app.use("/api", router);
}

export default api;
