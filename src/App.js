import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';


function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar/>

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" exact component={Login}/>
              {/* <Route path="/profile" exact component={Profile}/> */}
              <Route path="/register" exact component={Register}/>
            </Switch>

        
      </BrowserRouter>

    </div>
  );
}

export default App;
