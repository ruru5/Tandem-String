import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import Alert from "@/components/Alert";
import crypto from "crypto";
import Notification from "@/components/Notification";

export default function Scan() {
  const address = useAddress();
  const [hash, setHash] = useState("");
  const contractAddress = "0x41D0295a3D569ce352005c74a779D15A1a20026D";
  const { contract } = useContract(contractAddress);
  const [amount, setAmount] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState<any>();
  const { data: dataBarcode } = useContractRead(contract, "getBarcodeFromId", [
    address,
    hash,
  ]);
  const { mutateAsync: AddGeoAsync } = useContractWrite(contract, "addGeo");
  const [show, setShow] = useState(false);

  const {
    ref,
    torch: { status },
  } = useZxing({
    onDecodeResult(result) {
      console.log("onDecodeResult", result);
      const hash = crypto
        .createHash("sha1")
        .update(result.getText())
        .digest("hex");
      setHash(hash);
    },
  });

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

  function hasBarcodeBody() {
    return dataBarcode && dataBarcode.body != "";
  }

  async function AddGeo() {
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
      <div className="py-6 w-full md:w-8/12">
        {hash && (
          <>
            {hasBarcodeBody() && (
              <>
                <div className="flex flex-col center m-auto max-w-[640px]  align-middle content-center">
                  <Alert color="green" message="Verified On Chain"></Alert>
                  <div className="flex flex-col mt-4 md:w-full text-center align-middle content-center">
                    <input
                      type="text"
                      id="amount"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mr-2 mb-2 content-center"
                      placeholder="Add the amount of product"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />

                    <p>
                      City: {city} <br />
                      Product Code (SKU): {
                        dataBarcode.customKey.split(",")[0]
                      }{" "}
                      <br />
                      Style or Design Code:{" "}
                      {dataBarcode.customKey.split(",")[2]} <br />
                      Color Code: {dataBarcode.customKey.split(",")[3]} <br />
                      Size: {dataBarcode.customKey.split(",")[4]} <br />
                      Lot Number: {dataBarcode.customKey.split(",")[7]} <br />
                      Price: {dataBarcode.customKey.split(",")[8]} <br />
                    </p>

                    <div className="flex flex-col mt-4 text-center align-middle content-center">
                      <Web3Button
                        contractAddress={contractAddress}
                        className="rounded-xl px-2 w-30"
                        action={() => AddGeo()}
                      >
                        Add GeoLocation
                      </Web3Button>
                    </div>
                  </div>
                </div>
              </>
            )}
            {!hasBarcodeBody() && (
              <>
                <div className="flex flex-col center m-auto max-w-[640px]  align-middle content-center">
                  <Alert color="red" message="Not Verified On Chain"></Alert>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}
