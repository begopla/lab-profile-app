const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
//const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const isAuthenticated = require('../middleware/isAuthenticated');

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");


/**
 * ! All routes are prefixed with /auth
 */



router.post("/signup", async (req, res, next) => {
  const { username, password, campus, course } = req.body;

  if (!username ) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

  //   ! This use case is using a regular expression to control for special characters and min length
  //   ! To use only if you want to enforce strong password (not during dev-time)
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
  }
  */

  // Search the database for a user with the username submitted in the form
  try {
    const foundUser = await User.findOne({ username })
    if(foundUser){
      return res.status(409).json({message: " This user already exists"});
    }
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPass = bcrypt.hashSync(password, salt);

    await User.create({
      username, 
      password: hashedPass,
      campus, 
      course
    });
    return res.status(201).json( 
        {
        username,
        password: hashedPass,
        campus, 
        course});
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  if (!username) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide your username." });
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }

 try {
  const foundUser = await User.findOne({ username });
  if (!foundUser) {
    return res.status(400).json({ message: "You're not youself." })
  }
  const goodPass = bcrypt.compareSync(password, foundUser.password)

  if (goodPass) {
    const user = foundUser.toObject();
    delete user.password;
    /**
     * We are going to use `jwt`
     * It has a mnethod called `sign` which allow us to create a Token
     *
     * It taked 3 arguments:
     * - first one is the user information, we refer to it as the `payload`
     * - Second one: It's a secret String
     * - Third one is the options: algorithms, expiration time
     */

    //! Send the token to the client if authentication was successful a new JWT is created
    const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "1d",
    });

    //!When signing the new JWT, we will set the user data as the payload of the token. 
    //!The token is then sent back in the response.

    res.status(200).json(authToken);
  } else {
    res.status(400).json({ message: "Did you do some typos ?" })
  }

 } catch (error) {
  next(error);
 }

});


//!As the response, the route will send the user data stored in the payload of the JWT. 
router.get("/verify", isAuthenticated, (req, res, next) => {
  try {
    res.status(200).json(req.payload);
  } catch (error) {
    next(error)
  }
});

module.exports = router;