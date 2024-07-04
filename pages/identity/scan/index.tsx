import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import Alert from "@/components/Alert";
import BarcodeDescription from "@/components/Description";
import crypto from "crypto";

export default function Scan() {
  const address = useAddress();
  const [hash, setHash] = useState("");
  const contractAddress = "0xDF009b364aEBC5241Ac74124F8188a182069e95d";
  const { contract } = useContract(contractAddress);
  const [barcodeData, setBarcodeData] = useState<any>();
  const { data: dataBarcode } = useContractRead(contract, "getBarcodeFromId", [
    hash,
  ]);
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
      processCode(result.getText());
    },
  });

  function processCode(code: string) {
    let output: any = { data: [] };
    code.split("\n").forEach((line, index) => {
      switch (index) {
        case 0:
        case 5:
        case 7:
        case 8:
        case 9:
        case 12:
        case 13:
        case 17:
        case 18:
        case 19:
          break;
        case 1:
          output.data.push({
            name: "DL Number",
            value: line.replace("ANSI 6360050101DL00300203DLDAQ", ""),
          });
          break;
        case 2:
          output.data.push({ name: "Name", value: line.replace("DAA", "") });
          break;
        case 3:
          output.data.push({ name: "Address", value: line.replace("DAG", "") });
          break;
        case 4:
          output.data.push({ name: "City", value: line.replace("DAI", "") });
          break;
        case 6:
          output.data.push({
            name: "Full ZIP code",
            value: line.replace("DAK", ""),
          });
          break;
        case 10:
          output.data.push({ name: "Height", value: line.replace("DAU", "") });
          break;
        case 11:
          output.data.push({ name: "Weight", value: line.replace("DAW", "") });
          break;
        case 14:
          output.data.push({
            name: "Expiration Date",
            value: line.replace("DBA", ""),
          });
          break;
        case 15:
          output.data.push({
            name: "Date Of Birth",
            value: line.replace("DBB", ""),
          });
          break;
        case 16:
          output.data.push({
            name: "Gender",
            value: line.replace("DBC", "") == "1" ? "M" : "F",
          });
          break;
      }
    });
    setBarcodeData(output.data);
  }

  function hasBarcodeBody() {
    return dataBarcode && dataBarcode.body != "";
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
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
                <Alert color="green" message="Verified On Chain"></Alert>
              </>
            )}
            {!hasBarcodeBody() && (
              <>
                <Alert color="red" message="Not Verified On Chain"></Alert>
              </>
            )}
          </>
        )}
        <BarcodeDescription data={barcodeData} />
      </div>
    </main>
  );
}
