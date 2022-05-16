import  "@testing-library/jest-dom";

import { cleanup, fireEvent, render } from "@testing-library/react";
import React from 'react'

import useZIndex from '../src/hooks/useZIndex';
import useZoomAnimation from '../src/hooks/useZoomAnimation';
import Marker from '../src/Marker'

jest.mock('../src/hooks/useMarkerRef', () => jest.fn());
jest.mock('../src/hooks/useLatitudeOffset', () => jest.fn());
jest.mock('../src/hooks/usePlacementAsPoint', () => jest.fn());
jest.mock('../src/hooks/useUpdatePosition', () => jest.fn());
jest.mock('../src/hooks/useZIndex', () => jest.fn(() => [123, null]));
jest.mock('../src/hooks/useZoomAnimation', () => jest.fn(() => false));

describe('Marker', () => {
    beforeEach(() => {
        (useZIndex as jest.Mock).mockReturnValue([123, null]);
        (useZoomAnimation as jest.Mock).mockReturnValue(false);
    });
    afterEach(cleanup);

    test('check zIndex', () => {
        (useZIndex as jest.Mock).mockReturnValue([123, null]);
        const { container } = render(
            <Marker
                position={{lat: 55.84294011297764, lng: 48.52798461914063}}
            >
                <div>children</div>
            </Marker>
        );

        expect(container.firstChild).toHaveStyle({
            zIndex: 123,
        });
    });

    test('check size styles', () => {
        const { container } = render(
            <Marker
                position={{lat: 55.84294011297764, lng: 48.52798461914063}}
                size={[40, 50]}
            >
                <div>children</div>
            </Marker>
        );

        expect(container.firstChild).toHaveStyle({
            width: '40px',
            height: '50px',
        });
    });

    test('have to has classNames', () => {
        (useZoomAnimation as jest.Mock).mockReturnValue(true);
        const { container, rerender } = render(
            <Marker
                position={{lat: 55.84294011297764, lng: 48.52798461914063}}
            >
                <div>children</div>
            </Marker>
        );
        expect(container.firstChild).toHaveClass('wrapper');
        expect(container.firstChild).not.toHaveClass('wrapper_interactive');

        expect(container.firstChild).toHaveClass('leaflet-zoom-animated');
        expect(container.firstChild).not.toHaveClass('leaflet-zoom-hide');

        (useZoomAnimation as jest.Mock).mockReturnValue(false);
        rerender(
            <Marker
                position={{lat: 55.84294011297764, lng: 48.52798461914063}}
            >
                <div>children</div>
            </Marker>
        );

        expect(container.firstChild).not.toHaveClass('leaflet-zoom-animated');
        expect(container.firstChild).toHaveClass('leaflet-zoom-hide');

        rerender(
            <Marker
                interactive={true}
                position={{lat: 55.84294011297764, lng: 48.52798461914063}}
            >
                <div>children</div>
            </Marker>
        );

        expect(container.firstChild).toHaveClass('wrapper_interactive');
    });

    test('zIndex events', () => {
        const onMouseEnter = jest.fn();
        const onMouseLeave = jest.fn();
        (useZIndex as jest.Mock).mockImplementation(() => [231, {
            onMouseEnter,
            onMouseLeave,
        }]);
        const { getByText } = render(
            <Marker
                position={{lat: 55.84294011297764, lng: 48.52798461914063}}
            >
                just text
            </Marker>
        );
        const content = getByText(/just text/);

        fireEvent.mouseEnter(content);
        fireEvent.mouseLeave(content);
        fireEvent.mouseEnter(content);

        expect(onMouseEnter).toHaveBeenCalledTimes(2);
        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    test('Snapshot', () => {
        const { asFragment } = render(
            <Marker
                interactive
                size={[23,54]}
                position={{lat: 55.84294011297764, lng: 48.52798461914063}}
            >
                children
            </Marker>
        );

        expect(asFragment()).toMatchSnapshot();
    });
});