import {useLeafletContext} from "@react-leaflet/core";
import React, {FC, ReactElement, useLayoutEffect, useRef} from 'react';

import {IMarkerProps} from "./Marker.types";
import {IMarkerLayerProps} from "./MarkerLayer.types";

const MarkerLayer: FC<IMarkerLayerProps> = ({
  children,
  pane = 'overlayPane'
}) => {
  const map = useLeafletContext().map;
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
