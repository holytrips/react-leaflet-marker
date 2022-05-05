import { Point, point } from "leaflet";
import { useMemo } from "react";

import { EPlacement, SizeType } from "../Marker.types";

const usePlacementAsPoint = (placement: `${EPlacement}`, size?: SizeType): Point => {
    return useMemo(() => {
        if (!size) return point(0, 0);
        let subX, subY;

        if (placement === EPlacement.top) {
            subX = size[0] / 2;
            subY = size[1];
        } else if (placement === EPlacement.bottom) {
            subX = size[0] / 2;
            subY = 0;
            // EPlacement.center
        } else {
            subX = size[0] / 2;
            subY = size[1] / 2;
        }

        return point(subX, subY, true);
    }, [size, placement]);
}

export default usePlacementAsPoint;