import { useState } from "react";

import "./App.css";

function App() {
  const [sessionCount, setSessionCount] = useState(25);
  const [breakCount, setBreakCount] = useState(5);
  const [status, setStatus] = useState("session");
  const [timer, setTimer] = useState("25:00");
  const [startStop, setStartStop] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  
  const [id, setId] = useState('');

  function changeCount(a, b) {
    if (!timerOn) {
      if (a === "session") {
        if (b === "increment") {
          setSessionCount(sessionCount + 1);
          status === "session"
            ? setTimer(() => {
                return sessionCount + 1 < 10
                  ? "0" + (sessionCount + 1) + ":00"
                  : sessionCount + 1 + ":00";
              })
            : "";
          status === "session" ? setStartStop((sessionCount + 1) * 60) : null;
        } else {
          if (sessionCount > 1) {
            setSessionCount(sessionCount - 1);
            status === "session"
              ? setTimer(() => {
                  return sessionCount - 1 < 10
                    ? "0" + (sessionCount - 1) + ":00"
                    : sessionCount - 1 + ":00";
                })
              : "";
            status === "session" ? setStartStop((sessionCount - 1) * 60) : null;
          }
        }
      } else {
        if (b === "increment") {
          setBreakCount(breakCount + 1);
          status !== "session"
            ? setTimer(() => {
                return breakCount + 1 < 10
                  ? "0" + (breakCount + 1) + ":00"
                  : breakCount + 1 + ":00";
              })
            : "";
          status !== "session" ? setStartStop((breakCount + 1) * 60) : null;
        } else {
          if (breakCount > 1) {
            setBreakCount(breakCount - 1);
            status !== "session"
              ? setTimer(() => {
                  return breakCount - 1 < 10
                    ? "0" + (breakCount - 1) + ":00"
                    : breakCount - 1 + ":00";
                })
              : "";
            status !== "session" ? setStartStop((breakCount - 1) * 60) : null;
          }
        }
        j;
      }
    } else return null;
  }
  let stop 
  stop = startStop 
      
  
  let timein = function () {
    
          stop--  
    
    if (stop === 0) {
      setTimer("00.00");
      if (status === "session") {
        setStatus("break");
        stop = breakCount * 60;
      } else {
        setStatus("session");
       stop = sessionCount * 60;
      }} else {
      let minutes = Math.floor(stop / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes; 
      let seconds = stop % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTimer(minutes + ":" + seconds)
      setStartStop(stop)
      
      
      
      
      
    }
    
    
  }
  
  function countDown() {
   
    if (!timerOn) {
      setTimerOn(true);
      
  
     
   setId((setInterval(timein, 1000)));
     console.log(id)

 } 
    else {
    setTimerOn(false);
        console.log('here')
        console.log(id)
        clearInterval(id);

    }
    }
    function reset() {
      clearInterval(id)
setSessionCount(25)      
setBreakCount(5)
      setStatus("session")
      setTimerOn(false)
      setTimer("25:00")
      setStartStop(1500)

    }

  return (
    <div id="container">
      <div id="break-label">Break Lenght</div>
      <div id="session-label">Session Length</div>
      <div
        id="break-decrement"
        onClick={() => changeCount("break", "decrement")}
      >
        a
      </div>
      <div
        id="session-decrement"
        onClick={() => changeCount("session", "decrement")}
      >
        b
      </div>
      <div
        id="break-increment"
        onClick={() => changeCount("break", "increment")}
      >
        c
      </div>
      <div
        id="session-increment"
        onClick={() => changeCount("session", "increment")}
      >
        d
      </div>
      <div id="break-length">{breakCount}</div>
      <div id="session-length">{sessionCount}</div>
      <div id="timer-label">fdf</div>
      <div id="time-left">{timer}</div>
      <div id="start_stop" onClick={countDown}>huge
      </div>
      <div id="reset" onClick={reset}>reset</div>
    </div>
  );
}

export default App;
