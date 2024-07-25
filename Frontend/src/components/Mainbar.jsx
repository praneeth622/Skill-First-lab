import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

function Mainbar() {
    const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
    return (
        <div>
            <nav className="bg-white border-b border-gray-200 px-4 py-2.5   fixed left-0 right-0 top-0 z-50">
                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex justify-start items-center">

                        <a
                            href="https://flowbite.com"
                            className="flex items-center justify-between mr-4"
                        >
                            <img
                                src="https://flowbite.s3.amazonaws.com/logo.svg"
                                className="mr-3 h-8"
                                alt="Flowbite Logo"
                            />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap">
                                Flowbite
                            </span>
                        </a>

                    </div>
                    <div className="flex items-center lg:order-2">
                        <button
                            type="button"
                            data-drawer-toggle="drawer-navigation"
                            aria-controls="drawer-navigation"
                            className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 "
                        >
                            <span className="sr-only">Toggle search</span>
                            <svg
                                aria-hidden="true"
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                />
                            </svg>
                        </button>


                        {/* {Profile} */}
                        {isAuthenticated ? (
                            <div className='flex'>
                                <div className='flex p-2'>
                                    <div className='flex items-center space-x-3'>
                                        <p className="text-m">{user.name}</p>
                                        <img src={user.picture} className='rounded-full w-8 h-8' alt={user.name} />
                                    </div>
                                    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="inline-flex items-center ml-5 bg-gray-100 border-0 py-1 px-2 focus:outline-none hover:bg-gray-200 mr-3 rounded text-sm mt-4 md:mt-0">
                                        Logout
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            className="w-4 h-4 ml-1"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => loginWithRedirect()} className="inline-flex items-center mr-3 bg-gray-100 border-0 py-1 px-2 focus:outline-none hover:bg-gray-200 rounded text-sm mt-4 md:mt-0">
                                LogIn
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    className="w-4 h-4 ml-1"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>

                        )}

                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Mainbar