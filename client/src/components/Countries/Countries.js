import React, { useState } from 'react';
import countriesNewData from '../../utils/countries';
import axios from 'axios';
import './Countries.css';
import { Dropdown } from 'semantic-ui-react';

function Countries({total}){

    const [countryTotal, setCountryTotal] = useState('');
    const [countryRecovered, setCountryRecovered] = useState('');
    const [countryDeaths, setCountryDeaths] = useState('');
    const [countryName, setCountryName] = useState('');
    // const [countries, setCountries] = ([
    //   {name:'',
    //   total:'',
    //   recovered:'',
    //   deaths:''}
    // ]);

    const countrySelectApi = async (country) => {

        try{
          const response = await axios.get(`https://covid19.mathdro.id/api/countries/${country}`);
          const { data } = response;
          setCountryTotal(data.confirmed.value);
          setCountryRecovered(data.recovered.value);
          setCountryDeaths(data.deaths.value);
        } catch(err){
          console.log('Error while accessing a specific country', err)
        }
      }
      // const onAdd =() =>{
      //   setCountries([
      //     ...countries, [
      //       {name:countryName, 
      //       total:countryTotal, 
      //       recovered:countryRecovered, 
      //       deaths: countryDeaths}]
      //   ]);
      // }
      const handleChange = (e, result) => {
        e.preventDefault();
        const { value } = result || e.target;
        countrySelectApi(value)
        setCountryName(value);
        console.log(value);
      }

    return(
        <div>
            <form>
                <label>Countries</label>
                  <Dropdown
                    className='dropdown-box'
                    placeholder='Select Country'
                    onChange={handleChange}
                    search
                    fluid
                    selection 
                    button={true}
                    options={countriesNewData.map( (country) => ( {key: country.iso2, value: country.name, flag: country.iso2, text: country.name }))}
                  />
            </form>
            {/* <div className="country-container">
            <ul>
                {countries.map(country => (
                    <Country 
                        countries={countries}/>
                ))}
            </ul>
        </div> */}

        <div className="country-card">
      <h4>{countryName}</h4>
        <div className="inner-items">
        <div className="item recovered">
          <h3>
            Recovered
          </h3>
          <h4>
            {
              (countryTotal) ? parseInt(countryRecovered): 0
            }
            
          </h4>
         
        </div>
        <div className="item deaths">
          <h3 >
            Deaths
          </h3>
          <h4>
            {
              (countryTotal) ?
              parseInt(countryDeaths) : 0
              }
          </h4>
          
        </div>

        <div className="item total">
          <h3>
            Total
          </h3>
          <h4>
            {
              (countryTotal) ?
            parseInt(countryTotal) :
              0
              }
          </h4>
          </div>
        </div>
      </div>
    </div>
    );
}

export default Countries;