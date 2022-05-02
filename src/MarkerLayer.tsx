import React, { useRef, useLayoutEffect, ReactElement, FC } from 'react';
import { useMap } from 'react-leaflet';
import { IMarkerProps } from './Marker';
import { DefaultMapPanes } from "leaflet";

export interface IMarkerLayerProps {
  children?: ReactElement<IMarkerProps> | ReactElement<IMarkerProps>[];
  /**
   * `Map pane` where the layer will be added.
   */
  pane?: keyof DefaultMapPanes;
}

const MarkerLayer: FC<IMarkerLayerProps> = ({
  children,
  pane = 'overlayPane'
}) => {
  const map = useMap();
  const layerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (layerRef.current) {
      map.getPanes()[pane].appendChild(layerRef.current);
    }
  }, [map, pane]);

  return (
    <div
        ref={layerRef}
        className="leaflet-objects-pane leaflet-marker-pane"
    >
      {React.Children.map(
          children,
          (child) => React.cloneElement(
              child as ReactElement<IMarkerProps>,
          ))
      }
    </div>
  );
};

export default MarkerLayer;
