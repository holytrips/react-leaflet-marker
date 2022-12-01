import { LatLngExpression, Point } from "leaflet";
import { useMemo } from "react";
import { useMap } from "react-leaflet";

const useLatitudeOffset = (placementAsPoint: Point, position: LatLngExpression) => {
    const map = useMap();

    return useMemo(
        () => map
            .latLngToLayerPoint(position)
            .subtract(placementAsPoint)
            .round().y,
        [map, placementAsPoint, position]
    );
}

export default useLatitudeOffset;