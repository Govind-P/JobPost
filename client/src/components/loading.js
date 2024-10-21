import React from 'react'

const Loading = () => {
  return (
    <div className="fixed  opacity-80 top-0 left-0 z-50 w-screen h-screen flex items-center justify-center gap-3">
        <div className="bg-blue-800 w-5 h-5 rounded-full animate-bounce1 z-100"></div>
        <div className="bg-blue-800 w-5 h-5 rounded-full animate-bounce2 z-100"></div>
        <div className="bg-blue-800 w-5 h-5 rounded-full animate-bounce3 z-100"></div>
        <div className="bg-blue-800 w-5 h-5 rounded-full animate-bounce4 z-100"></div>
    </div>
  )
}

export default Loading;