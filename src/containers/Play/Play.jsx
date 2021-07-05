import React from 'react';
import { connect } from 'react-redux';


const Play = (props) => {


    

    return (

        <div className="playDiv"> 

                <div className="boxMovie">
                    <iframe width="1920" height="1080" src={props.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>         

        </div>
    );
}

export default connect((state) => ({
    credentials:state.credentials, 
    movie:state.movie,
    trailer: state.trailer
    }))(Play);