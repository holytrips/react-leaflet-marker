import classNames from "classnames";
import React, {FC} from 'react';

import useLatitudeOffset from "./hooks/useLatitudeOffset";
import useMarkerRef from "./hooks/useMarkerRef";
import usePlacementAsPoint from "./hooks/usePlacementAsPoint";
import useUpdatePosition from "./hooks/useUpdatePosition";
import useZIndex from "./hooks/useZIndex";
import useZoomAnimation from "./hooks/useZoomAnimation";
import styles from './Marker.module.css';
import { EPlacement, IMarkerProps } from "./Marker.types";


const Marker: FC<IMarkerProps> = ({
    children,
    position,
    size,
    innerRef,
    riseOffset = 250,
    zIndexOffset = 0,
    interactive= false,
    riseOnHover = false,
    placement = EPlacement.top,
}) => {
    const markerRef = useMarkerRef(innerRef);
    const placementAsPoint = usePlacementAsPoint(placement, size);
    const latitudeOffset = useLatitudeOffset(placementAsPoint, position);
    const hasAnimation = useZoomAnimation(placementAsPoint, position, markerRef);
    const [ zIndex, domEvents ] = useZIndex(
        latitudeOffset,
        zIndexOffset,
        riseOffset,
        riseOnHover
    );
    useUpdatePosition(
        placementAsPoint,
        position,
        markerRef,
    );

    return (
        <div
            ref={markerRef}
            onMouseEnter={domEvents?.onMouseEnter}
            onMouseLeave={domEvents?.onMouseLeave}
            className={classNames(styles.wrapper, {
                [styles.wrapper_interactive]: interactive,
                ['leaflet-zoom-animated']: hasAnimation,
                ['leaflet-zoom-hide']: !hasAnimation,
            })}
            style={{
                zIndex,
                ...(size ? {
                    width: size[0],
                    height: size[0],
                } : null),
            }}
        >
            {children}
        </div>
    );
}

export default Marker;