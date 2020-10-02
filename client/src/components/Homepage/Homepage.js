import React, {useState, useEffect} from 'react';
import World from '../World/World';
import Countries from '../Countries/Countries';
import './Homepage.css'
import api from '../../services/api';
import Map from '../Map/Map';

function Homepage(){

const [total, setTotal] = useState("");
const [recovered, setRecovered] = useState("");
const [deaths, setDeaths] = useState("");


useEffect(()=>{
    apiAccess();
}, []);


const apiAccess = async () => {
    try {
      const response = await api.get("/");
      const { confirmed, recovered, deaths } = response.data;
      setTotal(confirmed.value);
      setDeaths(deaths.value);
      setRecovered(recovered.value);
    } catch (err) {
      console.log("Error while accessing API Data:", err);
    }
  };

    return(
        <div className="main-block">
            <div className="left">
              <Map/>
            </div>
            <div className="right">
                <World 
                    total={total}
                    recovered={recovered}
                    deaths={deaths}
                />
                <Countries/>
            </div>
        </div>
    );
}

export default Homepage;