import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Web3Button,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";
import Search from "@/components/Search";
import Datepicker from "react-tailwindcss-datepicker";
import Toggle from "@/components/Toggle";

export default function DashboardPanel() {
  const address = useAddress();
  const contractAddress = "0x41D0295a3D569ce352005c74a779D15A1a20026D";
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getAllBarcodes", [
    address,
  ]);
  const { mutateAsync: removeAsync } = useContractWrite(contract, "removeCode");
  const { data: dataCount } = useContractRead(contract, "getCountBarcodes", [
    address,
  ]);
  const { data: dataGeo } = useContractRead(contract, "getGeo", [address]);
  const [barcodes, setBarcodes] = React.useState<any>([]);
  const [showGeo, setShowGeo] = React.useState<any>(false);
  const [geoLocation, setGeoLocation] = React.useState<any>([]);
  const [geoLocationFiltered, setGeoLocationFiltered] = React.useState<any>([]);
  const [input, setInput] = React.useState<any>("");

  const [dateField, setDateField] = useState<any>();

  useEffect(() => {
    if (data && !input) {
      const filteredBarcodes = data.filter((barcode: any) => {
        return barcode.body != "";
      });

      if (barcodes.length == 0) {
        setBarcodes(filteredBarcodes);
      }
    }
  }, [data]);

  useEffect(() => {
    if (dataGeo && data) {
      let filteredBarcodes: any[] = [];
      dataGeo.forEach((geo: any) => {
        filteredBarcodes.push(...geo);
      });

      const filteredGeo = filteredBarcodes
        .filter((geo: any) => {
          return geo.date != "";
        })
        .filter((geo: any) => {
          return (
            data.filter((x: any) => x.body != "" && x.id == geo.barcodeId)
              .length > 0
          );
        })
        .sort((a: any, b: any) => {
          return (
            new Date(b.date.toNumber()).getTime() -
            new Date(a.date.toNumber()).getTime()
          );
        });

      if (geoLocation.length == 0) {
        setGeoLocation(filteredGeo);
      }

      if (geoLocationFiltered.length == 0) {
        setGeoLocationFiltered(filteredGeo);
      }
    }
  }, [dataGeo, data]);

  function filterGeoLocation(dateFieldNewValue: any) {
    return geoLocation.filter((geoLocationBarcode: any) => {
      const barcodeDataFiltered = barcodes.filter((x: any) => {
        return x.id == geoLocationBarcode.barcodeId;
      })[0];

      if (
        input &&
        !geoLocationBarcode.city.includes(input) &&
        !geoLocationBarcode.amount.includes(input) &&
        !barcodeDataFiltered?.customKey?.includes(input)
      ) {
        return false;
      }

      if (dateFieldNewValue) {
        const startDate = `${dateFieldNewValue.startDate}T00:00:00`;
        const endDate = `${dateFieldNewValue.endDate}T23:59:00`;
        const date = new Date(geoLocationBarcode.date.toNumber()).getTime();

        if (
          date <= new Date(startDate).getTime() ||
          date >= new Date(endDate).getTime()
        ) {
          return false;
        }
      }

      return true;
    });
  }

  function filterBarcodes(dateFieldNewValue: any) {
    let filteredBarcodes = data.filter((barcode: any) => {
      return barcode.body != "" && barcode.customKey.includes(input);
    });

    if (dateFieldNewValue) {
      const startDate = `${dateFieldNewValue.startDate}T00:00:00`;
      const endDate = `${dateFieldNewValue.endDate}T23:59:00`;

      filteredBarcodes = filteredBarcodes.filter((barcode: any) => {
        const date = new Date(barcode.date.toNumber()).getTime();
        return (
          date >= new Date(startDate).getTime() &&
          date <= new Date(endDate).getTime()
        );
      });
    }

    return filteredBarcodes;
  }

  const search = ({ dateFieldNewValue }: any) => {
    if (input || dateFieldNewValue) {
      if (showGeo) {
        const filteredData = filterGeoLocation(dateFieldNewValue);
        setGeoLocationFiltered(filteredData);
      } else {
        const filteredData = filterBarcodes(dateFieldNewValue);
        setBarcodes(filteredData);
      }
    } else {
      const filteredBarcodes = data.filter((barcode: any) => {
        return barcode.body != "";
      });
      setBarcodes(filteredBarcodes);
      setGeoLocationFiltered(geoLocation);
    }
  };

  const handleDateFieldChange = (dateFieldNewValue: any) => {
    setDateField(dateFieldNewValue);
    search({ dateFieldNewValue });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 bg-white">
      <div className="bg-white">
        <h1 className="text-3xl text-center text-black font-bold">
          {dataCount && `Registered: ${dataCount} Barcodes`}
        </h1>
        <div className="text-black font-bold text-center text-2xl">
          <Link href="/traceability/dashboard/add">Add Barcode 📷</Link>
        </div>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <Search
            input={input}
            setInput={setInput}
            searchAction={() => search({ dateFieldNewValue: dateField })}
          ></Search>

          <div className="flex flex-row space-x-2">
            <div className="flex-1">
              <Datepicker value={dateField} onChange={handleDateFieldChange} />
            </div>
            <Toggle enabled={showGeo} setEnabled={setShowGeo}></Toggle>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols- lg:grid-cols-4">
            {!showGeo &&
              barcodes &&
              barcodes.map((barcode: any, index: any) => {
                const canvas = createCanvas(200, 200);
                JsBarcode(canvas, barcode[1]);
                return (
                  <>
                    <div className="flex flex-1 flex-col p-8">
                      <Image
                        className="center m-auto"
                        src={canvas.toDataURL()}
                        alt={""}
                        width={200}
                        height={200}
                      />
                      <p
                        key={`p-${index}`}
                        className="break-words mt-6 text-sm text-center font-medium text-gray-900"
                      >
                        #{index} Key: {barcode[0]} <br />
                        Product Code (SKU): {
                          barcode.customKey.split(",")[0]
                        }{" "}
                        <br />
                        Style or Design Code: {
                          barcode.customKey.split(",")[2]
                        }{" "}
                        <br />
                        Color Code: {barcode.customKey.split(",")[3]} <br />
                        Size: {barcode.customKey.split(",")[4]} <br />
                        Lot Number: {barcode.customKey.split(",")[7]} <br />
                        Price: {barcode.customKey.split(",")[8]} <br />
                      </p>

                      <div className="flex flex-col center mt-2">
                        <Web3Button
                          contractAddress={contractAddress}
                          className="rounded-xl px-2 w-30"
                          key={`web3-${index}`}
                          action={() => removeAsync({ args: [barcode[0]] })}
                        >
                          Remove
                        </Web3Button>
                      </div>
                    </div>
                  </>
                );
              })}

            {showGeo &&
              dataGeo &&
              geoLocationFiltered &&
              geoLocationFiltered.map((barcode: any, index: any) => {
                const barcodeData = barcodes.filter(
                  (x: any) => x.id == barcode.barcodeId
                )[0];

                if (!barcodeData) {
                  return <></>;
                }
                const canvas = createCanvas(200, 200);
                JsBarcode(canvas, barcodeData[1]);
                return (
                  <>
                    <div className="flex flex-1 flex-col p-8">
                      <Image
                        className="center m-auto"
                        src={canvas.toDataURL()}
                        alt={""}
                        width={200}
                        height={200}
                      />
                      <p
                        key={`p-${index}`}
                        className="break-words mt-6 text-sm text-center font-medium text-gray-900"
                      >
                        Amount: {barcode.amount} <br />
                        City: {barcode.city} <br />
                        Scanned Date:{" "}
                        {new Date(barcode.date.toNumber()).toDateString()}{" "}
                        <br />
                        Product Code (SKU):{" "}
                        {barcodeData.customKey.split(",")[0]} <br />
                      </p>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        {isLoading && <p>Loading...</p>}
      </div>
    </main>
  );
}
