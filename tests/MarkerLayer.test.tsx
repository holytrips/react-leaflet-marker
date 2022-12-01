import { cleanup, render } from "@testing-library/react";
import React from "react";
import { useMap } from "react-leaflet";

import Marker from "../src/Marker";
import MarkerLayer from "../src/MarkerLayer";

jest.mock(
  "../src/Marker",
  () =>
    function mockMarker(
      props: JSX.IntrinsicAttributes &
        React.ClassAttributes<HTMLDivElement> &
        React.HTMLAttributes<HTMLDivElement>
    ) {
      return <div data-component="Marker" {...props} />;
    }
);
jest.mock("react-leaflet", () => {
  const pane = {
    appendChild: jest.fn(),
    removeChild: jest.fn(),
  };
  const map = {
    getPanes: () => ({
      overlayPane: pane,
      markerPane: pane,
    }),
  };

  return {
    useMap: jest.fn(() => (map)),
  };
});

describe("MarkerLayer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("MarkerLayer add overlay", () => {
    const map = useMap();

    render(
      <MarkerLayer>
        <Marker position={{ lat: 55.84294011297764, lng: 48.52798461914063 }}>
          children
        </Marker>
      </MarkerLayer>
    );

    expect(map.getPanes().overlayPane.appendChild).toHaveBeenCalledTimes(1);
    expect(map.getPanes().overlayPane.removeChild).toHaveBeenCalledTimes(0);
  });

  test("MarkerLayer unmount", () => {
    const map = useMap();

    const { unmount } = render(
      <MarkerLayer pane="markerPane">
        <Marker position={{ lat: 55.84294011297764, lng: 48.52798461914063 }}>
          children
        </Marker>
      </MarkerLayer>
    );

    unmount();

    expect(map.getPanes().markerPane.appendChild).toHaveBeenCalledTimes(1);
    expect(map.getPanes().markerPane.removeChild).toHaveBeenCalledTimes(1);
  });

  test("MarkerLayer rerender", () => {
    const map = useMap();

    const { rerender } = render(
      <MarkerLayer>
        <Marker position={{ lat: 55.84294011297764, lng: 48.52798461914063 }}>
          children
        </Marker>
      </MarkerLayer>
    );
    expect(map.getPanes().overlayPane.appendChild).toHaveBeenCalledTimes(1);

    rerender(
      <MarkerLayer pane="markerPane">
        <Marker position={{ lat: 55.84294011297764, lng: 48.52798461914063 }}>
          children
        </Marker>
      </MarkerLayer>
    );
    expect(map.getPanes().overlayPane.removeChild).toHaveBeenCalledTimes(1);
    expect(map.getPanes().markerPane.appendChild).toHaveBeenCalledTimes(2);
  });

  test("Snapshots", () => {
    const { asFragment } = render(
      <MarkerLayer>
        <Marker position={{ lat: 55.84294011297764, lng: 48.52798461914063 }}>
          children 1
        </Marker>
        <Marker position={{ lat: 52.84294011297764, lng: 48.52798461914063 }}>
          children 2
        </Marker>
        <Marker position={{ lat: 45.84294011297764, lng: 48.52798461914063 }}>
          children 3
        </Marker>
      </MarkerLayer>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
