import { ChangeEvent, FC, useRef, useState } from "react";
import { useCropImage } from "./Context";
import { DEFAULT_ACCEPT, parseAccept } from "./utils";
import { CropImageForm } from "./CropImageForm";
import clsx, { ClassValue } from "clsx";
import HeadlessDialog from "../components/Dialog";
import { CropImageButton } from "./CropImageButton";

export interface ToolbarBehavior {
  onClickChooseFile(): void;
}

export interface CropImageProps {
  className?: ClassValue;
  viewSize?: number;
  getToolbar?(behavior: ToolbarBehavior): JSX.Element;
}

const getDefaultToolbar = ({ onClickChooseFile }: ToolbarBehavior) => (
  <div>
    <button type="button" onClick={onClickChooseFile}>Sửa</button>
  </div>
);

export const CropImage: FC<CropImageProps> = (props) => {
  const { className, viewSize = 80, getToolbar = getDefaultToolbar } = props;
  const { image, setImage } = useCropImage();

  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImage(file);
    setIsOpen(!!file);
  }
  const handleClickChooseFile = () => inputRef.current?.click();

  const handleCloseDialog = () => {
    setIsOpen(false);
    setImage(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className={clsx(className)}>
      <style>{`
        .input-range {
          -webkit-appearance: none;
          -moz-appearance: none;
          height: 2px;
          border-top: 1px solid #999;
          border-bottom: 1px solid #999;
          background: #3f51b5;
          width: 100%;
        }
        .input-range::-moz-range-thumb {
          -webkit-appearance: none;
          -moz-appearance: none;
          border: 1px solid #3f51b5;
          background: #3f51b5;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
        .input-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          -moz-appearance: none;
          border: 1px solid #3f51b5;
          background: #3f51b5;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          transition: box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        }
      `}</style>
      <div className="flex items-center gap-4">
        <div className="object-cover" style={{ width: viewSize, height: viewSize }}>
          {image ? <img alt="cropper wrapper" className="object-cover w-full h-full rounded-full" src={image} /> : null}
        </div>
        <input
          ref={inputRef}
          className="hidden"
          type="file"
          accept={parseAccept(DEFAULT_ACCEPT)}
          onChange={handleChangeFile}
        />
        {getToolbar({ onClickChooseFile: handleClickChooseFile })}
      </div>
      <HeadlessDialog
        isOpen={isOpen}
        onClose={handleCloseDialog}
        className="w-[450px]"
        title="Cập nhật ảnh đại diện"
        classNameTitle="!py-4"
      >
        <CropImageForm />
        <CropImageButton onCancel={handleCloseDialog} />
      </HeadlessDialog>
    </div>
  );
};