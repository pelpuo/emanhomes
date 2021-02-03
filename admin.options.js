const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const UserAdmin = require("./user.admin")
const House = require("./house.house")

const options = {
  resources: [UserAdmin, House],
};

module.exports = options;
