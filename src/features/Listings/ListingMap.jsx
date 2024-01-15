import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function ListingMap({ listingData }) {
  return (
    <div className="listing-map">
      <MapContainer
        center={[
          listingData?.geolocation?.lattitude ?? 0,
          listingData?.geolocation?.longitude ?? 0,
        ]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[
            listingData?.geolocation?.lattitude ?? 0,
            listingData?.geolocation?.longitude ?? 0,
          ]}
        ></Marker>
      </MapContainer>
    </div>
  );
}
