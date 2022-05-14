import { useLeafletContext } from '@react-leaflet/core';
import { renderHook } from '@testing-library/react-hooks'
import L, { DomUtil, Map, point } from "leaflet";
import {MutableRefObject} from 'react';

import useUpdatePosition from "../../src/hooks/useUpdatePosition";
import {createContainer, removeMapContainer} from "../utils";

jest.mock('@react-leaflet/core', () => ({
    useLeafletContext: jest.fn()
}));

jest.mock('leaflet', () => ({
    ...jest.requireActual('leaflet'),
    DomUtil: {
        setPosition: jest.fn(),
    }
}));

describe('HOOK: useUpdatePosition', () => {
    let container: HTMLElement;
    let map: Map;

    beforeEach(() => {
        container = createContainer();
        map = L.map(container, {
            center: [55.796391, 49.108891],
            zoom: 16
        });

        (useLeafletContext as jest.Mock).mockReturnValue({
            map,
        });
    });
    afterEach(function () {
        removeMapContainer(map, container);
    });

    it('Simple useUpdatePosition ', () => {
        const ref: MutableRefObject<HTMLDivElement> = {
            current: document.createElement('div')
        };
        renderHook(
            () => useUpdatePosition(point([10, 20]), [55.796391, 49.108891], ref)
        );

        expect(DomUtil.setPosition).toHaveBeenCalledWith(ref.current,  {"x": -10, "y": -20});
    });
});