import React from "react";
import { useNavigate } from "react-router-dom";
import DeviceImage from "../../components/DeviceImage";
import { FiHeart } from "react-icons/fi";
import { useAuth } from "../../context/useAuth";
import { addFavorite } from "../../Api/libraryApi";

const DeviceCard = ({ device, isSelected, onToggleCompare }) => {
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [saved, setSaved] = React.useState(false);

  if (!device || typeof device !== "object" || Object.keys(device).length === 0) {
    return null;
  }

  const { id, brand, model, price, available } = device;

  return (
    <article
      onClick={() => navigate(`/devices/${id}`)}
      className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-sky-400/40 dark:border-slate-700/80 dark:bg-slate-800/40"
    >
      <DeviceImage
        src={device.image}
        alt={`${device?.brand ?? 'Unknown Brand'} ${device.model}`}
        variant="card"
        className="h-28"
      />

      <h3 className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-50">
        {brand} {model}
      </h3>

      <div className="mt-2 flex items-center justify-between">
        {price !== undefined ? (
          <p className="text-sm text-slate-600 dark:text-slate-300">Rs {price}</p>
        ) : (
          <span />
        )}
        {available !== undefined && (
          <p
            className={`text-xs font-medium ${
              available ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {available ? "Available" : "Out of stock"}
          </p>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleCompare(device);
        }}
        className={`mt-4 w-full rounded-md py-2 text-sm font-medium transition ${
          isSelected
            ? "bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 dark:text-rose-300"
            : "bg-sky-500/10 text-sky-600 hover:bg-sky-500/20 dark:text-sky-300"
        }`}
      >
        {isSelected ? "Remove from Compare" : "Add to Compare"}
      </button>
      {isAuthenticated && (
        <button
          type="button"
          onClick={async (event) => { event.stopPropagation(); await addFavorite(id, token); setSaved(true); }}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md py-2 text-sm font-medium text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-500 dark:text-slate-300"
        >
          <FiHeart className={saved ? "fill-rose-500 text-rose-500" : ""} /> {saved ? "Saved to Library" : "Save to Library"}
        </button>
      )}
    </article>
  );
};

export default DeviceCard;
