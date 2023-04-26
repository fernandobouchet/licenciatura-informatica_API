import { Strategy, Profile } from 'passport-google-oauth20';
import { User, Users } from '../models';
import { PassportStatic } from 'passport';

const configurePassport = (passport: PassportStatic) => {
  passport.use(
    new Strategy(
      {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: '/api/auth/google/callback',
      },
      async (_accessToken, _refreshToken, profile: Profile, done) => {
        const newUser = {
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails ? profile.emails[0].value : ' ',
          avatar: profile.photos ? profile.photos[0].value : ' ',
        };

        try {
          let user = await Users.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await Users.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Users.findById(id)
      .then((user: User | null) => {
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch((err: NativeError) => done(err));
  });
};

export { configurePassport };
