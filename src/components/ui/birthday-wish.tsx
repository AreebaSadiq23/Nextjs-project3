'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { FaBirthdayCake, FaGift } from 'react-icons/fa'
import { GiBalloons } from 'react-icons/gi'

type ConfettiProps = {
  width: number
  height: number
}

const DynamicConfetti = dynamic(() => import('react-confetti'), { ssr: false })

const candleColors = ['orchid', 'slategray', 'coral', 'orange', 'yellow','green']
const balloonColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8','#deb887']
const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']

export default function BirthdayWish() {

  const [candlesLit, setCandlesLit] = useState<number>(0)
  const [balloonsPoppedCount, setBalloonsPoppedCount] = useState<number>(0)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [windowSize, setWindowSize] = useState<ConfettiProps>({ width: 0, height: 0 })
  const [celebrating, setCelebrating] = useState<boolean>(false)
  const [cardColor, setCardColor] = useState('purple') // Initial background color
  const [countdown, setCountdown] = useState<number>(3) // Countdown in seconds
  const [countdownActive, setCountdownActive] = useState<boolean>(false)

  const totalCandles: number = 6
  const totalBalloons: number = 6

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (candlesLit === totalCandles && balloonsPoppedCount === totalBalloons) {
      setShowConfetti(true)
    }
  }, [candlesLit, balloonsPoppedCount])

  useEffect(() => {
    let countdownTimer: NodeJS.Timeout | null = null; // Initialize as null and with the correct type
  
    if (countdownActive) {
      if (countdown > 0) {
        countdownTimer = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        if (countdownTimer) clearInterval(countdownTimer);
        setCountdownActive(false);
        setCelebrating(true);
        setShowConfetti(true);
      }
    }
  
    return () => {
      if (countdownTimer) clearInterval(countdownTimer); // Ensure the timer is cleared when unmounted
    };
  }, [countdown, countdownActive]);
  
  const lightCandle = (index: number) => {
    if (index === candlesLit) {
      setCandlesLit(prev => prev + 1)
    }
  }

  const popBalloon = (index: number) => {
    if (index === balloonsPoppedCount) {
      setBalloonsPoppedCount(prev => prev + 1)
    }
  }

  const startCountdown = () => {
    setCountdown(3); // Reset countdown to 3 seconds
    setCountdownActive(true);
    setCelebrating(false);
    setShowConfetti(false);
  }

  const celebrate = () => {
    startCountdown();
  }

  const changeCardColor = () => {
    const colors = ['purple'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setCardColor(randomColor);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Countdown Display */}
        {countdownActive ? (
          <div className="text-center text-white text-3xl font-bold">
            <p>Get ready!</p>
            <p className="text-6xl">{countdown}</p>
          </div>
        ) : (
          <Card 
            className="mx-auto overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl border-2"
            style={{ backgroundColor: cardColor, borderColor: 'purple', maxWidth: '80%' }} // Adjust maxWidth as needed
            onClick={changeCardColor} 
          >
            {/* Card header with birthday message */}
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold text-pink-400">Happy Birthday!</CardTitle>
              <CardDescription className="text-2xl font-semibold text-blue-600">Areeba Sadiq</CardDescription>
              <p className="text-lg font-bold text-yellow-600">May 7</p>
            </CardHeader>
            {/* Card content with candles and balloons */}
            <CardContent className="space-y-6 text-center">
              {/* Candles section */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Light the candles:</h3>
                <div className="flex justify-center space-x-2">
                  {/* Map through candles */}
                  {[...Array(totalCandles)].map((_, index) => (
                    <AnimatePresence key={index}>
                      {/* Render lit or unlit candle based on state */}
                      {(celebrating && index <= candlesLit) || (!celebrating && index < candlesLit) ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          transition={{ duration: 0.5, delay: celebrating ? index * 0.5 : 0 }}
                        >
                          {/* Lit candle */}
                          <FaBirthdayCake
                            className={`w-8 h-8 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                            style={{ color: candleColors[index % candleColors.length] }}
                            onClick={() => lightCandle(index)}
                          />
                        </motion.div>
                      ) : (
                        // Unlit candle
                        <FaBirthdayCake
                          className={`w-8 h-8 text-gray-300 transition-colors duration-300 ease-in-out cursor-pointer hover:scale-110`}
                          onClick={() => lightCandle(index)}
                        />
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              </div>
              {/* Balloons section */}
              <div>
                <h3 className="text-lg font-semibold text-black mb-2">Pop the balloons:</h3>
                <div className="flex justify-center space-x-2">
                  {/* Map through balloons */}
                  {[...Array(totalBalloons)].map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 1 }}
                      animate={{ scale: index < balloonsPoppedCount ? 0 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Balloon icon */}
                      <GiBalloons
                        className={`w-8 h-8 cursor-pointer hover:scale-110`}
                        style={{ color: index < balloonsPoppedCount ? '#D1D5DB' : balloonColors[index % balloonColors.length] }}
                        onClick={() => popBalloon(index)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </CardContent>
            {/* Card footer with celebrate button */}
            <CardFooter className="flex justify-center">
              <Button 
                className="bg-black text-white hover:bg-pink-800 border:bg-pink transition-all duration-300"
                onClick={celebrate}
                disabled={celebrating || countdownActive}
              >
                Celebrate! <FaGift className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </motion.div>
      {/* Confetti component */}
      {showConfetti && (
        <DynamicConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          colors={confettiColors}
        />
      )}
    </div>
  )
}
