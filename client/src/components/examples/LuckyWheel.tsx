import { useState } from 'react';
import LuckyWheel from '../LuckyWheel';

export default function LuckyWheelExample() {
  const [canSpin, setCanSpin] = useState(true);
  
  const handleSpin = (prize: number) => {
    console.log('Won prize:', prize, 'RTC');
    setCanSpin(false);
  };

  return (
    <LuckyWheel 
      onSpin={handleSpin}
      canSpin={canSpin}
    />
  );
}
