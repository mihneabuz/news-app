import React from 'react';
import { useSelector } from 'react-redux';

import Topbar from './component/topbar';
import store from './store';

function App() {
  const screen = useSelector((state: any) => state.screen.value);

  let content = null;
  if (screen === "home") {
    content = (
      <div className="grid place-items-center py-20">
        <h3 className="font-bold"> Hello World! </h3>
      </div>
    );
  } else if (screen === "register") {
    content = (
      <div className="grid place-items-center py-20">
        <h3 className="font-bold"> register </h3>
      </div>
    );
  } else if (screen === "login") {
    content = (
      <div className="grid place-items-center py-20">
        <h3 className="font-bold"> login </h3>
      </div>
    );
  }

  return (
    <div className="bg-sky-100 h-screen">
      <Topbar /> 
      {content}
    </div>
  );
}

export default App;
