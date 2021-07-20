const passport = require("passport");
const localpassport = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const db = require("../model/index");

const registered_recruiter = db.register_recruiter_model;
const register_employee_model = db.register_employee_model;

passport.use("local-recuriter",
  new localpassport(
    { usernameField: "email" },
    async (email, password, done) => {
      const user = await registered_recruiter.findOne(
        { where: { email: email } },-
        function (err, user) {
          if (err) return done(err);
        }
      );
      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }
      const result = user;
      const value = bcrypt.compareSync(password, result.password);
      if (value === true) {
        return done(null, user);
      } else {
        return done(null, false, { message: "password is wronng" });
      }
    }
  )
);
