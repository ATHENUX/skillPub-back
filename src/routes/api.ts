import { Router, Application } from "express";
import { check } from "express-validator";
import { isLogged } from "middlewares/isLogged";
import multer from "multer";
import { join } from "path";

//Controllers
import user from "controllers/users.controller";
import categories from "controllers/category.controller";
import aptitudes from "controllers/aptitudes.controller";
import posts from "controllers/posts.controller";

const router: Router = Router();

const upload = multer({
  dest: join(__dirname, "../../public/images/upload/temp"),
});

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
  router.post("/googleAccess", user.googleAccess);
  router.post("/facebookAccess", user.facebookAccess);
  router.post("/assignAptitudes", isLogged, user.assignAptitudes);
  router.post("/validateAccessToken", user.validateAccessToken);
  router.post("/updateUserSettings",isLogged, user.updateUserSettings);

  //Categories
  router.get("/categories", categories.getCategories);

  //Aptitudes
  router.post("/aptitudes", isLogged, aptitudes.getAptitudes);

  //Posts
  //router.post("/posts", isLogged, upload. ("post"), posts.addPost);

  app.use("/api", router);
}

export default api;
