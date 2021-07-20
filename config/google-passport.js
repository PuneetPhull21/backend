const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = '66777002200-vnh2nt3oiv607olg4018q1vog3elsrpk.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET='zeZq4zLKtnnqKkAPadQ6CELH';

passport.serializeUser(function(user,cb){
    cb(null,user)
})

passport.deserializeUser(function(user,cb){
    cb(null,user)

})

passport.use( new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:3000/auth/google/callback',
    passReqTocallback:true,
},function(accessToken,refreshToken,profile,done){
    return done(null,profile);
}))





