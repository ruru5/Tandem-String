export default function BarcodeDescription({ data }: any) {
  return (
    <div className="overflow-auto md:max-h-[400px] md:mt-10 pb-4">
      <div className="px-4 sm:px-0 pb-4">
        <h3 className="text-base font-semibold leading-7 text-black text-center">
          Barcode Information
        </h3>
      </div>
      {data &&
        data.map((item: any, index: any) => {
          return (
            <>
              <div className="mt-3 border-t border-white/10">
                <dl className="divide-y divide-white/10">
                  <div className="px-4 py-1 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 align-middle">
                    <dt className="text-sm leading-6 text-black font-bold">
                      {item.name}
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                      {item.value}
                    </dd>
                  </div>
                </dl>
              </div>
            </>
          );
        })}
    </div>
  );
}
