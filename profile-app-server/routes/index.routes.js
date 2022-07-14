const router = require("express").Router();
const authRoutes = require("./auth.routes");

const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User.model");
const jwt = require("jsonwebtoken")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);



// CR(U)D -- Update user object adding image string
router.put('/users',isAuthenticated , async (req, res, next) => {
  try {
  const {image} = req.body;

  //?how do u authenticate the user, can I acess here req.payload._id instead of req.user??
  if(req.payload){

     const user = await User.findByIdAndUpdate(
          req.payload._id,
          {
              image
          },
          {new:true}
      );
      const authToken = jwt.sign(user.toObject(), process.env.TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "1d",
      });
      return res.status(200).json({
          
          message: 'File successfully uploaded',
          image: image,
          user: req.payload,
          token: authToken

        });
  } else return res.status(401).json({
          message: 'The current user is not authorized'
  });

  } catch (error) {
      next(error);
  }
});

// C(R)UD -- read and return current user object

router.get('/users', isAuthenticated, async (req,res,next) =>{
  try {
      if(req.payload){
          await User.findById(req.payload._id);
          return res.status(200).json({
              message: 'Current user found',
              user: req.payload
          })
      }
      else return res.status(401).json({
          message: 'No current user found'
  });
      
  } catch (error) {
      next(error)
  }
})



//CR(U)D -- return ImageURL
router.post('/upload', isAuthenticated, async (req,res,next) =>{
  try {
    
    console.log(req.payload)

 
      return res.status(200).json({
                message: 'Current user found',
                image: req.payload
            })
   
    }catch (error) {
    next(error)
  }
})

module.exports = router;
