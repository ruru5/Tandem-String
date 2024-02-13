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
                <p className="text-lg text-center max-w-lg">
                  {" "}
                  Several features included, barcode scanning, integration with
                  digital wallet and much more.
                </p>
                <Link
                  href="/identity/scan"
                  className="button xl main mt-lg w-button"
                >
                  {" "}
                  Scan now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="section bg-white">
          <div className="container mt-2xl mb-2xl">
            <div className="row">
              <div className="column align-center">
                <h2 className="max-w-lg text-center">
                  Tandem String: Precision In Every Pixel
                </h2>
                <p className="text-lg text-center max-w-md">
                  {`Our solution to the vulnerability of license security integrates private blockchain technology, restricts access, and assigns unique personal codes to each cardholder for data protection. Barcodes, validated by authorized sources, and a key alignment verification process add layers of security, preventing unauthorized access or forgery.`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section bg-white">
          <div className="container">
            <div className="row items-center v-t">
              <div className="column align-left p-2xl">
                <h6 className="max-w-lg">#1 Feature</h6>
                <h2 className="max-w-lg">Transforming License Security</h2>
                <p className="text-lg">
                  {`With seamless private blockchain integration, we've elevated license security. Limiting
access to authorized entities and assigning unique personal codes to each card holder
to ensure data protection. Preventing unauthorized alterations, our method guarantees
authenticity. Bid farewell to fraud risks and welcome unmatched licensing security.`}
                </p>
              </div>
              <div className="column align-center mt-6 mb-6 md:p-2xl w-full">
                <Image
                  src="/images/marginalia-coming-soon.png"
                  alt=""
                  className="feature-card"
                  width={700}
                  height={700}
                />
              </div>
            </div>
            <div className="row reverse items-center v-t">
              <div className="column align-left p-2xl">
                <h6 className="max-w-lg">#2 Feature</h6>
                <h2 className="max-w-lg">
                  Strengthen License Security Protocols
                </h2>
                <p className="text-lg">
                  {`In the face of highly skilled counterfeiters using features like UV ink, holograms,
microprint, engravings and scannable barcodes, our solution arises where our barcodes
provide a seamless and reliable verification method that ensures that the barcode was
created by an authorized source. Trust in our secure identification process, where each
cardholder's unique key undergoes database validation for unmatched authenticity.`}
                </p>
              </div>
              <div className="column align-center p-2xl">
                <Image
                  src="/images/marginalia-online-shopping.png"
                  alt=""
                  className="feature-card"
                  width={300}
                  height={300}
                />
              </div>
            </div>
            <div className="row items-center v-t">
              <div className="column align-left p-2xl">
                <h6 className="max-w-lg">#3 Feature</h6>
                <h2 className="max-w-lg">Unlocking License Reliability</h2>
                <p className="text-lg">
                  {`Envision a license authenticity system comparable to a safety deposit box. The validation process relies on the alignment of both the bank's and owner's keys, mirroring the method used to authenticate our barcodes. Unauthorized access or forgery is effectively prevented through the requirement for precise key alignment, reinforcing an additional layer of security.`}
                </p>
              </div>
              <div className="column align-center p-2xl">
                <Image
                  src="/images/marginalia-order-complete.png"
                  alt=""
                  className="feature-card"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
