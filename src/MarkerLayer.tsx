import React, { useRef, useLayoutEffect, ReactElement } from 'react';
import { useMap } from 'react-leaflet';
import Marker from './Marker';
import { DefaultMapPanes } from "leaflet";

export interface IMarkerLayerProps {
  children: ReactElement<typeof Marker> | ReactElement<typeof Marker>[];
  /**
   * `Map pane` where the layer will be added.
   */
  pane?: keyof DefaultMapPanes;
}

const MarkerLayer: React.FC<IMarkerLayerProps> = ({
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
              child as ReactElement,
          ))
      }
    </div>
  );
};

export default MarkerLayer;
