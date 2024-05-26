const express = require('express')
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async function(accessToken, refreshToken, profile, done) {
    
    const newUser = {
      googleID: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      profileImage: profile.photos[0].value
    }

    try {
      let user = await User.findOne({ googleId: profile.id });
      if(user){
        done(null, user);
      }
      else{
        user = await User.create(newUser);
        done(null, user);
      }
    } catch (error) {
      console.log(error);
      
    }

  }
));

router.route('/auth/google').get(
  passport.authenticate('google', { scope: ['email', 'profile'] }));

router.route('/google/callback').get(
  passport.authenticate('google', { 
        failureRedirect: '/login-failure',
        successRedirect: '/dashboard'
    })
  );

// Route if something goes wrong
router.route('/login-failure').get((req, res) => {
  res.send('Something goes wrong...')
})

// Persist user data after successful authentication
passport.serializeUser((user, done) => {
  done(null, user.id);
})

// Destroy user session
router.route('/logout', (req, res) => {
  req.session.destroy(error => {
    if(error){
      console.log(error);
      res.send('Error loggin out')
    }
    else{
      res.redirect('/')
    }
  })
})


// Retrieve user data from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
})


module.exports = router;
