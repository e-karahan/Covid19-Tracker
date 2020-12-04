import {Circle,Popup} from "react-leaflet";
import numeral from "numeral";
import React from "react";

const casesTypeColors = {
    cases:{
        hex:"#CC1034",
        multipiler:300,
    },
    recovered:{
        hex:"#7dd71d",
        multipiler:1200,
    },
    deaths:{
        hex:"#fb4443",
        multipiler:2000,
    },
};

export const prettyPrintStat = (stat)=>
    stat ?  `+${numeral(stat).format("0.0a")}` : "+0";


export const sortData = (data) =>{
    const sortedData = [...data];
    sortedData.sort((a,b)=>{
        if (a.cases > b.cases){
            return -1;
        }else{
            return 1;
        }
    })
    return sortedData;
};

export const showDataOnMap = (data,casesType="cases") =>
    data.map((country) => (
        <Circle
        center = {[country.countryInfo.lat,country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].hex}
        fillColor={casesTypeColors[casesType].hex}
        radius={
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multipiler
        }

        >
        <Popup>
            <div className="infoContainer">
            <div className="infoFlag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}></div>
            <div className="infoName"> {country.country}  </div>
            <div className="infoConfirmed">Cases: {numeral(country.cases).format("0,0")}  </div>
            <div className="infoRecovered">Recovered: {numeral(country.recovered).format("0,0")}   </div>
            <div className="infoDeaths">Deaths: {numeral(country.deaths).format("0,0")}  </div>
            </div>
        </Popup>

        </Circle>
    ));
