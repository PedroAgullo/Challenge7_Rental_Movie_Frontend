
import React from 'react';
// import './SearchBar.css';
import {connect} from 'react-redux';



const SearchBar = () => {

    return (
        <div className="SearchDiv">
            Estamos en "buscar";
        </div>
    );
}
export default connect((state) => ({
    user: state.credentials.user,
    tipodatos: state.tipodatos
}))(SearchBar);