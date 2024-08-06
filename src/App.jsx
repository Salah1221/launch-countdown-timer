import { useState, useEffect } from "react";
import "./App.css";
import FlipCounter from "./FlipCounter";

function App() {
  const [currentTime, setCurrentTime] = useState({
    days: 8,
    hours: 23,
    minutes: 55,
    seconds: 41,
  });
  const [nextTime, setNextTime] = useState({
    days: 7,
    hours: 22,
    minutes: 54,
    seconds: 40,
  });
  const [isFlipped, setIsFlipped] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false,
  });
  const [tick, setTick] = useState(false);

  const decrementTimer = (days, hours, minutes, seconds) => {
    let flip = {
      days: false,
      hours: false,
      minutes: false,
      seconds: true,
    };
    seconds--;
    if (seconds < 0) {
      seconds = 59;
      minutes--;
      flip.minutes = true;
      if (minutes < 0) {
        minutes = 59;
        hours--;
        flip.hours = true;
        if (hours < 0) {
          hours = 23;
          flip.days = true;
          days--;
          if (days < 0) days = 0;
        }
      }
    }
    return [
      {
        days,
        hours,
        minutes,
        seconds,
      },
      flip,
    ];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => !t);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let [time, flip] = decrementTimer(
      nextTime.days,
      nextTime.hours,
      nextTime.minutes,
      nextTime.seconds
    );
    setIsFlipped(flip);
    setTimeout(() => {
      setCurrentTime({
        days: flip.days ? nextTime.days : currentTime.days,
        hours: flip.hours ? nextTime.hours : currentTime.hours,
        minutes: flip.minutes ? nextTime.minutes : currentTime.minutes,
        seconds: flip.seconds ? nextTime.seconds : currentTime.seconds,
      });
      setNextTime(time);
      setIsFlipped({
        days: false,
        hours: false,
        minutes: false,
        seconds: false,
      });
    }, 500);
  }, [tick]);

  return (
    <>
      <h1 className="uppercase_space">We&rsquo;re launching soon</h1>
      <div className="timer flex">
        <div className="unit grid just-items-center">
          <FlipCounter
            current={currentTime.days}
            next={nextTime.days}
            isFlipped={isFlipped.days}
          />
          <span className="uppercase_space">days</span>
        </div>
        <div className="unit grid just-items-center">
          <FlipCounter
            current={currentTime.hours}
            next={nextTime.hours}
            isFlipped={isFlipped.hours}
          />
          <span className="uppercase_space">hours</span>
        </div>
        <div className="unit grid just-items-center">
          <FlipCounter
            current={currentTime.minutes}
            next={nextTime.minutes}
            isFlipped={isFlipped.minutes}
          />
          <span className="uppercase_space">minutes</span>
        </div>
        <div className="unit grid just-items-center">
          <FlipCounter
            current={currentTime.seconds}
            next={nextTime.seconds}
            isFlipped={isFlipped.seconds}
          />
          <span className="uppercase_space">seconds</span>
        </div>
      </div>
    </>
  );
}

export default App;
