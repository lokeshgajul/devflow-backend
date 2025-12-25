import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import { dbConnect } from "../db/Db.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // await dbConnect();

        let user = await User.findOne(
          { googleId: profile.id }
          //   { loginStatus: true }
        );
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            authProvider: "google",
            googleId: profile.id,
            avatar: profile.photos[0].value,
          });
        }

        return cb(null, user);
      } catch (error) {
        return cb(error, null);
      }
    }
  )
);
