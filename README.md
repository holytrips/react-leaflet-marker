# REACT-LEAFLET-MARKER

<a href="https://www.npmjs.com/package/react-leaflet-marker">
    <img alt="npm" src="https://img.shields.io/npm/v/react-leaflet-marker.svg" />
</a>
<a href="https://npmjs.org/package/react-leaflet-marker">
    <img alt="types included" src="https://badgen.net/npm/types/react-leaflet-marker" />
</a>

### Custom markers for react-leaflet maps

## Install

```sh
npm i react-leaflet-marker --save
```

## Get started

```javascript
import React from "react";
import { MapContainer } from "react-leaflet";
import { MarkerLayer, Marker } from "react-leaflet-marker";

const ReactMarker = () => (
    <MapContainer
        {/* ...MapContainerProps react-leaflet */}
        center={[55.796391, 49.108891]}
        zoom={10}
    >
        <MarkerLayer>
            <Marker
                position={[55.796391, 49.108891]}
            >
                <div>Hi, i'm a react element</div>
            </Marker>
        </MarkerLayer>
    </MapContainer>
);

export default ReactMarker;
```
## Examples

### Simple marker with flexible size
Markers without `size` can't take `placement` props.
```javascript
<MarkerLayer>
    <Marker
        position={[55.796391, 49.108891]}
    >
        <div style={{
            background: 'red'
        }}>
            simple{'\u00A0'}marker
        </div>
    </Marker>
</MarkerLayer>
```
![alt text](.github/images/simple.png)

### Marker with fixed size
Just add `size` props. It is the best practice the most cases.

```javascript
<MarkerLayer>
    <Marker
        position={[55.796391, 49.108891]}
        size={[80, 20]} // required for placement
        // you can use optional `placement`
        placement="center" // "top", "bottom"
    >
        <div style={{
            background: 'red',
            textAlign: 'center'
        }}>
            center
        </div>
    </Marker>
</MarkerLayer>
```
![alt text](.github/images/placement_center.png)

### Rise on hover
The marker will get on top of others when you hover the mouse over it.

```javascript
<MarkerLayer>
    <Marker
        position={[55.796391, 49.108891]}
        size={[80, 40]} // required for placement
        interactive // required for riseOnHover
        riseOnHover
    >
        <div style={{
            background: 'red',
            textAlign: 'center'
        }}>
            First marker
        </div>
    </Marker>
</MarkerLayer>
```
![alt text](.github/images/rise_on_hover.png)



## Props

| Name       | Default                       | Type                                                                                                                      | Description |
| ---------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | --- |
| `position`   | - | LatLngExpression | Lat Lng coordinates |
| `innerRef`?  | - | MutableRefObject |  |
| `riseOnHover`? | false | bool | If `true`, the marker will get on top of others when you hover the mouse over it.If `true`, the marker will get on top of others when you hover the mouse over it. |
| `riseOffset`? | 250 | number | The z-index offset used for the `riseOnHover` feature. |
| `zIndexOffset`? | 0 | number | By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like `1000` (or high negative value, respectively). |
| `interactive`? | false | bool | If set `false`, the marker won't respond to mouse |
| `size`? | - | [width: number, height: number] | Size marker. Required for `placement` |
| `placement`? | center | string | One of `top`, `center`, `bottom` |