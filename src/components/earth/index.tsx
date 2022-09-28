import { useEffect, useState } from "react";
import Globe from 'react-globe.gl';

import './globe.scss';

export const Earth = () => {

  const GlobeImg = require('../../assets/files/earth-night.jpg')
  //const GlobeImg = require('../../assets/files/earth.jpg')
  const back = require('../../assets/files/night-sky.png')
  const Places = require('../../store/earth/places.json')
  const [places, setPlaces] = useState([])

  useEffect(() =>{
    if(Places){
      setPlaces(Places.features)
    }
  },[Places])
  
  return (
    <div className="container_globe">
      <Globe
        globeImageUrl={GlobeImg}
        backgroundImageUrl={back}

        labelsData={places}
        labelLat={(d: any) => d.properties.latitude}
        labelLng={(d: any) => d.properties.longitude}
        labelText={(d: any) => d.properties.name}
        labelSize={(d: any) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelDotRadius={(d: any) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelColor={() => 'rgba(13, 228, 228, 0.6)'}
        labelResolution={2}
      />
    </div>
  )
}