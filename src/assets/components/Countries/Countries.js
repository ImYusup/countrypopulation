import React from 'react';
import './Countries.scss';
import CData from './Countries.json';
import {_initCountries, loadMoreCountries, sortAlphabetically, sortNumerically} from './CountriesUtils.js';
import CountryList from "../CountryList/CountryList";
import CountryDetails from "../CountryDetails/CountryDetails";

import {
  Route
} from "react-router-dom";

class Countries extends React.Component {
    
  loadMoreCountries = () => { loadMoreCountries(this) };

    constructor () {
        super();
 
        this.state = {
          "allCountries" : [],
          "visibleCountries": [],
          "countriesVisible": 6,
          "countryListError": false,
          "countrySortedAlph": true,
          "countriesNum" : false,

        buttons : [
              {
                "text" : "Sort A-Z",
                "callback" : () => sortAlphabetically(this)
              },
              {
                "text" : "Sort by Population",
                "callback" : () => sortNumerically(this)
              }
            ]
        }

      _initCountries(this);
    }

    render = () => {

      console.log(this.state.allCountries[0])

      return (
        <section className="countries">
        
         <Route path="/" exact>
          <CountryList
            data={CData}
            buttons={this.state.buttons}
            allCountries={this.state.allCountries}
            visibleCountries={this.state.visibleCountries}
            loadMoreCallback={this.loadMoreCountries}
          />
          </Route> 

        {this.state.allCountries.map ( (country,index) => { 
          return<Route path={"/"+country.alpha3Code} key={index}>
             <CountryDetails data={country} allCountries={this.state.allCountries}/>     
          </Route>      
        })}
                                               
        
        </section>
      )
    }
}

export default Countries;
