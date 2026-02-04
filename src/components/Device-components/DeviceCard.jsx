import React from 'react'

const DeviceCard = ({device,isSelected,onToggleCompare}) => {
    const {brand,model,price,available} = device;

    if (!device || Object.keys(device).length === 0) {
        return null;
    }

  return (
    <div className='p-6 rounded-lg bg-slate-800 border border-slate-700 transition hover:border-sky-400/40'>
        <h3 className='text-lg font-semibold text-slate-50'>
            {brand} {model}
        </h3>
        {price !==undefined && (
            <p className='text-slate-300 mt-1'>
                ₹{price}
            </p>
        )}
        {available !== undefined && (
            <p className={`mt-2 text-sm font-medium ${available ? "text-emerald-400" : "text-rose-400"}`}>
                {available ? "Available" : "Out of stock"}
            </p>
        )}
        <button
            onClick={() => onToggleCompare(device)}
            className={`
                mt-4 w-full py-2 rounded-md text-sm font-medium transition
                ${
                isSelected
                    ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                    : "bg-sky-500/10 text-sky-400 hover:bg-sky-500/20"
                }
            `}
            >
            {isSelected ? "Remove from Compare" : "Add to Compare"}
        </button>
    </div>
  )
}
export default DeviceCard