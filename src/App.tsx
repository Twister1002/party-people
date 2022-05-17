import { useState } from "react";
import Schedule from "./components/Schedule";

import "./styles/css/app.min.css";
import "./styles/css/setday.min.css";

function App() {
  const [setDay, setSetDay] = useState<number>(1);
  const [showFriendsOnly, setShowFriendsOnly] = useState<boolean>(false);
  
  return (
    <div className="app">
      <header id="set-days">
        <ul>
          <li 
            className={`clickable ${setDay === 1 ? "active": "non-active"}`} 
            onClick={() => setSetDay(1)}
          >
              May 20 (Friday)
          </li>
          <li 
            className={`clickable ${setDay === 2 ? "active": "non-active"}`} 
            onClick={() => setSetDay(2)}
          >
              May 21 (Saturday)
          </li>
          <li 
            className={`clickable ${setDay === 3 ? "active": "non-active"}`} 
            onClick={() => setSetDay(3)}
          >
              May 22 (Sunday)
          </li>
          <li
            className={`clickable ${showFriendsOnly ? "active": "non-active"}`} 
            onClick={() => setShowFriendsOnly(!showFriendsOnly)}
          >
            Friends Only
          </li>
        </ul>
        
      </header>
      <Schedule 
        showFriendsOnly={showFriendsOnly}
        setDay={setDay}
      />
      <div id="modal"></div>
    </div>
  );
}

export default App;
