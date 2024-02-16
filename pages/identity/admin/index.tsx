import React, { useEffect } from "react";
import Image from "next/image";
import {
  Web3Button,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { useContract } from "@thirdweb-dev/react";
import { useAddress } from "@thirdweb-dev/react";
import Link from "next/link";

export default function AdminPanel() {
  const address = useAddress();
  const contractAddress = "0x4e37BFAf5EC015B889E7631ef82277926F71457E";
  const { contract } = useContract(contractAddress);
  const { data, isLoading } = useContractRead(contract, "getAllBarcodes");
  const { mutateAsync: removeAsync } = useContractWrite(contract, "removeCode");
  const { data: dataCount } = useContractRead(contract, "getCountBarcodes");
  const PDF417 = require("pdf417-generator");
  const [barcodes, setBarcodes] = React.useState<any>([]);
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);

  useEffect(() => {
    if (data) {
      const filteredBarcodes = data.filter((barcode: any) => {
        return barcode.body != "";
      });
      setBarcodes(filteredBarcodes);
    }
  }, [data]);

  useEffect(() => {
    const adminAddresses = process.env.NEXT_PUBLIC_ADMIN_ADDRESS?.split(",");
    if (address && adminAddresses?.includes(address)) {
      setHasPermission(true);
    }
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 bg-white">

      <div className="bg-white">
        {hasPermission && (
          <>
            <h1 className="text-3xl text-center text-black font-bold">
              {dataCount && `Registered: ${dataCount} PDF417 Barcodes`}
            </h1>
            <div className="text-black font-bold text-center text-2xl">
              <Link href="/identity/admin/add">Add Barcode 📷</Link>
            </div>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-   lg:grid-cols-4">
                {barcodes &&
                  barcodes.map((barcode: any, index: any) => {
                    const canvas = document.createElement("canvas");
                    PDF417.draw(barcode[1], canvas, 3, 5);
                    const img = canvas.toDataURL("image/png");
                    return (
                      <>
                        <div className="flex flex-1 flex-col p-8">
                          <Image
                            src={img}
                            className="mx-auto flex-shrink-0"
                            key={`img-${index}`}
                            width={300}
                            height={300}
                            alt="test"
                          />
                          <p
                            key={`p-${index}`}
                            className="break-words mt-6 text-sm text-center font-medium text-gray-900"
                          >
                            #{index} Key: {barcode[0]}
                          </p>


                          <Web3Button
                            contractAddress={contractAddress}
                            className="rounded-xl px-2 w-30"
                            key={`web3-${index}`}
                            action={() => removeAsync({ args: [barcode[0]] })}
                          >
                            Remove
                          </Web3Button>
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </>
        )}
        {isLoading && <p>Loading...</p>}
      </div>

    </main >
  );
}
