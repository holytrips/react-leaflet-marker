import { act, renderHook} from '@testing-library/react'

import useZIndex from "../../src/hooks/useZIndex";

const renderHookFactory = (override?: Record<string, unknown>) => renderHook(({
    latitudeOffset,
    zIndexOffset,
    riseOffset,
    riseOnHover
}) => {
    return useZIndex(latitudeOffset, zIndexOffset, riseOffset, riseOnHover);
}, {
    initialProps: {
        latitudeOffset: 10,
        zIndexOffset: 11,
        riseOffset: 12,
        riseOnHover: false,
        ...override
    }
});

describe('HOOK: useZIndex', () => {
    it('Simple riseOnHover = false ', () => {
        const { result } = renderHookFactory();

        expect(result.current).toEqual([21, null]);
    });

    it('Simple riseOnHover = true', () => {
        const { result } = renderHookFactory({
            riseOnHover: true
        });

        expect(result.current[0]).toEqual(21);
        expect(result.current[1]).toMatchObject({
            onMouseEnter: expect.any(Function),
            onMouseLeave: expect.any(Function)
        });
    });

    it('Rerender riseOnHover = false ', () => {
        const { result, rerender } = renderHookFactory();

        rerender({
            latitudeOffset: 5,
            zIndexOffset: 2,
            riseOffset: 8,
            riseOnHover: false,
        });

        expect(result.current).toEqual([7, null]);

        rerender({
            latitudeOffset: 9,
            zIndexOffset: 0,
            riseOffset: 8,
            riseOnHover: false,
        });

        expect(result.current).toEqual([9, null]);
    });


    it('Rerender riseOnHover = true ', () => {
        const { result, rerender } = renderHookFactory({
            riseOnHover: true
        });

        rerender({
            latitudeOffset: 5,
            zIndexOffset: 2,
            riseOffset: 8,
            riseOnHover: true,
        });

        expect(result.current[0]).toEqual(7);
        expect(result.current[1]).toMatchObject({
            onMouseEnter: expect.any(Function),
            onMouseLeave: expect.any(Function)
        });

        rerender({
            latitudeOffset: 9,
            zIndexOffset: 0,
            riseOffset: 8,
            riseOnHover: true,
        });

        expect(result.current[0]).toEqual(9);
        expect(result.current[1]).toMatchObject({
            onMouseEnter: expect.any(Function),
            onMouseLeave: expect.any(Function)
        });
    });

    it('Rerender riseOnHover triggers ', () => {
        const { result } = renderHookFactory({
            riseOnHover: true
        });
        expect(result.current[1]?.onMouseEnter).toEqual(expect.any(Function));

        act(() => {
            result.current[1]?.onMouseEnter?.();
        });
        expect(result.current[0]).toEqual(33);

        act(() => {
            result.current[1]?.onMouseLeave?.();
        });
        expect(result.current[0]).toEqual(21);
    });
});