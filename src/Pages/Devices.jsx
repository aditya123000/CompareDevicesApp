import React,{useEffect,useState} from 'react';
import Spinner from "../components/Global-components/Spinner";
import { getDevices } from "../Api/deviceApi";
import DeviceCard from '../components/Device-components/DeviceCard';

const Devices = () => {
  const [devices,setDevices]=useState([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    const fetchDevices=async()=>{
      try{
        const res=await getDevices();
        setDevices(res);
      }
      catch(error){
        console.error("Failed to fetch Devices",error.message);
      }
      finally{
        setLoading(false);
      }
    };

    fetchDevices();
  },[]);

  if (loading) {
    return <Spinner loading={loading} />;
  }
  if (devices.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center">
        <p className="text-gray-700 text-lg font-medium">
          No devices to display
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Please check back later or try again.
        </p>
      </div>
    );

  }

  return (
      <div className="p-6">
        {loading ? (
          <Spinner loading={loading}/>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {devices.map((device) => (
              <DeviceCard key={device.id} device={device} />
            ))}
          </div>
        )}
      </div>
  )
}

export default Devices