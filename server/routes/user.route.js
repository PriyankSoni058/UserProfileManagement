const router = require("express").Router();
const {
  validateUserProfile,
  validateResults,
} = require("../validators/profileValidation");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const userService = require("../services/user.service");

const uploadDir = path.join(__dirname, "..", "profile");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    if (file) {
      const uniqueSuffix =
        Date.now() + "-" + crypto.randomBytes(8).toString("hex");
      const ext = path.extname(file.originalname);
      cb(null, uniqueSuffix + ext);
    }
  },
});

// File filter to accept only certain types of files
const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(null, true);
  }
  console.log(file, "file");
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images are allowed."), false);
  }
};

// Multer configuration with size limit and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.post(
  "/profile",
  upload.single("image"),
  validateUserProfile,
  validateResults,
  userService.add
);
router.put("/profile/:id", upload.single("image"), userService.update);
router.get("/profiles", userService.list);

module.exports = router;
