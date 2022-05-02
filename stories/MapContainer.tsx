import React from "react";
import { MapContainer as LeafletMapContainer,MapContainerProps, TileLayer } from "react-leaflet";

const MapContainer: React.FC<MapContainerProps> = ({
   children,
   center = [55.796391, 49.108891],
   ...props
}) => (
    <div
        style={{
            height: 350
        }}
    >
        <LeafletMapContainer
            style={{
                width: '100%',
                height: '100%',
            }}
            center={center}
            {...props}
        >
            {children}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </LeafletMapContainer>
    </div>
);

export default MapContainer;