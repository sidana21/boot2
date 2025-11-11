import { useState } from "react";
import TappingButton from '../TappingButton';

export default function TappingButtonExample() {
  const [taps, setTaps] = useState(45);
  
  const handleTap = () => {
    console.log('Tap triggered!');
    setTaps(prev => Math.min(prev + 1, 100));
  };

  return (
    <TappingButton 
      currentTaps={taps} 
      maxTaps={100} 
      onTap={handleTap}
      earnedRTC={450}
      earnedUSDT={4.50}
    />
  );
}
