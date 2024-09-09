import React, { useRef } from 'react';
import styled from 'styled-components';
import imageReSize from '../assets/images/imageReSize.webp';

const HowToContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const HowToDetails = styled.div`
  flex: 6; 
`;

const HowToImage = styled.div`
  flex: 4; 
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto; 
  }
    margin-bottom: 40px;
    margin-top:50px;
`;

const HowTo = React.forwardRef((props, ref) => {
  return (
    <HowToContainer ref={ref}>
      <HowToDetails>
        <h2 style={{marginBottom: "10px"}}>How To Reduce Image Size?</h2>
        <p style={{fontSize:"10rem !important", fontWeight: "400"}}>
          One way is compressing the image, which reduces file size without having to resize it. Image quality will suffer as you increase compression and start losing more data.
        </p>
        <p style={{fontSize:"10rem !important", fontWeight: "bold !important"}}>
          Another method is to resize your photo, decreasing the pixels it takes to store the image. Reducing image size doesn't reduce image quality, although it may lose small details.
        </p>
        <p style={{fontSize:"10rem !important", fontWeight: "bold !important"}}>
            If you have a huge photo, we recommend resizing it to about 1900 by 1100 pixels, with JPG format and 90% quality. You will get a versatile image with great quality, that you can send to anyone without taking too much time.
        </p>
      </HowToDetails>
      <HowToImage>
        <img src={imageReSize} alt="Resized Example" />
      </HowToImage>
    </HowToContainer>
  );
});

export default HowTo;
