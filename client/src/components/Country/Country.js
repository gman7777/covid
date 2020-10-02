import React from 'react';
import './Country.css';

function Country({countries}){

    return(
        <div className="country-card">
            <h4>{countries.name}</h4>
            <div className="inner-items">
                <div className="item recovered">
                    <p>Recovered</p>
                    <h4>{countries.recovered}</h4>
                </div>
                <div className="item deaths">
                    <p>Deaths</p>
                    <h4>{countries.deaths}</h4>
                </div>
                <div className="item total">
                    <p>Tota</p>
                    <h4>{countries.total}</h4>
                </div>
            </div>
        </div>
    );
}

export default Country;