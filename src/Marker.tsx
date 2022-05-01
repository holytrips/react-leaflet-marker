import React, { MutableRefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { point, LatLngExpression, DomUtil, ZoomAnimEventHandlerFn } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import classNames from "classnames";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import styles from './Marker.module.css';

export type SizeType = [number, number];

export enum EPlacement {
    top = 'top',
    center = 'center',
    bottom = 'bottom',
}

export interface IMarkerProps {
    position: LatLngExpression;
    innerRef?: MutableRefObject<HTMLDivElement>;
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


const Marker: React.FC<IMarkerProps> = ({
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
    const [bringToFront, setBringToFront] = useState(false);
    const map = useMap();
    const ref = useRef<HTMLDivElement>(null);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const hasAnimation = map._zoomAnimated && map.options.markerZoomAnimation;

    useEffect(() => {
        if (innerRef && ref.current) {
            innerRef.current = ref.current;
        }
    }, [innerRef]);

    const placementPoint = useMemo(() => {
        if (!size) return point(0,0);
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

    const layerPoint = useMemo(
        () => map
            .latLngToLayerPoint(position)
            .subtract(placementPoint)
            .round(),
        [map, placementPoint, position]
    );

    const setPos = useCallback((newPosition: LatLngExpression) => {
        if (!ref.current) return;

        const point = map.latLngToLayerPoint(newPosition).subtract(placementPoint).round();
        
        DomUtil.setPosition(
            ref.current,
            point,
        );
    }, [map, placementPoint]);

    const update = useCallback(() => {
        setPos(position);
    }, [setPos, position]);

    const animateZoom: ZoomAnimEventHandlerFn = useCallback((e) => {
        if (!ref.current) return;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const point = map._latLngToNewLayerPoint(position, e.zoom, e.center).subtract(placementPoint).round();

        DomUtil.setPosition(
            ref.current,
            point,
        );
    }, [map, placementPoint, position]);

    useLayoutEffect(() => {
        update();
    }, [update])

    const zIndex = layerPoint.y + zIndexOffset + (bringToFront ? riseOffset : 0);

    useMapEvents({
        zoom: update,
        viewreset: update,
        ...(hasAnimation ? {
            zoomanim: hasAnimation && animateZoom,
        } : {})
    });

    return (
        <div
            ref={ref}
            {...(riseOnHover ? {
                onMouseEnter: () => setBringToFront(true),
                onMouseLeave: () => setBringToFront(false),
            } : {})}
            className={classNames(styles.wrapper, {
                [styles.wrapper_interactive]: interactive,
                ['leaflet-zoom-animated']: hasAnimation,
                ['leaflet-zoom-hide']: !hasAnimation,
            })}
            style={{
                zIndex,
                ...(size ? {
                    width: size[0],
                    height: size[1],
                } : {}),
            }}
        >
            {children}
        </div>
    );
}

export default Marker;