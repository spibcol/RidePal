const router = require('express').Router()
const {Bike} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const userBikes = await Bike.findAll({
      where: {
        userId: req.session.passport.user
      }
    })
    res.json(userBikes)
  } catch (err) {
    next(err)
  }
})
