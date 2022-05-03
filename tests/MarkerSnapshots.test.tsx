import { cleanup,render } from '@testing-library/react'
import React, { StrictMode } from 'react'

import useZIndex from '../src/hooks/useZIndex';
import useZoomAnimation from '../src/hooks/useZoomAnimation';
import Marker from '../src/Marker'

jest.mock('../src/hooks/useMarkerRef', () => jest.fn());
jest.mock('../src/hooks/useLatitudeOffset', () => jest.fn());
jest.mock('../src/hooks/usePlacementAsPoint', () => jest.fn());
jest.mock('../src/hooks/useUpdatePosition', () => jest.fn());
jest.mock('../src/hooks/useZIndex', () => jest.fn());
jest.mock('../src/hooks/useZoomAnimation', () => jest.fn());

describe('Marker snapshots', () => {
    beforeEach(() => {
        (useZIndex as jest.Mock).mockReturnValue([123, null]);
        (useZoomAnimation as jest.Mock).mockReturnValue(false);
    });
    afterEach(cleanup);

    test('Simple marker tree', () => {
        const { asFragment } = render(
            <StrictMode>
                <Marker
                    position={{lat: 55.84294011297764, lng: 48.52798461914063}}
                >
                    children
                </Marker>
            </StrictMode>,
        )

        expect(asFragment()).toMatchSnapshot()
    });

    test('withMouseEvents marker tree', () => {
        (useZIndex as jest.Mock).mockImplementation(() => [231, {
            onMouseEnter: jest.fn(),
            onMouseLeave: jest.fn(),
        }]);
        const { asFragment } = render(
            <StrictMode>
                <Marker
                    position={{lat: 55.84294011297764, lng: 48.52798461914063}}
                >
                    children
                </Marker>
            </StrictMode>,
        )

        expect(asFragment()).toMatchSnapshot()
    });

    test('Size marker tree', () => {
        const { asFragment } = render(
            <StrictMode>
                <Marker
                    position={{lat: 55.84294011297764, lng: 48.52798461914063}}
                    size={[40, 50]}
                >
                    children
                </Marker>
            </StrictMode>,
        )

        expect(asFragment()).toMatchSnapshot()
    });

    test('has animation marker tree', () => {
        (useZoomAnimation as jest.Mock).mockReturnValue(true);

        const { asFragment } = render(
            <StrictMode>
                <Marker
                    position={{lat: 55.84294011297764, lng: 48.52798461914063}}
                >
                    children
                </Marker>
            </StrictMode>,
        )

        expect(asFragment()).toMatchSnapshot()
    });
});