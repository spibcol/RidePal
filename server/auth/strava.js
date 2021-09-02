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
      callbackURL: process.env.STRAVA_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({stravaId: profile.id}, function(err, user) {
        return done(err, user)
      })
    }
  )
)

router.get('/', passport.authenticate('strava', {scope: 'profile:read_all'}))

router.get(
  '/callback',
  passport.authenticate('strava', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)
