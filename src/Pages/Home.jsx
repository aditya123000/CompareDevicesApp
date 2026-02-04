import React,{useEffect,useState} from "react";
import Header from "../components/Global-components/Header";
import Spinner from "../components/Global-components/Spinner";
import { getDevices } from "../Api/deviceApi";

const Home = () => {
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

  return (
    <>
      <Header/>

      <div className="p-6">
        {loading ? (
          <Spinner loading={loading}/>
        ) : (
          <ul>
            {devices.map((device)=>(
              <li key={String(device.id)}>
                {device.brand} {device.model} - ₹{device.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Home;
