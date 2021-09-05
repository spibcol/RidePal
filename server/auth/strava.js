const passport = require('passport')
const router = require('express').Router()
const StravaStrategy = require('@riderize/passport-strava-oauth2').Strategy
const {User, Bike} = require('../db/models')
module.exports = router

passport.use(
  new StravaStrategy(
    {
      clientID: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      callbackURL: '/auth/strava/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      const bikes = profile._json.bikes

      console.log('LOGGING bikes: ', bikes)

      const stravaId = profile.id
      const name = profile.fullName

      User.findOrCreate({
        where: {stravaId},
        defaults: {
          stravaId,
          name
        }
      })
        .then(([user]) => {
          bikes.map(async bike => {
            await Bike.upsert({
              userId: user.id,
              name: bike.name,
              miles: bike.converted_distance
            })
          })
          return done(null, user)
        })
        .catch(done)
    }
  )
)

router.get(
  '/',
  passport.authenticate('strava', {scope: 'read,profile:read_all'})
)

router.get(
  '/callback',
  passport.authenticate('strava', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)
