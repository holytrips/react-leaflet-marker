import { useState } from "react";

const useZIndex = (latitudeOffset: number, zIndexOffset: number, riseOffset: number, riseOnHover: boolean) => {
    const [bringToFront, setBringToFront] = useState(false);

    const zIndex: number = latitudeOffset + zIndexOffset + (bringToFront ? riseOffset : 0);

    const events: {
        onMouseEnter: () => void,
        onMouseLeave: () => void,
    } | null = riseOnHover ? {
        onMouseEnter: () => setBringToFront(true),
        onMouseLeave: () => setBringToFront(false),
    } : null;

    return [zIndex, events] as const;
};

export default useZIndex;