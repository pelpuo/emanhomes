import React from 'react'
import { BasePropertyProps } from 'admin-bro'
import { Label, Box, DropZone, DropZoneProps, DropZoneItem } from "@admin-bro/design-system"

const Edit: React.FC<BasePropertyProps> = (props) => {
  const { property, onChange, record } = props

  const handleDropZoneChange: DropZoneProps['onChange'] = (files) => {
    onChange(property.name, files[0])
  }
  
  var uploadedPhoto = null //record.params.profilePhotoLocation

  if(record.params["coverPhoto"] && property.name == "uploadCover")uploadedPhoto = record.params["coverPhoto"]
  else if(record.params["imageUrl"] && property.name == "uploadImage")uploadedPhoto = record.params["imageUrl"]
  else if(record.params["image1"] && property.name == "uploadImage1")uploadedPhoto = record.params["image1"]
  else if(record.params["image2"] && property.name == "uploadImage2")uploadedPhoto = record.params["image2"]
  else if(record.params["image3"] && property.name == "uploadImage3")uploadedPhoto = record.params["image3"]
  else if(record.params["image4"] && property.name == "uploadImage4")uploadedPhoto = record.params["image4"]
  else if(record.params["image5"] && property.name == "uploadImage5")uploadedPhoto = record.params["image5"]

  const photoToUpload = record.params[property.name]

  return (
    <Box marginBottom="xxl">
      <Label>{property.label}</Label>
      <DropZone onChange={handleDropZoneChange}/>
      {uploadedPhoto && !photoToUpload && (
        <DropZoneItem src={uploadedPhoto} />
      )}
    </Box>
  )
}

export default Edit