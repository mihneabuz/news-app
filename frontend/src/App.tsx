import { useSelector } from 'react-redux';

import Topbar from './component/topbar';
import Register from './component/register';
import Login from './component/login';
import Browse from './component/browse';
import Write from './component/write';

function App() {
  const screen = useSelector((state: any) => state.screen.value);
  const user = useSelector((state: any) => state.user);

  let content = null;
  if (screen === "home") {
    content = (
      <div>
        {
          user.loggedIn 
          ? user.type === "reader"
            ? <Browse />
            : <Write />
          : null
        }
      </div>
    );
  } else if (screen === "register") {
    content = <Register />;
  } else if (screen === "login") {
    content = <Login />;
  } else if (screen === "browse") {
    content = <Browse />;
  }

  return (
    <div className="bg-sky-100 min-h-screen">
      <Topbar /> 
      {content}
    </div>
  );
}

export default App;
