import {Map} from "leaflet";

export const createContainer = (width = '400px', height = '400px') => {
    const container = document.createElement("div");
    container.style.position = 'absolute';
    container.style.top = '0px';
    container.style.left = '0px';
    container.style.height = height;
    container.style.width = width;
    container.style.opacity = '0.4';
    document.body.appendChild(container);

    return container;
}

export const removeMapContainer = (map?: Map, container?: HTMLElement) => {
    if (map) {
        map.remove();
    }
    if (container) {
        document.body.removeChild(container);
    }
}