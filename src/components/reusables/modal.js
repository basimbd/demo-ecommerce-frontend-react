import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Modal({isOpen, closeModal, position, fullscreen, scroll, title, children}){
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className={
                    classNames(
                        (position === "center") ? "inset-0 flex items-center items-center" :
                            (position === "top") ? "top-0 inset-x-0" :
                                (position === "left") ? "inset-y-0 flex items-center" :
                                    (position === "right") ? "right-0 inset-y-0 flex items-center" :
                                        (position === "bottom") ? "bottom-0 inset-x-0" : "" ,
                        fullscreen ? "h-screen" : "h-auto",
                        "fixed z-30 overflow-y-auto"
                    )
                }
                onClose={closeModal}
            >
                <div className="text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className={classNames(
                            fullscreen ? "h-screen" : "h-auto",
                            "inline-block align-middle"
                        )}
                        aria-hidden="true"
                    >
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
                        <div className={classNames(
                            fullscreen ? "h-screen" : "h-auto",
                            scroll ? "overflow-y-scroll" : "overflow-y-auto",
                            "inline-block w-128 max-w-md p-6 text-center align-middle transition-all transform bg-white shadow-xl rounded-2xl"
                        )}
                        >
                            <div className="flex justify-end mb-2"><div className="transform rotate-45 cursor-pointer text-4xl" onClick={closeModal}>+</div></div>
                            <Dialog.Title
                                as="h3"
                                className="flex flex-row justify-between items-center text-lg font-medium leading-6 text-gray-900"
                            >
                                {title}
                            </Dialog.Title>
                            {children}
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}