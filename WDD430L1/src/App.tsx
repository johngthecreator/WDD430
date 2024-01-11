import { useState } from "react";

function App() {

  const [vin, setVin] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [carInfo, setCarInfo] = useState<CarJack|null>(null);


  interface CarJack{
    DisplacementL: string | null;
    Doors: string | null;
    EngineConfiguration: string | null;
    EngineCylinders: string | null;
    EngineHP: string | null;
    EngineModel: string | null;
    FuelTypePrimary: string | null;
    Make: string | null;
    Model: string | null;
    TransmissionSpeeds: string | null;
    TransmissionStyle: string | null;
    Trim: string | null;
  }

  const getCar = async () => {
    if(!year && !vin) return;
    const resp = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvaluesextended/${vin}?format=json&modelyear=${year}`)
    const json = await resp.json()
    setCarInfo(json.Results[0]);
  }
  return (
    <div className="bg-blue-300 h-screen w-full p-5 lg:p-24 flex flex-col justify-center items-center gap-10">
      <div className="flex flex-col w-5/6 md:w-1/4 bg-white rounded-xl p-5 h-[300px] justify-center items-center gap-3 shadow-xl">
        <h2 className="text-2xl font-bold">Learn About Your Car!</h2>
        <input className="outline p-2 rounded-xl" type="text" onChange={(e)=>setVin(e.target.value)} placeholder="Enter your Car Vin"/>
        <input className="outline p-2 rounded-xl" type="text" onChange={(e)=>setYear(e.target.value)} placeholder="Enter your Car Year"/>
        <button onClick={getCar} className="bg-blue-300 p-3 rounded-xl font-black">Fetch Car &#128663;</button>
      </div>
      {carInfo ? (
        <div className="bg-white rounded-xl w-5/6 md:w-1/2 grid grid-cols-2 p-5 font-bold shadow-xl">
          <div>
            <h2>Car Make: {carInfo?.Make}</h2>
            <h2>Car Model: {carInfo?.Model}</h2>
            <h2>Displacement (L): {carInfo?.DisplacementL}</h2>
            <h2>Doors: {carInfo?.Doors}</h2>
            <h2>Engine Configuration: {carInfo?.EngineConfiguration}</h2>
            <h2>Engine Cylinders: {carInfo?.EngineCylinders}</h2>
          </div>
          <div>
            <h2>Engine HP: {carInfo?.EngineHP}</h2>
            <h2>Engine Model: {carInfo?.EngineModel}</h2>
            <h2>Fuel Type Primary: {carInfo?.FuelTypePrimary}</h2>
            <h2>Transmission Speeds: {carInfo?.TransmissionSpeeds}</h2>
            <h2>Transmission Style: {carInfo?.TransmissionStyle}</h2>
            <h2>Trim: {carInfo?.Trim}</h2>
          </div>
        </div>
      ):(<div></div>)
      }
    </div>
  )
}

export default App
