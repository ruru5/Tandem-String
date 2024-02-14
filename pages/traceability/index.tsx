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
                <Link href="/traceability/scan" className="button xl main mt-lg w-button">
                  {" "}
                  GeoLocation
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
                The challenge is insecure and inefficient supply chain tracking, leading to fraud,
                recall issues, and product losses. Our solution has three key features: blockchain
                for tamper-proof product records, geolocation tracking for precise location
                accuracy, and continuous real-time tracking for efficient recalls. This framework
                minimizes errors, streamlines processes, and proactively addresses supply chain
                issues.
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
                <h2 className="max-w-lg">Enhancing Security, Efficiency, and Transparency</h2>
                <p className="text-lg">
                  {`Blockchain ensures a secure and transparent record of each product's
journey through an immutable ledger. Corporate barcodes linked to the
blockchain become tamper-proof, making it extremely challenging for
counterfeiters to manipulate or replicate. Any attempt to alter information
is detectable, providing an extra layer of security. Moreover, the
combination of blockchain with geolocation tracking enhances the
reliability of product information. The precise tracking of a product's
location at each stage reinforces authenticity, as deviations or
discrepancies are promptly identified.`}
                </p>
              </div>
              <div className="column align-center mt-6 mb-6 md:p-2xl w-full">
                <Image
                  src="/images/feature1.png"
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
                <h2 className="max-w-lg">Product Tracking and Recalls with Blockchain Technology</h2>
                <p className="text-lg">
                  {`By employing blockchain technology for product tracking, companies gain
                    continuous, real-time visibility into each item's location and origin. This
                    advanced tracking system, secured by blockchain's decentralized ledger,
                    ensures a tamper-resistant record of the product's journey. In case of a
                    recall, this technology enables swift and precise identification of the
                    location of each product slated for retrieval, enhancing operational
                    efficiency and instilling confidence in the accuracy of the recall process.`}
                </p>
              </div>
              <div className="column align-center p-2xl">
                <Image
                  src="/images/feature2.png"
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
                <h2 className="max-w-lg">Proactive Product Loss Mitigation</h2>
                <p className="text-lg">
                  {`Minimizing product loss is achieved through our integration of blockchain
                    and advanced tracking. Corporate barcodes linked to this blockchain
                    guarantee precise tracking, reducing errors and losses. In the event of
                    recalls, detailed and transparent records streamline identification and
                    retrieval processes, minimizing operational disruptions. The incorporation
                    of geolocation tracking further fortifies accuracy, confirming real-time
                    product locations. Together, these technologies create a robust
                    framework, empowering companies to proactively minimize product loss
                    with enhanced traceability and transparency.`}
                </p>
              </div>
              <div className="column align-center p-2xl">
                <Image
                  src="/images/feature3.png"
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
