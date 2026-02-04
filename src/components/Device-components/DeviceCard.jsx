import React from 'react'

const DeviceCard = ({device}) => {
    const {brand,model,price,available} = device;

    if (!device || Object.keys(device).length === 0) {
        return null;
    }

  return (
    <div className='border rounded-lg p-4'>
        <h3 className='font-semibold text-lg'>
            {brand} {model}
        </h3>
        {price !==undefined && (
            <p className='text-gray-600 mt-1'>
                ₹{price}
            </p>
        )}
        {available !== undefined && (
            <p className={`mt-2 text-sm ${available ? "text-green-600" : "text-red-600"}`}>
                {available ? "Available" : "Out of stock"}
            </p>
        )}
    </div>
  )
}
export default DeviceCard