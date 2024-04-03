import { FC } from "react";
import { useCropImage } from "./Context";

const handleMouseDown = () => window.getSelection()?.removeAllRanges();

export const ZoomSlider: FC = () => {
  const { zoom, minZoom, maxZoom, zoomStep, setZoom } = useCropImage();

  return (
    <div>
      <label className="block text-sm">Phóng thu</label>
      <input
        type="range"
        value={zoom}
        min={minZoom}
        max={maxZoom}
        step={zoomStep}
        aria-labelledby="Zoom"
        onChange={(e) => setZoom(+e.target.value)}
        onMouseDown={handleMouseDown}
        className="input-range"
      />
    </div>
  );
}

export const RotationSlider: FC = () => {
  const { rotation, minRotation, maxRotation, rotationStep, setRotation } = useCropImage();

  return (
    <div>
      <label className="block text-sm">Xoay</label>
      <input
        type="range"
        value={rotation}
        min={minRotation}
        max={maxRotation}
        step={rotationStep}
        aria-labelledby="Rotation"
        onChange={(e) => setRotation(+e.target.value)}
        onMouseDown={handleMouseDown}
        className="input-range"
      />
    </div>
  );
}
