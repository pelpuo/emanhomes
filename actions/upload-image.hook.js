const path = require('path');
const fs = require('fs');
const AdminBro = require('admin-bro');


const after = async (response, request, context) => {
  const { record } = context;

    if(context.uploadImage){
      const filePath = path.join('uploads', record.id().toString(), context.uploadImage.name);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      await fs.promises.rename(context.uploadImage.path, filePath);
      
      await record.update({  uploadImage: `/${filePath}` });
    }
    if(context.uploadCover){
      const filePath = path.join('uploads', record.id().toString(), context.uploadCover.name);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      await fs.promises.rename(context.uploadCover.path, filePath);

      await record.update({  coverPhoto: `/${filePath}` });
    }
    if(context.uploadImage1){
      const filePath = path.join('uploads', record.id().toString(), context.uploadImage1.name);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      await fs.promises.rename(context.uploadImage1.path, filePath);

      await record.update({  image1: `/${filePath}` });
    }
    if(context.uploadImage2){
      const filePath = path.join('uploads', record.id().toString(), context.uploadImage2.name);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      await fs.promises.rename(context.uploadImage2.path, filePath);

      await record.update({  image2: `/${filePath}` });
    }
    if(context.uploadImage3){
      const filePath = path.join('uploads', record.id().toString(), context.uploadImage3.name);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      await fs.promises.rename(context.uploadImage3.path, filePath);

      await record.update({  image3: `/${filePath}` });
    }
    if(context.uploadImage4){
      const filePath = path.join('uploads', record.id().toString(), context.uploadImage4.name);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      await fs.promises.rename(context.uploadImage4.path, filePath);

      await record.update({  image4: `/${filePath}` });
    }
    if(context.uploadImage5){
      const filePath = path.join('uploads', record.id().toString(), context.uploadImage5.name);
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true });
  
      await fs.promises.rename(context.uploadImage5.path, filePath);

      await record.update({  image5: `/${filePath}` });
    }

  return response;
};


const before = async (request, context) => {
  if (request.method === 'post') {
    var uploadImage
    const { ...otherParams } = request.payload;

    var uploadImage = null;
    if(request.payload.uploadImage){
      uploadImage = request.payload.uploadImage
      delete otherParams.uploadImage
      context.uploadImage = uploadImage;
    }
    if(request.payload.uploadCover){
      uploadImage = request.payload.uploadCover
      delete otherParams.uploadCover
      context.uploadCover = uploadImage;
    }
    if(request.payload.uploadImage1){
      uploadImage = request.payload.uploadImage1
      delete otherParams.uploadImage1
      context.uploadImage1 = uploadImage;
    }
    if(request.payload.uploadImage2){
      uploadImage = request.payload.uploadImage2
      delete otherParams.uploadImage2
      context.uploadImage2 = uploadImage;
    }
    if(request.payload.uploadImage3){
      uploadImage = request.payload.uploadImage3
      delete otherParams.uploadImage3
      context.uploadImage3 = uploadImage;
    }
    if(request.payload.uploadImage4){
      uploadImage = request.payload.uploadImage4
      delete otherParams.uploadImage4
      context.uploadImage4 = uploadImage;
    }
    if(request.payload.uploadImage5){
      uploadImage = request.payload.uploadImage5
      delete otherParams.uploadImage5
      context.uploadImage5 = uploadImage  ;
    }
        
    // eslint-disable-next-line no-param-reassign
    // context.uploadImage = uploadImage;

    return {
      ...request,
      payload: otherParams,
    };
  }
  return request;
};

module.exports = { after, before };