import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './shared/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <div className='h-[50px] dark:bg-gray-800 border-b border-gray-400 fixed w-[100%] z-10'>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
          <Header />
          <Outlet />
      </div>
    </div>
  );
}

export default App;
