import React from 'react'
import { Box } from '@admin-bro/design-system'
import {BasePropertyProps} from "admin-bro"

const Edit: React.FC<BasePropertyProps> = (props) => { 
  const { record, property } = props

  var srcImg = null // record.params['profilePhotoLocation']

  if(record.params["coverPhoto"] && property.name == "uploadCover")srcImg = record.params["coverPhoto"]
  else if(record.params["imageUrl"] && property.name == "uploadImage")srcImg = record.params["imageUrl"]
  else if(record.params["image1"] && property.name == "uploadImage1")srcImg = record.params["image1"]
  else if(record.params["image2"] && property.name == "uploadImage2")srcImg = record.params["image2"]
  else if(record.params["image3"] && property.name == "uploadImage3")srcImg = record.params["image3"]
  else if(record.params["image4"] && property.name == "uploadImage4")srcImg = record.params["image4"]
  else if(record.params["image5"] && property.name == "uploadImage5")srcImg = record.params["image5"]

  return (
    <Box>
      {srcImg ? (
        <img src={srcImg} width="100px"/>
      ) : 'no image'}
    </Box>
  )
}

export default Edit