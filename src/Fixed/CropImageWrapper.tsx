import { FC } from "react";
import { CropImageProvider, CropImageProviderProps } from "./Context";
import { CropImage, CropImageProps } from "./CropImage";

export interface CropImageWrapperProps extends CropImageProviderProps, CropImageProps {}

export const CropImageWrapper: FC<CropImageWrapperProps> = (props) => {
  const { oldImage, cropSize } = props;

  return (
    <CropImageProvider
      {...{
        oldImage,
        cropSize,
      }}
    >
      <CropImage />
    </CropImageProvider>
  );
};
