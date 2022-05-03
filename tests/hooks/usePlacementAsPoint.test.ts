import { renderHook } from '@testing-library/react-hooks'

import usePlacementAsPoint from "../../src/hooks/usePlacementAsPoint";
import { EPlacement } from "../../src/Marker.types";

describe('HOOK: usePlacementAsPoint', () => {
    it('placement = center', () => {
        const { result } = renderHook(() => {
            return usePlacementAsPoint('center' as EPlacement, [30, 50]);
        });

        expect(result.current).toMatchObject({
            x: 15,
            y: 25
        });
    });

    it('placement = bottom', () => {
        const { result } = renderHook(() => {
            return usePlacementAsPoint('bottom' as EPlacement, [30, 50]);
        });

        expect(result.current).toMatchObject({
            x: 15,
            y: 0
        });
    });

    it('placement = top', () => {
        const { result } = renderHook(() => {
            return usePlacementAsPoint('top' as EPlacement, [30, 50]);
        });

        expect(result.current).toMatchObject({
            x: 15,
            y: 50
        });
    });
});