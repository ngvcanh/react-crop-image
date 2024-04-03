import { Area } from "react-easy-crop";

export const DEFAULT_ACCEPT = ["image/jpg", "image/jpeg", "image/png"];

export function getAvatarUrl(path = "") {
  if (path?.match(/^https?:\/\/.+/i)) {
    return path;
  }
  return `${process.env.REACT_APP_NEXT_PUBLIC_CDN_PATH}${path}`;
}

export function parseAccept(accept: string | string[]) {
  return (Array.isArray(accept) ? accept : [accept]).join(",");
}


export function isEqualArea(prevArea: Area | null, nextArea: Area) {
  if (!prevArea) {
    return false;
  }

  return (
    prevArea.x === nextArea.x &&
    prevArea.y === nextArea.y &&
    prevArea.width === nextArea.width &&
    prevArea.height === nextArea.height
  );
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', error => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height)
  };
}

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area = { x: 0, y: 0, width: 0, height: 0 },
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) => {
  console.log(imageSrc);
  const image = await createImage(imageSrc);
  console.log(image);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  ctx.drawImage(image, 0, 0);
console.log(pixelCrop);
  const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.putImageData(data, 0, 0);

  return new Promise(resolve => {
    canvas.toBlob((file: Blob | null) => {
      resolve({ file, url: URL.createObjectURL(file!) });
    }, 'image/jpeg');
  });
};
