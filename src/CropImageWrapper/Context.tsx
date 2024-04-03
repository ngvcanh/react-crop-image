// import { FC, PropsWithChildren, createContext, useCallback, useContext, useRef, useState } from "react";
// import { createImage, getCroppedImage, isEqualArea } from "./utils";
// import { Area } from "react-easy-crop";
import { FC, PropsWithChildren, createContext, useCallback, useContext, useState } from 'react';
import getCroppedImg from './utils';
import { Area } from 'react-easy-crop';

export interface Point {
  x: number;
  y: number;
}

export interface CropImageValue {
  image: string | null;
  setImage(image: string | null): void;
  crop: Point;
  setCrop(value: Point): void;
  rotation: number;
  setRotation(value: number): void;
  zoom: number;
  setZoom(value: number): void;
  croppedAreaPixels: Area | null;
  setCroppedAreaPixels(area: Area | null): void;
  onCropComplete(croppedArea: Area, nextCroppedPixels: Area): void;
  getProcessedImage(): Promise<File | undefined>;
  handleZoomIn(): void;
  handleZoomOut(): void;
  handleRotateAntiCw(): void;
  handleRotateCw(): void;
  max_zoom: number;
  min_zoom: number;
  zoom_step: number;
  max_rotation: number;
  min_rotation: number;
  rotation_step: number;
  resetStates(): void;
}

// export const CropImageContext = createContext<CropImageValue>({
  // image: "",
  // crop: { x: 0, y: 0 },
  // rotation: 0,
  // zoom: 1,
  // croppedAreaPixels: null,
  // setRotation() {},
  // setZoom() {},
  // setCrop() {},
  // setCroppedAreaPixels() {},
  // onCropComplete() {},
  // getProcessedImage() { return Promise.resolve(undefined) },
  // handleZoomIn() {},
  // handleZoomOut() {},
  // handleRotation() {},
  // minZoom: 1,
  // maxZoom: 3,
  // zoomStep: 0.1,
  // minRotation: -360,
  // maxRotation: 360,
  // rotationStep: 0.5,
  // resetStates() {},
// });

// export interface CropImageProviderProps {
//   image: string;
//   defaultCrop?: Point;
//   defaultRotation?: number;
//   defaultZoom?: number;
//   maxZoom?: number;
//   minZoom?: number;
//   zoomStep?: number;
//   rotationStep?: number;
//   maxRotation?: number;
//   minRotation?: number;
// }

// export const CropImageProvider: FC<PropsWithChildren<CropImageProviderProps>> = (props) => {
//   const {
//     children,
//     image,
//     defaultCrop,
//     defaultRotation = 0,
//     defaultZoom = 0,
//     maxZoom = 3,
//     minZoom = 1,
//     zoomStep = 0.1,
//     rotationStep = 0.5,
//     minRotation = -360,
//     maxRotation = 360,
//   } = props;

//   const [originWidth, setOriginWidth] = useState<number>();
//   const [originHeight, setOriginHeight] = useState<number>();
  
//   const [crop, setCrop] = useState(defaultCrop ?? { x: 0, y: 0 });
//   const [zoom, setZoom] = useState(defaultZoom);
//   const [rotation, setRotation] = useState(defaultRotation);

//   const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

//   const handleLoadImage = (img: HTMLImageElement) => {
//     setOriginWidth(img.width);
//     setOriginHeight(img.height);
//   };

//   const originImage = useRef(createImage(image));

//   const onCropComplete = useCallback((_: Area, nextAreaPixels: Area) => {
//     isEqualArea(croppedAreaPixels, nextAreaPixels) || setCroppedAreaPixels(croppedAreaPixels);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const getProcessedImage = async () => {
//     if (image && croppedAreaPixels) {
//       const croppedImage = await getCroppedImage(image, croppedAreaPixels, rotation);
//       const imageFile = new File([croppedImage?.file!], `img-${Date.now()}.png`, {
//         type: 'image/png'
//       });
//       return imageFile;
//     }
//   };

//   const handleZoomIn = () => {
//     if (zoom < maxZoom) {
//       setZoom(zoom + zoomStep * 2);
//     }
//   };

//   const handleZoomOut = () => {
//     if (zoom > minZoom) {
//       setZoom(zoom - zoomStep * 2);
//     }
//   };

//   const handleRotation = () => {
//     setRotation((prev) => prev + rotationStep);
//   };

//   const resetStates = () => {
//     // setImage(defaultImage);
//     setCrop({ x: 0, y: 0 });
//     setRotation(defaultRotation);
//     setZoom(defaultZoom);
//     setCroppedAreaPixels(null);
//   };

//   return (
//     <CropImageContext.Provider
//       value={{
//         image,
//         crop,
//         setCrop,
//         originWidth,
//         originHeight,
//         rotation,
//         setRotation,
//         zoom,
//         setZoom,
//         croppedAreaPixels,
//         setCroppedAreaPixels,
//         onCropComplete,
//         getProcessedImage,
//         handleZoomIn,
//         handleZoomOut,
//         handleRotation,
//         // handleRotateCw,
//         maxZoom,
//         minZoom,
//         zoomStep,
//         maxRotation,
//         minRotation,
//         rotationStep,
//         resetStates
//       }}
//     >
//       {children}
//     </CropImageContext.Provider>
//   )
// }

// export const useCropImage = () => useContext(CropImageContext);



export const ImageCropContext = createContext<CropImageValue>({
  image: "",
  setImage() {},
  crop: { x: 0, y: 0 },
  rotation: 0,
  zoom: 1,
  croppedAreaPixels: null,
  setRotation() {},
  setZoom() {},
  setCrop() {},
  setCroppedAreaPixels() {},
  onCropComplete() {},
  getProcessedImage() { return Promise.resolve(undefined) },
  handleZoomIn() {},
  handleZoomOut() {},
  handleRotateAntiCw() {},
  handleRotateCw() {},
  min_zoom: 1,
  max_zoom: 3,
  zoom_step: 0.1,
  min_rotation: -360,
  max_rotation: 360,
  rotation_step: 0.5,
  resetStates() {},
});

const defaultImage = null;
const defaultCrop = { x: 0, y: 0 };
const defaultRotation = 0;
const defaultZoom = 1;
const defaultCroppedAreaPixels = null;

export interface ImageCropProviderProps {
  max_zoom?: number;
  min_zoom?: number;
  zoom_step?: number;
  max_rotation?: number;
  min_rotation?: number;
  rotation_step?: number;
}

const ImageCropProvider: FC<PropsWithChildren<ImageCropProviderProps>> = ({
  children,
  max_zoom = 3,
  min_zoom = 1,
  zoom_step = 0.1,
  max_rotation = 360,
  min_rotation = 0,
  rotation_step = 5
}) => {
  const [image, setImage] = useState<string | null>(defaultImage);
  const [crop, setCrop] = useState(defaultCrop);
  const [rotation, setRotation] = useState(defaultRotation);
  const [zoom, setZoom] = useState(defaultZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(defaultCroppedAreaPixels);

  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleZoomIn = () => {
    if (zoom < max_zoom) {
      setZoom(zoom + zoom_step * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > min_zoom) {
      setZoom(zoom - zoom_step * 2);
    }
  };

  const handleRotateCw = () => {
    setRotation(rotation + rotation_step);
  };

  const handleRotateAntiCw = () => {
    setRotation(rotation - rotation_step);
  };

  const getProcessedImage = async () => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      const imageFile = new File([(croppedImage as any).file], `img-${Date.now()}.png`, {
        type: 'image/png'
      });
      return imageFile;
    }
  };

  const resetStates = () => {
    setImage(defaultImage);
    setCrop(defaultCrop);
    setRotation(defaultRotation);
    setZoom(defaultZoom);
    setCroppedAreaPixels(defaultCroppedAreaPixels);
  };

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        rotation,
        setRotation,
        crop,
        setCrop,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        handleRotateAntiCw,
        handleRotateCw,
        max_zoom,
        min_zoom,
        zoom_step,
        max_rotation,
        min_rotation,
        rotation_step,
        resetStates
      }}
    >
      {children}
    </ImageCropContext.Provider>
  );
};

export const useImageCropContext = () => useContext(ImageCropContext);

export default ImageCropProvider;
