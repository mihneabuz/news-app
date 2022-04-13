import React from 'react';
import { useSelector } from 'react-redux';

import Topbar from './component/topbar';
import Register from './component/register';
import Login from './component/login';

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
    content = <Register />;
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
