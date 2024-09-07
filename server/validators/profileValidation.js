const { body, validationResult } = require("express-validator");

const validateUserProfile = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("FirstName is required")
    .isLength({ max: 50 })
    .withMessage("FirstName cannot exceed 50 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("LastName is required")
    .isLength({ max: 50 })
    .withMessage("LastName cannot exceed 50 characters"),

  body("userName")
    .trim()
    .notEmpty()
    .withMessage("LastName is required")
    .isLength({ max: 35 })
    .withMessage("LastName cannot exceed 35 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("bio")
    .optional()
    .trim()
    .isLength({ max: 250 })
    .withMessage("Bio cannot exceed 250 characters"),
];

const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateUserProfile,
  validateResults,
};
