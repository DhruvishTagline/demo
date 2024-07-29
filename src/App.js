import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './shared/Header';
// new code pushhhhhhh

function App() {
  return (
    <div>

      <div className='h-[50px] dark:bg-gray-800 border-b border-gray-400 fixed w-[100%] z-10'>
          <Header />
          <Outlet />
      </div>
    </div>
  );
}

export default App;
