import {cleanup, render} from "@testing-library/react";
import React, { StrictMode } from 'react'

import Marker from '../src/Marker'
import MarkerLayer from '../src/MarkerLayer'

jest.mock('../src/Marker', () => function mockMarker(props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>) {return <div data-component="Marker" {...props} />});
jest.mock('@react-leaflet/core', () => ({
    useLeafletContext: () => ({
        map: {
            getPanes: () => ({
                overlayPane: {
                    appendChild: jest.fn()
                }
            })
        }
    })
}));

describe('MarkerLayer snapshots', () => {
    afterEach(cleanup);
    
    test('MarkerLayer One Marker tree', () => {
        const { asFragment } = render(
            <StrictMode>
                <MarkerLayer>
                    <Marker position={{lat: 55.84294011297764, lng: 48.52798461914063}}>children</Marker>
                </MarkerLayer>
            </StrictMode>,
        )

        expect(asFragment()).toMatchSnapshot()
    });

    test('MarkerLayer Multi Markers tree', () => {
        const { asFragment } = render(
            <StrictMode>
                <MarkerLayer>
                    <Marker position={{lat: 55.84294011297764, lng: 48.52798461914063}}>children 1</Marker>
                    <Marker position={{lat: 52.84294011297764, lng: 48.52798461914063}}>children 2</Marker>
                    <Marker position={{lat: 45.84294011297764, lng: 48.52798461914063}}>children 3</Marker>
                </MarkerLayer>
            </StrictMode>,
        )

        expect(asFragment()).toMatchSnapshot();
    });
});