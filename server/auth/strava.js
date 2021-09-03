const passport = require('passport')
const router = require('express').Router()
const StravaStrategy = require('@riderize/passport-strava-oauth2').Strategy
const {User} = require('../db/models')
module.exports = router

passport.use(
  new StravaStrategy(
    {
      clientID: process.env.STRAVA_CLIENT_ID,
      clientSecret: process.env.STRAVA_CLIENT_SECRET,
      callbackURL: '/auth/strava/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('LOGGING PROFILE: ', profile)

      const stravaId = profile.id
      const fullName = profile.fullName

      User.findOrCreate({
        where: {stravaId},
        defaults: {
          stravaId,
          fullName
        }
      })
        .then(([user]) => done(null, user))
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
