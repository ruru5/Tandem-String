import Image from "next/image";
import Link from "next/link";

export default function Home({}) {
  return (
    <main className={`flex min-h-screen flex-col items-center p-10`}>
      <div>
        <div className="flex justify-center">
          <div className="container mt-3xl mb-3xl">
            <div className="row">
              <div className="flex justify-center column align-center rounded-lg p-4">
                <Image
                  src={"/images/brandname.png"}
                  alt="logo-clusters"
                  className="w-8/12"
                  width={300}
                  height={300}
                />
                <br />
                <p className="text-4xl text-center max-w-lg">
                  {" "}
                  Tandem String: Precision In Every Pixel
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center pb-10">
          <button className="button xl main mt-lg w-button text-right bg-black " onClick={()=>{ window.location.href = `/whitepaper.pdf`}}>
            {" "}
            WHITEPAPER
          </button>
        </div>

        <div className="flex flex-row align-center">
          <div className="basis-1/2 align-center">
            <div className="section bg-white">
              <div className="container">
                <div className="row">
                  <div className="column align-center">
                    <h2 className="max-w-lg text-center">
                      Identity Verification
                    </h2>
                    <p className="text-lg text-center max-w-md">
                      {`Tandem String integrates blockchain technology
                      encrypted into PDF417 barcodes to seamlessly enhance
                      license security by restricting access to authorized users
                      and assigning unique codes to cardholders, ensuring data
                      protection and preventing unauthorized alterations. Our
                      solution introduces barcodes for reliable verification,
                      created and authenticated by authorized sources.
                      Blockchain technology verifies these barcodes with unique
                      key identifiers, adding a trustworthy layer to prevent
                      counterfeiting. With unique barcodes documented on the
                      blockchain, alterations and new unauthorized barcodes
                      cannot occur due to the blockchains traceable smart
                      contract, ensuring the integrity and authenticity of the
                      information throughout its lifecycle. Ultimately, Tandem
                      String prevents counterfeit barcodes, as they are
                      incapable of successful verification on the blockchain.
                      The blockchain's role in verifying keys ensures an extra
                      layer of security, making unauthorized access or forgery
                      nearly impossible through the precise alignment of both
                      the cardholder's key and its documentation on the
                      blockchain.

                      `}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mt-2xl">
              <div className="row ">
                <div className="column align-center">
                  <Link href="/identity">
                    <button className="button xl main mt-lg w-button text-right">
                      {" "}
                      Identity Verification
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
