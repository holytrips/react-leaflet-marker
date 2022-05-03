import { useLeafletContext } from "@react-leaflet/core";
import { LatLngExpression, Point } from "leaflet";
import { useMemo } from "react";

const useLatitudeOffset = (placementAsPoint: Point, position: LatLngExpression) => {
    const map = useLeafletContext().map;

    return useMemo(
        () => map
            .latLngToLayerPoint(position)
            .subtract(placementAsPoint)
            .round().y,
        [map, placementAsPoint, position]
    );
}

export default useLatitudeOffset;