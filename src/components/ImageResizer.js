import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const ResizerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom:20px
`;

const ImageBox = styled.div`
  width: 90%;
  padding: 20px;
  text-align: center;
  background-color: #e2f6ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  cursor: pointer;

  background-color: #E2F6FF;
  border-radius: 10px;

  &:hover {
    border-color: #007bff;
  }
`;

const ImagePreview = styled.img`
  max-width: 100px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const UploadIcon = styled.div`
  font-size: 70px;
  color: #007bff;
  margin-bottom: 10px;
`;

const UploadText = styled.p`
  color: #000000;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ResizerForm = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;

  input, select {
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100px;
  }
`;

const BrowseLink = styled.span`
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    color: #0056b3;
  }
`;

const SelectImageButton = styled.button`
  padding: 17px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  font-size: 1rem !important;
  font-weight: bold !important;
`;

const UploadButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 20px;

  padding: 17px 30px;
  cursor: pointer;
  font-size: 1rem !important;
  font-weight: bold !important;
`;

const DownloadButton = styled.a`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  text-decoration: none;
  cursor: pointer;
  font-size: 1rem !important;
  font-weight: bold !important;
`;

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [widthPercentage, setWidthPercentage] = useState(100);
  const [heightPercentage, setHeightPercentage] = useState(100);
  const [resizedImage, setResizedImage] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [format, setFormat] = useState('JPG');
  const [quality, setQuality] = useState(1.0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setImage(URL.createObjectURL(file));
      };
      img.src = URL.createObjectURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setImage(URL.createObjectURL(file));
      };
      img.src = URL.createObjectURL(file);
    } else {
      alert('Please upload a valid image file');
    }
  };

  const handleResize = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const newWidth = (originalWidth * widthPercentage) / 100;
    const newHeight = (originalHeight * heightPercentage) / 100;

    canvas.width = newWidth;
    canvas.height = newHeight;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      let mimeType = 'image/jpeg';
      if (format === 'PNG') mimeType = 'image/png';
      if (format === 'GIF') mimeType = 'image/gif';

      canvas.toBlob((blob) => {
        const resizedUrl = URL.createObjectURL(blob);
        setResizedImage(resizedUrl);
        setDownloadUrl(resizedUrl);
      }, mimeType, quality);
    };
    img.src = image;
  };

  return (
    <ResizerContainer>
      <h2>Resize an Image</h2>
      <ImageBox
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput').click()}
        style={{
          borderColor: dragActive ? '#007bff' : '#dc86eb',
        }}
      >
        <UploadIcon>
          <FontAwesomeIcon icon={faUpload} />
        </UploadIcon>
        <UploadText>
          Drop your images here or{' '}
          <BrowseLink>
            browse
          </BrowseLink>
        </UploadText>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
        {image && (
          <>
            <ImagePreview src={image} alt="Uploaded Image" />
            <p>Original: {originalWidth} x {originalHeight} pixels</p>
          </>
        )}
        <SelectImageButton>
          Select Image
        </SelectImageButton>
      </ImageBox>
      <ResizerForm>
        <h2>Choose new size and format</h2>
        <div>
          <label>Width (%)</label>
          <input
            type="number"
            value={widthPercentage}
            onChange={(e) => setWidthPercentage(e.target.value)}
          />
          <label>Height (%)</label>
          <input
            type="number"
            value={heightPercentage}
            onChange={(e) => setHeightPercentage(e.target.value)}
          />
        </div>
        <div>
          <label>Format</label>
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="JPG">JPG</option>
            <option value="PNG">PNG</option>
            <option value="GIF">GIF</option>
          </select>
        </div>
        {format === 'JPG' && (
          <div>
            <label>Quality (JPEG)</label>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            />
            <span>{quality}</span>
          </div>
        )}
        <UploadButton onClick={handleResize}>Resize Image</UploadButton>
      </ResizerForm>
      {resizedImage && (
        <>
          <h2 style={{ marginBottom: "20px" }}>Resized Image</h2>
          <ImagePreview src={resizedImage} alt="Resized Image" />
          <DownloadButton href={downloadUrl} download={`resized-image.${format.toLowerCase()}`}>
            Download Resized Image
          </DownloadButton>
        </>
      )}
    </ResizerContainer>
  );
};

export default ImageResizer;
