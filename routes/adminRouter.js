const argon2 = require("argon2")
const { buildAuthenticatedRouter } = require('@admin-bro/express');
const Admin = require("./../models/Admin")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)


const buildAdminRouter = (admin) => {
  const router = buildAuthenticatedRouter(admin, {
    cookieName: 'admin-bro',
    cookiePassword: 'superlongandcomplicatedname',
    authenticate: async (email, password) => {
      const admin = await Admin.findOne({ email });

      if (admin && await argon2.verify(admin.encryptedPassword, password)) {
        return admin.toJSON();
      }
      return null;
    },
  }, null, {
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  });
  return router;
};

module.exports = buildAdminRouter;