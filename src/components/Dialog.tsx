import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import cx from "clsx";

export type HeadlessDialogProps = {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose: (value: boolean) => void;
  onSuccess?: () => void;
  classNameTitle?: string;
  classNameWrap?: string;
};

export default function HeadlessDialog({
  title,
  children,
  className,
  isOpen,
  onClose,
  classNameTitle,
  classNameWrap,
}: HeadlessDialogProps) {
  const span = useRef<HTMLSpanElement>(null);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={cx("fixed inset-0 z-[1010] overflow-y-auto w-screen h-screen", classNameWrap)}
        onClose={onClose}
        initialFocus={span}
      >
        <div className="relative px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 w-full h-full bg-black bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true" ref={span}>
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={cx(
                "inline-block w-full z-[1020] my-14 max-w-xl overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded",
                className
              )}
            >
              {title && (
                <div className={cx("px-[12px] md:px-8 pt-8 pb-4", classNameTitle)}>
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-black">
                    {title}
                  </Dialog.Title>
                </div>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
