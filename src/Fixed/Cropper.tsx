import { FC } from 'react';
import { useCropImage } from './Context';
import EasyCropper from 'react-easy-crop';

const Cropper: FC = () => {
  const { image, zoom, setZoom, rotation, setRotation, crop, setCrop, handleCropComplete, cropSize } = useCropImage();

  return (
    <EasyCropper
      image={image || undefined}
      crop={crop}
      zoom={zoom}
      rotation={rotation}
      cropShape="rect"
      aspect={1}
      onCropChange={setCrop}
      onCropComplete={handleCropComplete}
      onZoomChange={setZoom}
      onRotationChange={setRotation}
      showGrid={false}
      cropSize={{ width: cropSize, height: cropSize }}
      style={{
        containerStyle: {
          height: cropSize,
          width: cropSize,
        }
      }}
      classes={{
        containerClassName: "mx-auto CropImageWrapper"
      }}
    />
  );
};

export default Cropper;