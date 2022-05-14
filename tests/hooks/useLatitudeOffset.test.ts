import { useLeafletContext } from '@react-leaflet/core';
import { renderHook } from '@testing-library/react-hooks'
import L, { Map,point } from "leaflet";

import useLatitudeOffset from "../../src/hooks/useLatitudeOffset";
import {createContainer, removeMapContainer} from "../utils";

jest.mock('@react-leaflet/core', () => ({
    useLeafletContext: jest.fn()
}));

describe('HOOK: useLatitudeOffset', () => {
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
    
    it('Check return', () => {
        const { result } = renderHook(
            () => useLatitudeOffset(point([10, 20]), [55.796391, 49.108891])
        );

        expect(result.current).toEqual(-20);
    });
});