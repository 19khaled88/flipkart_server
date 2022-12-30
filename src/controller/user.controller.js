const User = require('../model/user.js')
const {generateToken} = require('../utils/generateToken')
const jwt = require('jsonwebtoken')
exports.register = async(req,res)=>{
    
    try {   
        User.findOne({ email: req.body.email }).exec((error, user) => {
          if (user){
            return res.status(400).json({
                message: 'User already registered',
                success:false,
              })
          }
         
            const _user = new User(req.body)
          
            _user.save((error, data) => {
              if (error) {
                return res.status(400).json({
                  message: 'Something went wrong',
                  success:false
                })
              }
              if (data) {
                return res.status(200).json({
                  user: data,
                  success:true
                })
              }
            })
        
        })
      } catch (error) {
       return res.status(400).json({
          message: 'User not created',
          success:false
        })
      }
}
exports.signin = async(req,res)=>{
    try {
      User.findOne({ email: req.body.email }).exec((error, user) => {
        if(error) return res.status(400).json({error})

        if(user){
          if(user.authenticate(req.body.password)){
            const token = generateToken(user)
            const {hash_password:pwd,_id:id, ...userInfo} = user.toObject()
            return res.status(200).json({
              token,userInfo
            })
          }else{
            return res.status(400).json({
              message:'Invalid password'
            })
          }
        }
       
      })
    } catch (error) {
      return res.status(400).json({
        message:'Server error',
        success:false
      })
    }
}