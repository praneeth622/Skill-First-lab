import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function Navabar() {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            className="w-8 h-8 text-white p-2 bg-indigo-500 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
          <span className="ml-3 text-lg">Tailblocks</span>
        </a>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-3 hover:text-gray-900">First Link</a>
          <a className="mr-3 hover:text-gray-900">Second Link</a>
          <a className="mr-3 hover:text-gray-900">Third Link</a>
          <a className="mr-3 hover:text-gray-900">Fourth Link</a>
        </nav>
        {isAuthenticated ? (
            <div className='flex-col'>
            <div>
              <div className='flex items-center space-x-4'>
                <p className="text-sm">{user.name}</p>
                <img src={user.picture} className='rounded-full w-8 h-8' alt={user.name} />
              </div>
              <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="inline-flex items-center bg-gray-100 border-0 py-1 px-2 focus:outline-none hover:bg-gray-200 mr-3 rounded text-sm mt-4 md:mt-0">
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
      
    </header>
  );
}
