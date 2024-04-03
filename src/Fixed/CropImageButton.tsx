import { FC } from "react";
import { getCroppedImg } from "./utils";
import { useCropImage } from "./Context";

export interface CropImageButtonProps {
  onCancel(): void;
}

export const CropImageButton: FC<CropImageButtonProps> = (props) => {
  const { onCancel } = props;
  const { image, croppedAreaPixels, rotation, resetStates } = useCropImage();

  const handleUpdate = async () => {
    const avatar = await getCroppedImg(image, croppedAreaPixels ?? undefined, rotation);
    console.log(avatar);

    const toBase64 = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });

    const cropped = new File([(avatar as any).file as Blob], "image.png", { type: "image/png" });

    const imgBase64 = await toBase64(cropped);

    const link = document.createElement("a");
    link.setAttribute("download", "image.png");
    link.setAttribute("href", imgBase64?.replace("image/png", "image/octet-stream"));
    link.click();


    resetStates();
    onCancel();
  };

  return (
    <div className="flex gap-8 justify-center py-4 border-t border-gray-200 px-8">
        <button
          type="button"
          className="flex items-center justify-center border px-8 py-3 h-10 w-full text-sm font-semibold rounded-sm"
          onClick={onCancel}
        >
          Huỷ bỏ
        </button>
        <button
          type="button"
          className="flex items-center justify-center px-8 py-3 bg-primary text-white h-10 w-full text-sm font-semibold border-none tracking-[-0.5px] rounded-sm bg-blue-500"
          onClick={handleUpdate}
        >
          Cập nhật
        </button>
      </div>
  );
}