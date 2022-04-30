import React, { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LatLngExpression, DomUtil, ZoomAnimEventHandlerFn } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import classNames from "classnames";

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
    interactive= true,
    placement = EPlacement.top,
}) => {
    const [zIndex, setZIndex] = useState(0);
    const map = useMap();
    const ref = useRef<HTMLDivElement>(null);

    // @ts-ignore
    const hasAnimation = map._zoomAnimated && map.options.markerZoomAnimation;

    useEffect(() => {
        if (innerRef && ref.current) {
            innerRef.current = ref.current;
        }
    }, []);

    const setPos = useCallback((newPosition: LatLngExpression) => {
        if (!ref.current) return;

        const point = map.latLngToLayerPoint(newPosition).round();
        DomUtil.setPosition(
            ref.current,
            point,
        );
        setZIndex(point.y + zIndexOffset);
    }, [map, zIndexOffset]);

    const update = useCallback(() => {
        setPos(position);
    }, [setPos, position]);

    const bringToFront = useCallback(() => {
        setZIndex(riseOffset)
    }, [riseOffset]);

    const resetZIndex = useCallback(() => {
        setZIndex(0)
    }, [map]);

    const animateZoom: ZoomAnimEventHandlerFn = useCallback((e) => {
        if (!ref.current) return;

        // @ts-ignore
        const point = map._latLngToNewLayerPoint(position, e.zoom, e.center).round();
        DomUtil.setPosition(
            ref.current,
            point,
        );
        setZIndex(point.y);
    }, [map]);

    useEffect(() => {
        update();
    }, [update])

    useMapEvents({
        zoom: update,
        viewreset: update,
        ...(hasAnimation ? {
            zoomanim: hasAnimation && animateZoom,
        } : {})
    });

    const offsetToPlacement = useMemo(() => {
        if (!size) return {};

        let marginTop = 0;
        if (placement === EPlacement.top) {
            marginTop = size[1] * -1;
        } else if (placement === EPlacement.center) {
            marginTop = size[1] / 2 * -1;
        } else if (placement === EPlacement.bottom) {
            marginTop = 0;
        }

        return {
            marginLeft: size[0] / 2 * -1,
            marginTop
        };
    }, [size, placement]);

    return (
        <div
            ref={ref}
            {...(interactive ? {
                onMouseOver: bringToFront,
                onMouseOut: resetZIndex,
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
                ...offsetToPlacement
            }}
        >
            {children}
        </div>
    );
}

export default Marker;