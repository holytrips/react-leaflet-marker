import 'leaflet/dist/leaflet.css';

import React from 'react';

import Marker from "../src/Marker";
import {EPlacement, IMarkerProps} from "../src/Marker.types";
import MarkerLayer from "../src/MarkerLayer";
import MapContainer from "./MapContainer";

export default {
    title: 'Readme Examples',
    parameters: {
        jest: ['useZIndex', 'usePlacementAsPoint', 'Marker.test.tsx', 'MarkerLayer.test.tsx'],
    },
};

export const OneFloatMarker = () => (
    <MapContainer
        zoom={10}
    >
        <MarkerLayer>
            <Marker
                position={[55.796391, 49.108891]}
                size={[15, 15]}
                placement={EPlacement.center}
                zIndexOffset={100}
            >
                <div style={{
                    width: 15,
                    height: 15,
                    background: 'blue',
                    borderRadius: '50%',
                    opacity: '0.6'
                }} />
            </Marker>
            <Marker
                position={[55.796391, 49.108891]}
            >
                <div style={{
                    background: 'red'
                }}>
                    simple{'\u00A0'}marker
                </div>
            </Marker>
        </MarkerLayer>
    </MapContainer>
);

export const MarkerWithPlacement = ({ placement, size }: IMarkerProps) => (
    <MapContainer
        zoom={10}
    >
        <MarkerLayer>
            <Marker
                position={[55.796391, 49.108891]}
                size={[15, 15]}
                placement={EPlacement.center}
                zIndexOffset={100}
            >
                <div style={{
                    width: 15,
                    height: 15,
                    background: 'blue',
                    borderRadius: '50%',
                    opacity: '0.6'
                }} />
            </Marker>
            <Marker
                position={[55.796391, 49.108891]}
                size={size}
                placement={placement}
            >
                <div style={{
                    background: 'red',
                    textAlign: 'center'
                }}>
                    {placement ? placement : 'default = top'}
                </div>
            </Marker>
        </MarkerLayer>
    </MapContainer>
);

MarkerWithPlacement.args = {
    size: [80, 20]
};
MarkerWithPlacement.argTypes = {
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
};

export const RiseOnHover = () => (
    <MapContainer
        zoom={10}
    >
        <MarkerLayer>
            <Marker
                position={[55.796391, 49.108891]}
                size={[80, 40]}
                interactive
                riseOnHover
                placement={EPlacement.center}
            >
                <div style={{
                    height: '100%',
                    background: 'red',
                    textAlign: 'center'
                }}>
                    First marker
                </div>
            </Marker>
            <Marker
                position={[55.776391, 49.188891]}
                size={[80, 40]}
                interactive
                riseOnHover
                placement={EPlacement.center}
            >
                <div style={{
                    height: '100%',
                    background: 'green',
                    textAlign: 'center'
                }}>
                    Second marker
                </div>
            </Marker>
        </MarkerLayer>
    </MapContainer>
);