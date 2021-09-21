import {Fragment, useContext, useState} from 'react'
import {Link} from "react-router-dom";

import { Popover, Transition } from '@headlessui/react'
import {ChevronDownIcon, MenuIcon, XIcon} from '@heroicons/react/solid'

import mens_clothing from '../../icons/mens_clothing.svg'
import jewelry from '../../icons/jewelry.svg'
import electronics from '../../icons/electronics.svg'
import womens_clothing from '../../icons/womens_clothing.svg'

import DSILogo from '../../logo/dsi.logo.png'

import CheckoutModal from "../checkout/CheckoutModal";
import {useSelector} from "react-redux";
import {calculateSelectedProducts} from "../../utils/calculations"


const categories = [
    {
        name: 'Men\'s Clothing',
        description: 'From everyday undershirt to a your suit.',
        href: '#',
        icon: mens_clothing,
    },
    {
        name: 'Jewelry',
        description: 'Jewelry to fit every budget, occasion, and taste.',
        href: '#',
        icon: jewelry,
    },
    {
        name: 'Electronics',
        description: "One destination, for all your electronic needs.",
        href: '#',
        icon: electronics,
    },
    {
        name: 'Women\'s Clothing',
        description: 'No second thought for elegance and fashion.',
        href: '#',
        icon: womens_clothing,
    },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const selectedProducts = useSelector(state => state.cart)
    /*const [selectedProducts] = useContext(ProductsContext)*/

    /*const calculateSelectedProducts = () => {
        let sum = 0;
        selectedProducts.forEach(({price, selectedAmount}) => ( sum += selectedAmount ) );
        return sum;
    }*/

    function closeMenu(){
        setMenuOpen(false)
    }

    function openMenu(){
        setMenuOpen(true)
    }

    function toggleMenu(){
        setMenuOpen(prevMenuOpen => {
            setMenuOpen(!prevMenuOpen)
        })
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <Popover className="relative bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">

                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <MenuIcon className="z-20 w-8 h-8 cursor-pointer md:hidden" onClick={toggleMenu}/>
                        <Popover.Group as="div">
                            <Transition
                                as={Fragment}
                                show={menuOpen}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className={classNames(menuOpen ? 'flex'  : 'hidden',
                                    'absolute top-2 left-0 z-10 w-screen bg-white')}>
                                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                        <div className="flex justify-end p-4"><div className="transform rotate-45 text-5xl cursor-pointer" onClick={closeMenu}>+</div></div>
                                        <div className="relative flex flex-col w-screen bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                            <Popover className="relative">
                                                {({ open }) => (
                                                    <>
                                                        <Popover.Button
                                                            className={classNames(
                                                                open ? 'text-gray-900' : 'text-gray-500',
                                                                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                                            )}
                                                        >
                                                            <span>Categories</span>
                                                            <ChevronDownIcon
                                                                className={classNames(
                                                                    open ? 'text-gray-600' : 'text-gray-400',
                                                                    'ml-2 h-5 w-5 group-hover:text-gray-500'
                                                                )}
                                                                aria-hidden="true"
                                                            />
                                                        </Popover.Button>

                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-200"
                                                            enterFrom="opacity-0 translate-y-1"
                                                            enterTo="opacity-100 translate-y-0"
                                                            leave="transition ease-in duration-150"
                                                            leaveFrom="opacity-100 translate-y-0"
                                                            leaveTo="opacity-0 translate-y-1"
                                                        >
                                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                                    {categories.map((item) => (
                                                                        <a
                                                                            key={item.name}
                                                                            href={item.href}
                                                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                                        >
                                                                            <img
                                                                                className="flex-shrink-0 h-6 w-6"
                                                                                src={item.icon}
                                                                                alt={item.name}
                                                                            />
                                                                            <div className="ml-4">
                                                                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                                            </div>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </Transition>
                                                    </>
                                                )}
                                            </Popover>
                                            <Link to="/about_us" className="w-max text-base mx-auto my-5 font-medium text-gray-500 hover:text-gray-900" onClick={closeMenu}>
                                                About Us
                                            </Link>
                                            <Link to="/faq" className="w-max text-base mx-auto font-medium text-gray-500 hover:text-gray-900" onClick={closeMenu}>
                                                FAQ
                                            </Link>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover.Group>
                        <Link className="flex items-center" to="/">
                            <img
                                className="h-8 w-auto sm:h-10"
                                src={DSILogo}
                                alt=""
                            />
                            <span  className="ml-2">COMMERCE</span>
                        </Link>
                    </div>
                    <Popover.Group as="nav" className="hidden md:flex space-x-10">
                        <Popover className="relative">
                            {({ open }) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        )}
                                    >
                                        <span>Categories</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {categories.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                        >
                                                            <img
                                                                className="flex-shrink-0 h-6 w-6"
                                                                src={item.icon}
                                                                alt={item.name}
                                                            />
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>

                        <Link to="/about_us" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            About Us
                        </Link>
                        <Link to="/faq" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            FAQ
                        </Link>
                    </Popover.Group>
                    <div className="flex items-center justify-end md:flex-1 lg:w-0">
                        <button
                            type="button"
                            onClick={openModal}
                            className="whitespace-nowrap inline-flex items-center justify-center border border-transparent rounded-md bg-transparent"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 20 20" fill="#5146e5">
                                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                            </svg>
                            <span>{Object.keys(selectedProducts).length ? `${calculateSelectedProducts()}` : null}</span>
                        </button>
                    </div>
                </div>
            </div>

            <CheckoutModal isOpen={isOpen} closeModal={closeModal}/>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {categories.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                        >
                                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}