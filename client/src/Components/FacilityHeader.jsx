import React from 'react'

const FacilityHeader = () => {
  return (
    <div className="bg-blue-900 text-white py-4 px-6">
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">{"Kooda Vala"}</h1>
          <p className="text-sm">{"dk@gmail.com"}</p>
        </div>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Show All Requests
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default FacilityHeader
