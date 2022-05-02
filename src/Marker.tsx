import classNames from "classnames";
import { LatLngExpression } from "leaflet";
import React, { FC, MutableRefObject } from 'react';

import useLatitudeOffset from "./hooks/useLatitudeOffset";
import useMarkerRef from "./hooks/useMarkerRef";
import usePlacementAsPoint from "./hooks/usePlacementAsPoint";
import useUpdatePosition from "./hooks/useUpdatePosition";
import useZIndex from "./hooks/useZIndex";
import useZoomAnimation from "./hooks/useZoomAnimation";
import styles from './Marker.module.css';

export type SizeType = [width: number, height: number];

export enum EPlacement {
    top = 'top',
    center = 'center',
    bottom = 'bottom',
}

export interface IMarkerProps {
    position: LatLngExpression;
    innerRef?: MutableRefObject<HTMLDivElement | null>;
    /**
     * If `true`, the marker will get on top of others when you hover the mouse over it.
     */
    riseOnHover?: boolean;
    /**
     * The z-index offset used for the `riseOnHover` feature.
     */
    riseOffset?: number;
    /**
     * By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively).
     */
    zIndexOffset?: number;
    /**
     * If set `false`, the marker won't respond to mouse
     * By default `true`
     */
    interactive?: boolean;
    /**
     * width, height
     */
    size?: SizeType;
    placement?: EPlacement;
}


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