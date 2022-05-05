import { MutableRefObject, useEffect, useRef } from "react";

const useMarkerRef = (innerRef?: MutableRefObject<HTMLDivElement | null>) => {
    const markerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (innerRef) {
            innerRef.current = markerRef.current;
        }
    }, [innerRef]);

    return markerRef;
};

export default useMarkerRef;