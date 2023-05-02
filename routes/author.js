const express= require('express')
const { ensureAuth } = require('../middlewares/authMW')
const router = express.Router()

const {Story,storySchema} = require('../models/Story')


router.get('/:userId',ensureAuth,(req,res)=>{
    const userId = req.params.userId
        Story.find({user:userId}).populate('user').then((foundStories)=>{
            res.render('author/profile',{stories:foundStories.filter(story=>story.status!=='private')})
        })
    
})


module.exports = router