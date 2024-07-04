import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import crypto from "crypto";
import { useContractWrite, useContract, Web3Button } from "@thirdweb-dev/react";
import Notification from "@/components/Notification";

export default function AddPanel() {
  const {
    ref,
    torch: { status },
  } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
      const hash = crypto
        .createHash("sha1")
        .update(result.getText())
        .digest("hex");
      setHash(hash);
    },
  });

  const [result, setResult] = useState("");
  const [hash, setHash] = useState("");

  const contractAddress = "0x41D0295a3D569ce352005c74a779D15A1a20026D";
  const { contract } = useContract(contractAddress);
  const { mutateAsync: addBarcodeAsync } = useContractWrite(
    contract,
    "addBarcode"
  );
  const { mutateAsync: AddGeoAsync } = useContractWrite(contract, "addGeo");

  const [productCode, setProductCode] = useState("");
  const [manufacturerInfo, setManufacturerInfo] = useState("");
  const [designCode, setDesignCode] = useState("");
  const [colorCode, setColorCode] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [country, setCountry] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const [show, setShow] = useState(false);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<any>();

  const fetchApiData = async ({ latitude, longitude }: any) => {
    // TODO - Add error handling
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=locality&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );
    const data = await res.json();
    setCity(data.results[0].formatted_address);
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude }: any = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  useEffect(() => {
    if (location && !city) {
      fetchApiData(location);
    }
  }, [location, city]);

  async function addBarcode() {
    const customKey = `${productCode}, ${manufacturerInfo}, ${designCode}, ${colorCode}, ${size}, ${material}, ${country}, ${lotNumber}, ${price}`;
    await addBarcodeAsync({
      args: [hash, result, customKey, Date.now()],
    });

    await AddGeoAsync({
      args: [
        hash,
        {
          barcodeId: hash,
          geo: `${location.latitude},${location.longitude}`,
          city: city,
          date: Date.now(),
          amount: amount,
        },
      ],
    });
    setShow(true);

    setTimeout(() => {
      setShow(false);
    }, 5000);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Notification show={show} setShow={setShow}></Notification>
      <video ref={ref} autoPlay={true} />
      {status == "idle" && (
        <>
          <p>Loading...</p>
        </>
      )}
      <div className="m-4 md:w-4/12">
        <p>Result: {result}</p>
        <p>Hash: {hash}</p>
        <br />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Product Code (SKU)"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Manufacturer Information"
          value={manufacturerInfo}
          onChange={(e) => setManufacturerInfo(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Style or Design Code"
          value={designCode}
          onChange={(e) => setDesignCode(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Color Code"
          value={colorCode}
          onChange={(e) => setColorCode(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Material Composition"
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Country of Origin"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Lot Number"
          value={lotNumber}
          onChange={(e) => setLotNumber(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="m-2 md:w-4/12">
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2"
          placeholder="Add the amount of product"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <Web3Button contractAddress={contractAddress} action={() => addBarcode()}>
        Add Barcode
      </Web3Button>
    </main>
  );
}
