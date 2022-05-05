import {DefaultMapPanes} from "leaflet";
import {ReactElement} from "react";

import {IMarkerProps} from "./Marker.types";

export interface IMarkerLayerProps {
  children?: ReactElement<IMarkerProps> | ReactElement<IMarkerProps>[];
  /**
   * `Map pane` where the layer will be added.
   */
  pane?: keyof DefaultMapPanes;
}