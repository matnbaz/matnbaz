import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Divider } from './Divider';

export interface Props {
  children: React.ReactNode;
  show: boolean;
  title?: string;
  onClose?: () => void;
}

export const Modal = ({ children, show, title, onClose }: Props) => {
  const closeModal = () => {
    onClose && onClose();
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog onClose={onClose} open={show}>
        <div
          className="fixed z-50 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                onClick={closeModal}
                className="fixed overflow-hidden inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 backdrop-filter backdrop-blur-md transition-opacity"
                aria-hidden="true"
              ></div>
            </Transition.Child>

            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>

              <div className="inline-block p-6 align-bottom bg-white dark:bg-gray-800 rounded-lg ltr:text-left rtl:text-right overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                {title && (
                  <>
                    <div className="w-full flex items-start justify-between">
                      <h1 className="text-xl mb-4 font-semibold">{title}</h1>
                      <button onClick={closeModal}>
                        <AiOutlineClose className="w-5 h-5" />
                      </button>
                    </div>

                    <Divider className="mb-5" />
                  </>
                )}
                {children}
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
