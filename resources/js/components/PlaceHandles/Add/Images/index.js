import React, { useState } from 'react';
import MultiImageInput from 'react-multiple-image-input';
 
const Images = props => {
  const crop = {
    unit: '%',
    aspect: 4 / 4,
    width: '100'
  };
  
  return (
    <MultiImageInput
      images={props.images}
      setImages={props.setImages}
      cropConfig={{ crop, ruleOfThirds: true }}
      theme="light"
    />
  );
}
 
export default Images;