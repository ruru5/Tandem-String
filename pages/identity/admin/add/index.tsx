import React, { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import crypto from "crypto";
import { useAddress } from "@thirdweb-dev/react";
import { useContractWrite, useContract, Web3Button } from "@thirdweb-dev/react";
import BarcodeDescription from "@/components/Description";
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
      processCode(result.getText());
    },
  });

  const [barcodeData, setBarcodeData] = useState<any>();
  const [result, setResult] = useState("");
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const [hash, setHash] = useState("");

  const address = useAddress();
  const contractAddress = "0xDF009b364aEBC5241Ac74124F8188a182069e95d";
  const { contract } = useContract(contractAddress);
  const { mutateAsync: addBarcodeAsync } = useContractWrite(
    contract,
    "addBarcode"
  );
  const [show, setShow] = useState(false);

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

  async function AddBarcode() {
    await addBarcodeAsync({ args: [hash, result] });
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }

  useEffect(() => {
    const adminAddresses = process.env.NEXT_PUBLIC_ADMIN_ADDRESS?.split(",");
    if (address && adminAddresses?.includes(address)) {
      setHasPermission(true);
    } else {
      setHasPermission(false);
    }
  }, [address]);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Notification show={show} setShow={setShow}></Notification>
      <video ref={ref} autoPlay={true} />
      {hasPermission && (
        <>
          {status == "idle" && (
            <>
              <p>Loading...</p>
            </>
          )}
          <div className="py-6 w-full md:w-8/12">
            <BarcodeDescription data={barcodeData} className="" />
          </div>
          <Web3Button
            contractAddress={contractAddress}
            action={() => AddBarcode()}
          >
            Add Barcode
          </Web3Button>
        </>
      )}
    </main>
  );
}
