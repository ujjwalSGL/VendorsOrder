function QuickTips() {
  return (
    <div className="p-5 text-xs font-normal ">
      <h1 className="text-base font-bold text-center">Quick Tips</h1>
      <div className="flex justify-center mt-4">
        <img src="/src/assets/box.svg" alt="" className="size-40" />
      </div>
      <div className="space-y-3">
        <h1 className="mt-3 text-sm font-bold">Dead Weight:</h1>
        <p>
          Dead/Dry weight or volumetric weight whichever is higher will be taken
          while calculating the freight rates.
        </p>
        <p>
          Fixed COD charge or COD % of the order value whichever is higher will
          be taken while calculating the COD fee.
        </p>
        <p>Above prices are exclusive of GST</p>
        <p>
          The above pricing is subject to change based on fuel surcharges and
          courier company base rates.
        </p>
      </div>
      <div className="space-y-3">
        <h1 className="mt-6 text-sm font-bold">
          Volumetric Weight:(L x W x H / 5000)
        </h1>
        <p>
          Volumetric Weight (or DIM weight) is calculated based on the
          dimensions of the package.
        </p>
        <p>
          The formula for calculating volumetric weight involves multiplying the
          length, width, and height of the package and then dividing by 5000.
        </p>
      </div>
    </div>
  );
}

export default QuickTips;
