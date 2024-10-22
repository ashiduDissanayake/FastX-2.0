import React, { useState } from 'react';
import axios from 'axios';

const ImageUploader = ({ setImagePath }) => {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Pass the image path back to the parent component
      setImagePath(res.data.filePath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="button" onClick={upload}>
        Upload
      </button>
    </div>
  );
};

export default ImageUploader;
