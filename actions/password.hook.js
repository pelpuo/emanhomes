  
// const argon2 = require('argon2');
const bcrypt = require('bcrypt');
const AdminBro = require('admin-bro');


const after = async (response) => {
  if (response.record && response.record.errors) {
    response.record.errors.password = response.record.errors.encryptedPassword;
  }
  return response;
};

const before = async (request) => {
  if (request.method === 'post') {
    const { password, ...otherParams } = request.payload;
    const salt = await bcrypt.genSalt(10);
    if (password) {
      const encryptedPassword = await bcrypt.hash(password, salt);

      return {
        ...request,
        payload: {
          ...otherParams,
          encryptedPassword,
        },
      };
    }
  }
  return request;
};

module.exports = { after, before };
