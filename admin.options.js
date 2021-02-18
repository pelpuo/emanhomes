const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('@admin-bro/mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

const UserAdmin = require("./user.admin")
const House = require("./house.house")
const User = require("./user.user")

const options = {
  resources: [UserAdmin, User, House],
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
  component: AdminBro.bundle('./components/dashboard.tsx')
  }
};

module.exports = options;
