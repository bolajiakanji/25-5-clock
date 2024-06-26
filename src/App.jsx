import { useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { TiArrowDownThick } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";
import { PiPlayPauseFill } from "react-icons/pi";

import "./App.css";

function App() {
  const [sessionCount, setSessionCount] = useState(25);
  const [breakCount, setBreakCount] = useState(5);
  const [status, setStatus] = useState("Session");
  const [timer, setTimer] = useState("25:00");
  const [startStop, setStartStop] = useState(1500);
  const [timerOn, setTimerOn] = useState(false);
  const [indicator, setIndicator] = useState("white");

  const [id, setId] = useState("");

  function changeCount(a, b) {
    if (!timerOn) {
      if (a === "session") {
        if (b === "increment" && sessionCount < 60) {
          setSessionCount(sessionCount + 1);
          status === "Session"
            ? setTimer(() => {
                return sessionCount + 1 < 10
                  ? "0" + (sessionCount + 1) + ":00"
                  : sessionCount + 1 + ":00";
              })
            : "";
          status === "Session" ? setStartStop((sessionCount + 1) * 60) : null;
        } else if (b === "decrement") {
          if (sessionCount > 1) {
            setSessionCount(sessionCount - 1);
            status === "Session"
              ? setTimer(() => {
                  return sessionCount - 1 < 10
                    ? "0" + (sessionCount - 1) + ":00"
                    : sessionCount - 1 + ":00";
                })
              : "";
            status === "Session" ? setStartStop((sessionCount - 1) * 60) : null;
          }
        }
      } else {
        if (b === "increment" && breakCount < 60) {
          setBreakCount(breakCount + 1);
          status !== "Session"
            ? setTimer(() => {
                return breakCount + 1 < 10
                  ? "0" + (breakCount + 1) + ":00"
                  : breakCount + 1 + ":00";
              })
            : "";
          status !== "Session" ? setStartStop((breakCount + 1) * 60) : null;
        } else if (b === "decrement") {
          if (breakCount > 1) {
            setBreakCount(breakCount - 1);
            status !== "Session"
              ? setTimer(() => {
                  return breakCount - 1 < 10
                    ? "0" + (breakCount - 1) + ":00"
                    : breakCount - 1 + ":00";
                })
              : "";
            status !== "Session" ? setStartStop((breakCount - 1) * 60) : "";
          }
        }
      }
    } else return "";
  }
  let stop;
  stop = startStop;
  let statusChange = false;

  let timein = function () {
    stop--;

    if (stop === 0) {
      setTimer("00.00");
      if (!statusChange) {
        setStatus("Break");
        stop = breakCount * 60;
        stop++;
        statusChange = true;
      } else {
        setStatus("Session");
        stop = sessionCount * 60;
        stop++;
        statusChange = false;
      }
      let sound = document.getElementById("beep");
      sound.play();
    } else {
      if (stop < 60) {
        setIndicator("red");
      } else {
        setIndicator("white");
      }

      let minutes = Math.floor(stop / 60);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = stop % 60;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      setTimer(minutes + ":" + seconds);
      setStartStop(stop);
    }
  };

  function count() {
    if (!timerOn) {
      setTimerOn(true);

      setId(setInterval(timein, 1000));
    } else {
      setTimerOn(false);

      clearInterval(id);
    }
  }
  function reset() {
    clearInterval(id);
    setSessionCount(25);
    setBreakCount(5);
    setStatus("Session");
    setTimerOn(false);
    setTimer("25:00");
    setStartStop(1500);
    setIndicator("white");
    let sound = document.getElementById("beep");
    sound.pause();
    sound.currentTime = 0;
  }

  return (
    <div id="container">
      <div id="title">25 + 5 Clock</div>
      <div id="length">
        <div id="break">
          <div id="break-label">Break Lenght</div>
          <div id="break-details">
            <div
              className="count-change"
              id="break-decrement"
              onClick={() => changeCount("break", "decrement")}
            >
              <TiArrowDownThick />
            </div>
            <div id="break-length">{breakCount}</div>
            <div
              className="count-change"
              id="break-increment"
              onClick={() => changeCount("break", "increment")}
            >
              <TiArrowUpThick />
            </div>
          </div>
        </div>
        <div id="session">
          <div id="session-label">Session Length</div>
          <div id="break-details">
            <div
              className="count-change"
              id="session-decrement"
              onClick={() => changeCount("session", "decrement")}
            >
              <TiArrowDownThick />
            </div>
            <div id="session-length">{sessionCount}</div>

            <div
              className="count-change"
              id="session-increment"
              onClick={() => changeCount("session", "increment")}
            >
              <TiArrowUpThick />
            </div>
          </div>
        </div>
      </div>
      <div id="countdown-box">
        <div id="count-down" style={{ color: [indicator] }}>
          <div id="timer-label">{status}</div>
          <div id="time-left">{timer}</div>
          <audio
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            id="beep"
          ></audio>
        </div>
      </div>
      <div id="controlS">
        <div id="start_stop" onClick={count}>
          <PiPlayPauseFill />
        </div>

        <div id="reset" onClick={reset}>
          <LuRefreshCw />
        </div>
      </div>
      <p className="coder">Coded by Dev Bolaji</p>
    </div>
  );
}

export default App;
