import { DomUtil, LatLngExpression, Point } from "leaflet";
import { RefObject, useCallback, useEffect, useLayoutEffect } from "react";
import { useMap } from "react-leaflet";

const useUpdatePosition = (placementAsPoint: Point, position: LatLngExpression, ref: RefObject<HTMLDivElement>) => {
    const map = useMap();

    const setPos = useCallback((newPosition: LatLngExpression) => {
        if (!ref.current) return;

        const point = map.latLngToLayerPoint(newPosition).subtract(placementAsPoint).round();

        DomUtil.setPosition(
            ref.current,
            point,
        );
    }, [map, placementAsPoint, ref]);

    const update = useCallback(() => {
        setPos(position);
    }, [setPos, position]);

    useLayoutEffect(() => {
        update();
    }, [update])

    useEffect(() => {
        map.on('zoom', update);
        map.on('viewreset', update);

        return () => {
            map.off('zoom', update);
            map.off('viewreset', update);
        }
    }, [map, update]);
};

export default useUpdatePosition;