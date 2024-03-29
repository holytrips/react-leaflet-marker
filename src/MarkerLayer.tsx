import React, { FC, ReactElement, useEffect, useRef } from "react";
import { useMap } from "react-leaflet";

import { IMarkerProps } from "./Marker.types";
import { IMarkerLayerProps } from "./MarkerLayer.types";

const MarkerLayer: FC<IMarkerLayerProps> = ({
  children,
  pane = "overlayPane",
}) => {
  const map = useMap();
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = layerRef.current;
    if (!element) return;

    const paneElement = map.getPanes()[pane];
    paneElement.appendChild(element);
    return () => {
      paneElement.removeChild(element);
    };
  }, [map, pane]);

  return (
    <div ref={layerRef} className="leaflet-objects-pane leaflet-marker-pane">
      {React.Children.map(children, (child) =>
        React.cloneElement(child as ReactElement<IMarkerProps>)
      )}
    </div>
  );
};

export default MarkerLayer;
