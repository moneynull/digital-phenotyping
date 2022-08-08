import logo from './assets/senpsi_logo.png';
import './App.css';
import { Link,Navigate} from 'react-router-dom'; 

function App() {
  let token = sessionStorage.getItem("userInfo")
  
  return (
    <div className='App'>
      {token ? <Navigate to='/homepage' />: <Navigate to='/loginpage' />}
    </div>
  );
}

export default App;
