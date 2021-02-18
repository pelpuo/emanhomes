const User = require("./models/User")
const bcrypt = require("bcrypt")
const LocalStrategy = require("passport-local")

module.exports = function(passport){
    // Local Strategy
    passport.use(new LocalStrategy(
        async (username, password, done) => {
          const user = await User.find({email: username})
            if (!user) { 
                return done(null, false);
            }
    
            const passwordValid = await bcrypt.compare(password, user[0].encryptedPassword)
            if (!passwordValid) { 
                return done(null, false); 
            }
            return done(null, user);
        }
      ));
    
    passport.serializeUser((user, done)=>{
        done(null, user[0].id);
    })
    
    passport.deserializeUser(async (id, done) => {
        const user = await User.find({_id:id});
        if(user)return done(null, user[0]);
        else return done("Failed to deserialize user", user)
    })
  }