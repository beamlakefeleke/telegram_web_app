
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function ImagePicker() {
  const [selectedImage, setSelectedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedImage(URL.createObjectURL(file));
    console.log(selectedImage);
    console.log("selectedImage");
    
    
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        <p>Drag and drop an image file here, or click to select one</p>
      </div>
      {selectedImage && (
        <div>
          <p>Selected Image File Path:</p>
          <p>{selectedImage}</p>
          <img src={selectedImage} alt="Selected" style={imageStyles} />
        </div>
      )}
    </div>
  );
}

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '200px',
};

export default ImagePicker;
