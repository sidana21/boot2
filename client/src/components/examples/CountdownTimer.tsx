import CountdownTimer from '../CountdownTimer';

export default function CountdownTimerExample() {
  return (
    <CountdownTimer 
      onComplete={() => console.log('Timer completed!')}
    />
  );
}
