import { FC } from "react";
import { useCropImage } from "./Context";
import { RotationSlider, ZoomSlider } from "./Sliders";
import Cropper from "./Cropper";

export const CropImageForm: FC = () => {
  const { cropSize } = useCropImage();

  return (
    <>
      <div className="p-8 border-t border-gray-200">
        <div className="flex justify-center">
          <div className="relative w-full overflow-hidden" style={{ height: cropSize, maxHeight: cropSize }}>
            <div className="absolute inset-0">
              <Cropper />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 transition-all">
          <ZoomSlider />
          <RotationSlider />
        </div>
      </div>
    </>
  );
};