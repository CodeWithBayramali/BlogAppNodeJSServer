import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../db/userModel.js";
import Token from '../db/tokenModel.js'

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { nameSurname, userName, email, password, rePassword } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(400)
        .json({ message: "Bu emaile sahip bir kullanıcı mevcut" });


    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      nameSurname,
      userName,
      email,
      password: hashedPassword
    })

    const accessToken = jwt.sign({
      username: user.userName,
      id: user._id,
    }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '3m' })

    const refreshToken = jwt.sign(
      { username: user.userName, id: user._id },
      process.env.REFRESH_TOKEN_SECRET_KEY
    )

    await Token.create({
      userId: user._id,
      refreshToken: refreshToken
    })

    res.status(200).json({ user, accessToken })

  } catch (error) {
    console.log(error)
  }
});

router.post('/signin', async (req,res) => {
  try {
    const {email,password} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({message: 'User not found !'})

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) return res.status(404).json({message: 'Check your login information and try again'})

    const accessToken = jwt.sign(
      {email: user.email, id: user._id},
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {expiresIn: '3m'}
      )

      const refreshToken = jwt.sign({email: user.email, id: user._id}, process.env.REFRESH_TOKEN_SECRET_KEY)

      await Token.findOneAndUpdate(
        {userId: user._id},
        {refreshToken: refreshToken},
        {new:true}
        )

        res.status(200).json({user,accessToken})

  } catch (error) {
    res.status(500).json({message: 'Bir şeyler ters gitti !'})
  }
})


router.get('/logout/:id', async (req,res)=> {
  try {
    const {id}= req.params
    await Token.findOneAndUpdate({
      userId: id
    }, {refreshToken: null}, {new:true})
    res.status(200).json({message:'Başarıyla çıkış yapıldı'})
  } catch (error) {
    res.status(500).json(error)
  }
})


export default router