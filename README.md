**Overview**


The goal is simple; tie barcodes to the blockchain to achieve two independent features: 1) Attach PDF417 barcodes to the blockchain to enhance identity verification and eliminate fraudulent identifications. 2) Attach UPC barcodes to the blockchain to enhance product tracking, recalls, and reduce product loss during the logistical process of supply chain management.

Identity Verification Steps:
1. An Admin account is created.
2. The Admin logs a PDF417 barcode on the blockchain. At that point the barcode is given
a unique key identifier.
3. A third party uses Tandem String to scan the barcode. The barcode is then instantly
compared to barcodes on the immutable leger, and once it matches the unique key identifier it is verified.
- If a fake barcode is scanned it won’t match any unique key, and it’ll be classified as fake due to not being on chain.


Logistical Solution Steps:
1. A company logs their UPC barcode to the blockchain.
2. When the barcode is scanned its geolocation is logged to the blockchain for easy and
affordable tracking.
3. In case of a recall, the products can be instantly tracked and recalled.



**Problems and Solutions**

Identity Verification

Problem: Ultraviolet (UV) ink, holograms, physical engravings, microprint, and raised texts are all security features governments may employ on their driver's licenses to attempt to stay one step ahead of skilled counterfeiters. However, all features above are being used by counterfeiters daily and governments continue to fail at maintaining strict identity security.

Solution: Tandem String aims to integrate a unique key for every card holder. When a barcode is scanned it must match the unique key in order to be verified. The unique key is private and is refrained from public viewership. Each unique key equals a barcode on chain.

Logistical Solution

Problem: There is an ever growing challenge of accurately tracing and documenting products in the current supply chain industry. With expensive recall prices and tracking products, often products can be lost and difficult to precisely locate when requiring immediate action.

Solution: Tandem String is focused on using blockchain technology for tamper-proof product records, geolocation tracking for precise location accuracy, and continuous real-time tracking for efficient recalls. With the use of an immutable leger, a product's barcode will be logged at every step of its life-cycle to retain complete transparency of supply chain management.



**Roadmap**

Completed tasks:

Technical Features
1. Deploy a smart contract on the Polygon network using Solidity with two functions: AddCode and RemoveCode. Only the contract owner (Admin) can call these functions.
2. The ‘AddCode’ function will accept extra data that is not signed, for simplicity.
3. The smart contract will be deployed on the devnet (not on mainnet) and will not follow a
specific ERC standard. The main objective is to maintain a mapping of a structure designed to preserve comprehensive barcode information.

DApp Features
1. Develop a DApp using NextJS, which will be supported only by web browsers.
2. Implement a Metamask-based login system.
3. Create an admin dashboard that can only be accessed by a specific wallet address (admin
wallet), which will be hardcoded for this version.
4. Add the functionality to add code/barcode data and extra data on-chain.
5. Add the functionality to remove code/barcode data on-chain.
6. Create a public scanning page that allows anyone to scan a code/barcode to check if it is
on-chain and view associated extra data.

**The Next Steps:**

### Dashboard customization (both tasks)

● Create a customizable dashboard where the user can drag and drop canvas with metrics and stats.

● Create a real-time sync up system to update the dashboard data.

● Provide several metrics related to GeoLocation, Barcode, Transactions on-chain


### Notification system

● Create a notification system to notify the user through Email and SMS

● Integrate with Twilio to provide SMS and Email notification


### UI improvements  

● Improve the website with about-us, home, and services, using an appealing layout.

● Create several landing pages for marketing tests, the idea is to test it out in different
niches.

● Improve the application UI for Identity verification and Tracking system


### Geolocation mapping

● Create a new feature to display barcode items on a map.

● Create a boundary system that alerts the admin when an item is scanned outside a
boundary.

### Recall Features

● Create a new feature to automatize the recalling process, it should trigger emails/SMS to the final customer requesting the recall of the item.


### Improve site SEO

● Improve the website SEO to be better ranked in Google.

● Improve SEO for the Twitter experience.


### Research ZK + AI

● Studying how to apply ZK in identity verification which can be a big shift for the market.

● Study about how to apply AI in tracking systems, can be a big shift in the market Shopify Integration

● Create a Shopify App to integrate Tandem String with millions of stores

● Provide customizable features
