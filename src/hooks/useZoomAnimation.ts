import { DomUtil, LatLngExpression, Point, ZoomAnimEventHandlerFn } from "leaflet";
import { RefObject, useCallback, useEffect } from "react";
import { useMap } from "react-leaflet";

const useZoomAnimation = (
    placementPoint: Point,
    position: LatLngExpression,
    ref: RefObject<HTMLDivElement>
) => {
    const map = useMap();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const hasAnimation = map._zoomAnimated && map.options.markerZoomAnimation;

    const animateZoom: ZoomAnimEventHandlerFn = useCallback((e) => {
        if (!ref.current) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const point = map._latLngToNewLayerPoint(position, e.zoom, e.center).subtract(placementPoint).round();

        DomUtil.setPosition(
            ref.current,
            point,
        );
    }, [map, placementPoint, position, ref]);

    useEffect(() => {
        if (!hasAnimation) return;
        map.on('zoomanim', animateZoom);

        return () => {
            map.off('zoomanim', animateZoom);
        }
    });

    return hasAnimation;
}

export default useZoomAnimation;