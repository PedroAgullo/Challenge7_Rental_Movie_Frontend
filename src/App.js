import './App.scss';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Login from './containers/Login/Login';
import Home from './containers/Home/Home';
import Register from './containers/Register/Register';
import Profile from './containers/Profile/Profile';
import Movie from './containers/Movie/Movie';
import Search from './containers/Search/Search';
import Infantil from './containers/Infantil/Infantil';
import SelectProfile from './containers/SelectProfile/SelectProfile';


function App() {
  return (
    <div>
      <BrowserRouter>

        <Navbar/>

            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/profile" exact component={Profile}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/movie" exact component={Movie}/>
              <Route path="/search" exact component={Search}/>
              <Route path="/infantil" exact component={Infantil}/>
              <Route path="/select" exact component={SelectProfile}/>
            </Switch>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
