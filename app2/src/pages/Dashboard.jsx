import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react'

function Dashboard() {
  // useEffect(()=>{
  //   const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  // })

  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  return (
    <div>
        Dashboard
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
  )
}

export default Dashboard