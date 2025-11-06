import React, { useState, useRef } from "react";
import Globe from "react-globe.gl";

// Interfaz para la información que se va a mostrar
interface RegionInfo {
  lat: number;
  lng: number;
  region: string;
  info: string;
}

const GlobeComponent: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const globeRef = useRef<any>(null);

  // Datos de las regiones con información básica
  const regions: RegionInfo[] = [
    { lat: 4.570868, lng: -74.297333, region: 'Colombia', info: 'Capital: Bogotá' },
    { lat: 51.1657, lng: 10.4515, region: 'Alemania', info: 'Capital: Berlín' },
    { lat: -23.5505, lng: -46.6333, region: 'Brasil', info: 'Capital: Brasília' },
    // Puedes agregar más países si lo deseas
  ];

  // Manejo del clic en las regiones
  const handleRegionClick = (region: string) => {
    setSelectedRegion(region);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        arcsData={regions}
        arcColor="color"
        arcDashLength={0.4}
        arcStroke={0.5}
        onArcClick={(arc: any) => handleRegionClick(arc.region)}
        showGraticules={true}
        showGlobe={true}
      />
      {selectedRegion && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          padding: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          borderRadius: '5px',
        }}>
          <h3>Información de la región seleccionada:</h3>
          <p><strong>{selectedRegion}</strong></p>
          <p>{regions.find(region => region.region === selectedRegion)?.info}</p>
        </div>
      )}
    </div>
  );
};

export default GlobeComponent;