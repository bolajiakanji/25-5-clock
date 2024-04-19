import { useState } from "react";

import "./App.css";

function App() {
  const [sessionCount, setSessionCount] = useState(25);
  const [breakCount, setBreakCount] = useState(5);
  const [status, setStatus] = useState("sessio");
  const [timer, setTimer] = useState("25:00");

  function changeCount(a, b) {
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
        }
      }
    }
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
      <div id="start_stop"></div>
      <div id="reset"></div>
    </div>
  );
}

export default App;
