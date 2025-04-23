import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import 'leaflet-gpx';
import './assets/App.css';

interface AppProps {
  gpxFile: File | null; // GPX file passed as a prop from Main.tsx
}

function App({ gpxFile }: AppProps): JSX.Element {
  const mapRef = useRef<L.Map | null>(null);
  const gpxLayerRef = useRef<L.GPX | null>(null);

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([51.505, -0.09], 13);
      
      // Fix broken image URLs
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: markerIconPng,
        iconUrl: markerIconPng,
        shadowUrl: '',
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
      }).addTo(mapRef.current);
    }

    // Clean up previous GPX layer
    if (gpxLayerRef.current) {
      mapRef.current?.removeLayer(gpxLayerRef.current);
      gpxLayerRef.current = null;
    }

    // Load new GPX file if provided
    if (gpxFile && mapRef.current) {
      const fileURL = URL.createObjectURL(gpxFile);
      const options = {
        async: true,
        polyline_options: { color: 'blue' },
      };

      gpxLayerRef.current = new L.GPX(fileURL, options)
        .on('loaded', (e) => {
          const track = e.target;
          mapRef.current?.fitBounds(track.getBounds());
          
          // Update your DOM elements here
          // (Keep your existing DOM update code)
        })
        .addTo(mapRef.current);
    }

    return () => {
      // Cleanup GPX layer on unmount
      if (gpxLayerRef.current) {
        mapRef.current?.removeLayer(gpxLayerRef.current);
      }
    };
  }, [gpxFile]);
  return (
    <>
      <div id='GpxName' className="name justify-left ml-12 text-8xl"></div>
      <div className="flex justify-center items-center mb-4">
        <div className="flex flex-wrap w-4/5 h-96 text-white text-lg border-solid border-2 border-white gap-4">
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="starttime">Failed to Load, Please Reload</div>
          </div>
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="endtime">Failed to Load, Please Reload</div>
          </div>
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="totaltime">Failed to Load, Please Reload</div>
          </div>
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="movingtime">Failed to Load, Please Reload</div>
          </div>
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="averagecadence">Failed to Load, Please Reload</div>
          </div>
          <div className="fflex-auto items-center justify-center border-2 border-white p-2">
            <div id="distance">Failed to Load, Please Reload</div>
          </div>
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="averagehr">Failed to Load, Please Reload</div>
          </div>
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="movingpace">Failed to Load, Please Reload</div>
          </div>
          <div className="flex-auto items-center justify-center border-2 border-white p-2">
            <div id="elevationgain">Failed to Load, Please Reload</div>
          </div>
        </div>
      </div>


      <div className="flex justify-center items-center">
        <div id="map" className="w-4/5 min-h-[630px] h-3/5"></div>
      </div>

    </>
  );
}

export default App;
