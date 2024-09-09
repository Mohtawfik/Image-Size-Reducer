import React, { useRef } from 'react';
import './App.css';
import Header from './components/Header';
import ImageResizer from './components/ImageResizer';
import Footer from './components/Footer';
import HowTo from './components/HowTo';

function App() {
  const howToRef = useRef(null);

  const scrollToHowTo = () => {
    if (howToRef.current) {
      howToRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="App">
      <Header onScrollToHowTo={scrollToHowTo}/>
      <ImageResizer />
      <HowTo ref={howToRef}/>
      <Footer />
    </div>
  );
}

export default App;
