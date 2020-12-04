import { Card, CardContent, FormControl,MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map.js';
import Table from './Table';
import {sortData,prettyPrintStat} from './util.js';
import LineGraph from './LineGraph.js';
import "leaflet/dist/leaflet.css";
function App() {
  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState('worldwide');
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const [mapCenter,setMapCenter] = useState({lat:34.80746,lng:-40.4796});
  const [mapZoom,setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState("cases");
  




  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data);
    });
  },[])

  const onCountryChange = (e) =>{
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) =>{
      setCountry(countryCode);
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
    });
    
  };
  useEffect(() =>{
    //The code inside here will run once when the contenent loads
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries =data.map((country) =>({
          name:country.country,
          value:country.countryInfo.iso2
        }));
        const sortedData =sortData(data);
        setTableData(sortedData);
        setMapCountries(data);
        setCountries(countries);
      });
    };

    getCountriesData();
  } , []);





  return (
    <div className="app">
      <div className="appLeft">
            <div className="appHeader">
                <h1>Covid-19 Tracker</h1>
                <FormControl className="appDropdown">
                  <Select variant="outlined" onChange={onCountryChange} value={country}>
                    <MenuItem value="worldwide">Worldwide</MenuItem>
                    {
                    countries.map(country =>(
                    <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))
                    }
                  </Select>
                </FormControl>
            </div>
            <div className="appStats">
                    <InfoBox title="Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>
                    <InfoBox title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
                    <InfoBox title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>
            </div>

            <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
            />
      </div>
      <Card className="appRight">
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData}></Table>
              <h3>Worldwide new cases</h3>
              <LineGraph/>
            </CardContent>
      </Card>
    </div>
  );
}






export default App;
