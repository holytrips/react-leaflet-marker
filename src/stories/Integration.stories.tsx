import React from 'react';

import 'leaflet/dist/leaflet.css';

import MarkerLayer from "../MarkerLayer";
import Marker, { EPlacement, IMarkerProps } from "../Marker";
import MapContainer from "./MapContainer";

import markerIcon  from 'leaflet/dist/images/marker-icon-2x.png'
import { useMap } from "react-leaflet";

export default {
    title: 'Integration with Leaflet',
    args: {
        zIndexOffset: 0,
        riseOffset: 250,
        riseOnHover: false,
        interactive: false,
        placement: EPlacement.top,
        size: [25, 41]
    },
    argTypes: {
        riseOnHover: {
            control: { type: 'boolean' },
        },
        zIndexOffset: {
            control: { type: 'number' },
        },
        interactive: {
            control: { type: 'boolean' },
        },
        placement: {
            options: Object.values(EPlacement),
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
            <Marker {...props} position={{lat: 55.60589337944284, lng: 49.286727905273445}}>
                <img alt="Example image" width={25} height={41} src={markerIcon} />
            </Marker>
            <Marker {...props} position={{lat: 55.76691721773862, lng: 48.98597717285157}}>
                <img alt="Example image" width={25} height={41} src={markerIcon} />
            </Marker>
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


const PanToMarkerLayer = (props: IMarkerProps) => {
    const map = useMap();

    return (
        <MarkerLayer>
            <Marker {...props} position={{lat: 55.39939114358245, lng: 49.54559326171876}}>
                <img
                    onClick={() => {
                        map.panTo(
                            {lat: 55.39939114358245, lng: 49.54559326171876},
                            {
                                animate: true,
                                duration: 1,
                            }
                        );
                    }}
                     alt="Example image"
                    width={25}
                    height={41}
                    src={markerIcon}
                />
            </Marker>
            <Marker {...props} position={{lat: 55.84294011297764, lng: 48.52798461914063}}>
                <img
                    onClick={() => {
                        map.panTo(
                            {lat: 55.84294011297764, lng: 48.52798461914063},{
                                animate: true,
                                duration: 3,
                            }
                        );
                    }}
                    alt="Example image"
                    width={25}
                    height={41}
                    src={markerIcon}
                />
            </Marker>
        </MarkerLayer>
    );
};

export const PanToMarker = (props: IMarkerProps) => (
    <MapContainer
        zoom={8}
    >
        <PanToMarkerLayer {...props} />
    </MapContainer>
);