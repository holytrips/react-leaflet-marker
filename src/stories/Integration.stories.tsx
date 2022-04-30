import React from 'react';

import 'leaflet/dist/leaflet.css';

import MarkerLayer from "../MarkerLayer";
import Marker, {EPlacement, IMarkerProps} from "../Marker";
import MapContainer from "./MapContainer";

import markerIcon  from 'leaflet/dist/images/marker-icon-2x.png'

export default {
    title: 'Integration with Leaflet',
    args: {
        interactive: true,
        placement: EPlacement.top,
        size: [25, 41]
    },
    argTypes: {
        interactive: {
            control: { type: 'boolean' },
        },
        placement: {
            options: EPlacement,
            control: {
                type: 'select',
            },
        },
        size: {
            control: {
                type: 'object',
            },
        },
    },
};

export const OneMarker = (props: IMarkerProps) => (
    <MapContainer
        zoom={10}
    >
        <MarkerLayer>
            <Marker
                {...props}
                position={[55.796391, 49.108891]}
            >
                <img alt="Example image" width={25} height={41} src={markerIcon} />
            </Marker>
        </MarkerLayer>
    </MapContainer>
);

export const MultipleMarkers = (props: IMarkerProps) => (
    <MapContainer
        zoom={8}
    >
        <MarkerLayer>
            <Marker {...props} position={{lat: 55.796391, lng: 49.108891}}>
                <img alt="Example image" width={25} height={41} src={markerIcon} />
            </Marker>
            <Marker {...props} position={{lat: 55.39939114358245, lng: 49.54559326171876}}>
                <img alt="Example image" width={25} height={41} src={markerIcon} />
            </Marker>
            <Marker {...props} position={{lat: 55.84294011297764, lng: 48.52798461914063}}>
                <img alt="Example image" width={25} height={41} src={markerIcon} />
            </Marker>
        </MarkerLayer>
    </MapContainer>
);