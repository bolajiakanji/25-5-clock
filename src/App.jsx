import { useState } from "react";

import "./App.css";

function App() {
  const [sessionCount, setSessionCount] = useState(25);
  const [breakCount, setBreakCount] = useState(5);
  const [status, setStatus] = useState("session");
  const [timer, setTimer] = useState("25:00");
  const [startStop, setStartStop] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [indicator, setIndicator] = useState("black");


  const [id, setId] = useState("");

  function changeCount(a, b) {
    if (!timerOn) {
      if (a === "session") {
        if (b === "increment" && sessionCount < 60) {
          setSessionCount(sessionCount + 1);
          status === "session"
            ? setTimer(() => {
                return sessionCount + 1 < 10
                  ? "0" + (sessionCount + 1) + ":00"
                  : sessionCount + 1 + ":00";
              })
            : "";
          status === "session" ? setStartStop((sessionCount + 1) * 60) : null;
        } else if (b === "decrement") {
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
        if (b === "increment" && breakCount < 60) {
          
          setBreakCount(breakCount + 1);
          status !== "session"
            ? setTimer(() => {
                return breakCount + 1 < 10
                  ? "0" + (breakCount + 1) + ":00"
                  : breakCount + 1 + ":00";
              })
            : "";
          status !== "session" ? setStartStop((breakCount + 1) * 60) : null;
        } else if (b === "decrement"){
          if (breakCount > 1) {
            setBreakCount(breakCount - 1);
            status !== "session"
              ? setTimer(() => {
                  return breakCount - 1 < 10
                    ? "0" + (breakCount - 1) + ":00"
                    : breakCount - 1 + ":00";
                })
              : "";
            status !== "session" ? setStartStop((breakCount - 1) * 60) : "";
          }
        }
      }
    } else return "";
  }
  let stop;
  stop = startStop;
  let statusChange = false

  let timein = function () {
    stop--;

          if (stop === 0){
      setTimer("00.00");
      if (!statusChange) {
        setStatus("break");
        stop = breakCount * 60;
        stop++
        statusChange = true
      } else {
        setStatus("session");
        stop = sessionCount * 60;
        stop++
        statusChange = false
      }
    } else {
      if (stop < 60 ) {
        setIndicator('red')
      } else {
        setIndicator("black")
      }
  
      let minutes = Math.floor(stop / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = stop % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTimer(minutes + ":" + seconds);
      setStartStop(stop);
    }
  };

  function countDown() {
    if (!timerOn) {
      setTimerOn(true);

      setId(setInterval(timein, 1000));
      console.log(id);
    } else {
      setTimerOn(false);
      console.log("here");
      console.log(id);
      clearInterval(id);
    }
  }
  function reset() {
    clearInterval(id);
    setSessionCount(25);
    setBreakCount(5);
    setStatus("session");
    setTimerOn(false);
    setTimer("25:00");
    setStartStop(1500);
    setIndicator("black")
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
      <div style={{color : [indicator]}}>
      <div id="timer-label">{status}</div>
      <div id="time-left">{timer}</div>
      </div>
      <div id="start_stop" onClick={countDown}>
        huge
      </div>
      <div id="reset" onClick={reset}>
        reset
      </div>
    </div>
  );
}

export default App;
