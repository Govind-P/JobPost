import React from 'react'

const Loading = () => {
  return (
    <div className="fixed z-100 w-screen h-screen flex items-center justify-center gap-3">
        <div className="bg-blue-500 w-5 h-5 rounded-full animate-bounce1"></div>
        <div className="bg-blue-500 w-5 h-5 rounded-full animate-bounce2"></div>
        <div className="bg-blue-500 w-5 h-5 rounded-full animate-bounce3"></div>
        <div className="bg-blue-500 w-5 h-5 rounded-full animate-bounce4"></div>
    </div>
  )
}

export default Loading;