const AdminBro = require("admin-bro")
const House = require("./models/House")

const { after: uploadAfterHook,
    before: uploadBeforeHook,
    } = require('./actions/upload-image.hook');

const options = {
    properties: {
        coverPhoto: {
        isVisible: false,
        },
        image1: {
          isVisible: false,
        },
        image2: {
          isVisible: false,
        },
        image3: {
          isVisible: false,
        },
        image4: {
          isVisible: false,
        },
        image5: {
          isVisible: false,
        },
        uploadCover: {
        components: {
            edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
            list: AdminBro.bundle('./components/upload-image.list.tsx'),
        },
        },

        uploadImage1: {
          components: {
              edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
              list: AdminBro.bundle('./components/upload-image.list.tsx'),
          },
        },
        uploadImage2: {
          components: {
              edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
              list: AdminBro.bundle('./components/upload-image.list.tsx'),
          },
        },
        uploadImage3: {
          components: {
              edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
              list: AdminBro.bundle('./components/upload-image.list.tsx'),
          },
        },
        uploadImage4: {
          components: {
              edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
              list: AdminBro.bundle('./components/upload-image.list.tsx'),
          },
        },
        uploadImage5: {
          components: {
              edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
              list: AdminBro.bundle('./components/upload-image.list.tsx'),
          },
        },
    },
    actions: {
        new: {
          after: uploadAfterHook,
          before: uploadBeforeHook,
        },
        edit: {
          after: uploadAfterHook,
          before: uploadBeforeHook,
        },
      },
        show: {
        isVisible: false,
        },
};
      
      
module.exports = {
    options,
    resource: House
}