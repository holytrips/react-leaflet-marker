import { LatLngExpression } from "leaflet";
import { MutableRefObject } from "react";

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