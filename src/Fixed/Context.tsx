import { FC, PropsWithChildren, createContext, useCallback, useContext, useMemo, useState } from "react";
import { Area } from "react-easy-crop";
import { getAvatarUrl, getCroppedImg, isEqualArea } from "./utils";

export type Point = Pick<Area, "x" | "y">;

export interface CropImageValue {
  image: string;
  setImage(image: File | null): void;
  crop: Point;
  setCrop(value: Point): void;
  rotation: number;
  setRotation(value: number): void;
  minRotation: number;
  maxRotation: number;
  rotationStep: number;
  zoom: number;
  setZoom(value: number): void;
  minZoom: number;
  maxZoom: number;
  zoomStep: number;
  croppedAreaPixels: Area | null;
  setCroppedAreaPixels(area: Area | null): void;
  handleCropComplete(croppedArea: Area, nextCroppedPixels: Area): void;
  getProcessedImage(): Promise<File | undefined>;
  handleZoomIn(): void;
  handleZoomOut(): void;
  // handleRotateAntiCw(): void;
  // handleRotateCw(): void;
  // max_zoom: number;
  // min_zoom: number;
  // zoom_step: number;
  // max_rotation: number;
  // min_rotation: number;
  // rotation_step: number;
  resetStates(): void;
  cropSize: number;
}

const CropImageContext = createContext<CropImageValue>({
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
  handleCropComplete() {},
  getProcessedImage() { return Promise.resolve(undefined) },
  handleZoomIn() {},
  handleZoomOut() {},
  // handleRotateAntiCw() {},
  // handleRotateCw() {},
  minZoom: 1,
  maxZoom: 3,
  zoomStep: 0.1,
  minRotation: -360,
  maxRotation: 360,
  rotationStep: 0.5,
  resetStates() {},
  cropSize: 300,
});

export interface CropImageProviderProps {
  oldImage?: string;
  defaultZoom?: number;
  defaultRotation?: number;
  defaultCrop?: Point;
  maxZoom?: number;
  minZoom?: number;
  zoomStep?: number;
  maxRotation?: number;
  minRotation?: number;
  rotationStep?: number;
  cropSize?: number;
}

export const DEFAULT_CROP = { x: 0, y: 0 };

export const CropImageProvider: FC<PropsWithChildren<CropImageProviderProps>> = (props) => {
  const {
    children,
    oldImage,
    defaultZoom = 1,
    defaultRotation = 0,
    defaultCrop = DEFAULT_CROP,
    maxZoom = 3,
    minZoom = 1,
    zoomStep = 0.1,
    minRotation = -360,
    maxRotation = 360,
    rotationStep = 0.5,
    cropSize = 300,
  } = props;

  const [file, setFile] = useState<File | null>(null);
  const [zoom, setZoom] = useState(defaultZoom);
  const [rotation, setRotation] = useState(defaultRotation);
  const [crop, setCropValue] = useState(defaultCrop);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const setImage = (file: File | null) => setFile(file);
  const image = useMemo(
    () => (file ? URL.createObjectURL(file) : oldImage ? getAvatarUrl(oldImage) : ""),
    [file, oldImage]
  );

  const handleCropComplete = useCallback((_: Area, nextAreaPixels: Area) => {
    console.log(nextAreaPixels);
    isEqualArea(croppedAreaPixels, nextAreaPixels) || setCroppedAreaPixels(nextAreaPixels);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCrop = (point: Point) => {
    if (point.x !== crop.x || point.y !== crop.y) {
      setCropValue(point);
    }
  }

  const getProcessedImage = async () => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels, rotation);
      const imageFile = new File([(croppedImage as any).file], `img-${Date.now()}.png`, {
        type: 'image/png'
      });
      return imageFile;
    }
  };

  const handleZoomIn = () => {
    if (zoom < maxZoom) {
      setZoom(zoom + zoomStep * 2);
    }
  };

  const handleZoomOut = () => {
    if (zoom > minZoom) {
      setZoom(zoom - zoomStep * 2);
    }
  };

  const resetStates = () => {
    setImage(null);
    setCrop(defaultCrop);
    setRotation(defaultRotation);
    setZoom(defaultZoom);
    setCroppedAreaPixels(null);
  };

  return (
    <CropImageContext.Provider
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
        handleCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        // handleRotateAntiCw,
        // handleRotateCw,
        maxZoom,
        minZoom,
        zoomStep,
        maxRotation,
        minRotation,
        rotationStep,
        resetStates,
        cropSize,
      }}
    >
      {children}
    </CropImageContext.Provider>
  );
};

export const useCropImage = () => useContext(CropImageContext);
