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
      console.log('LOGGING PROFILE: ', profile, 'color:red')
      User.findOrCreate(
        {
          where: {stravaId: profile.id},
          defaults: {
            stravaId: profile.id,
            name: profile.fullName
          }
        },
        function(err, user) {
          return done(err, user)
        }
      )
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
