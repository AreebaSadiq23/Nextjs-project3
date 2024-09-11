// components/ConfettiEffect.js
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiEffect = () => {
  useEffect(() => {
    // Trigger confetti effect on component mount
    const launchConfetti = () => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    };

    // Launch confetti effect after 1 second
    const timer = setTimeout(() => {
      launchConfetti();
    }, 1000);

    // Cleanup on component unmount
    return () => clearTimeout(timer);
  }, []);

  return null; // This component does not need to render anything
};

export default ConfettiEffect;
