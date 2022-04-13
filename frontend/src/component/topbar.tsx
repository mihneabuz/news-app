import { useDispatch } from 'react-redux';
import { goHome, goRegister, goLogin } from '../state/screenSlice';

function Topbar() {
  const dispatch = useDispatch();

  return (
    <div className="bg-sky-500 h-12 flex justify-between items-center">
      <button onClick={() => dispatch(goHome())} className="text-3xl px-6 text-gray-800 decoration-sky-800 hover:underline">
        News App
      </button> 
      <span className="px-4">
        <button onClick={() => dispatch(goRegister())} className="text-xl px-3 py-0.5 mx-2 text-gray-900 bg-sky-300 hover:bg-sky-100 active:shadow rounded-xl">
          Register
        </button> 
        <button onClick={() => dispatch(goLogin())} className="text-xl px-3 py-0.5 mx-2 text-gray-900 bg-sky-300 hover:bg-sky-100 rounded-xl">
          Login
        </button> 
      </span>
    </div>
  );
}

export default Topbar;
