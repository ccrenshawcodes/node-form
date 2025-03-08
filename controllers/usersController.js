const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require('express-validator');

const alphaErr = "must only contain letters";
const lengthErr = "must be between 1 and 10 characters"

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`first name ${alphaErr}`)
    .isLength({ min: 1, max: 10}).withMessage(`Last name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength().withMessage(`Last name ${lengthErr}`),
  body("userEmail").trim()
    .isEmail().withMessage('Please enter a valid email.'),
  body("age").trim()
    .optional({ values: "falsy" })
    //  check for being between 18-120. use .matches()?
    .isNumeric().withMessage('Age must be a whole number'),
  body("bio").trim()
    .optional({ values: "falsy" })
    .isLength({ max: 200 }).withMessage('Your message must be less than 200 characters')
];

exports.usersListGet = (req, res) => {
  res.render("index", {
    title: "User list",
    users: usersStorage.getUsers(),
  });
};

exports.usersCreateGet = (req, res) => {
  res.render("createUser", {
    title: "Create user",
  });
};

exports.usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('createUser', {
        title: "Create user",
        errors: errors.array(),
      });
    }

    const { firstName, lastName, userEmail, age, bio } = req.body;
    usersStorage.addUser({ firstName, lastName, userEmail, age, bio });
    res.redirect('/');
  }
];

exports.usersUpdateGet = (req, res) => {
  const user = usersStorage.getUser(req.params.id);
  res.render("updateUser", {
    title: "Update user",
    user: user,
  });
};

exports.usersUpdatePost = [
  validateUser,
  (req, res) => {
    const user = usersStorage.getUser(req.params.id);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("updateUser", {
        title: "Update user",
        user: user,
        errors: errors.array(),
      });
    }
    const { firstName, lastName, userEmail, age, bio } = req.body;
    usersStorage.updateUser(req.params.id, { firstName, lastName, userEmail, age, bio });
    res.redirect('/');
  }
];

exports.usersDeletePost = (req, res) => {
  usersStorage.deleteUser(req.params.id);
  res.redirect('/');
}