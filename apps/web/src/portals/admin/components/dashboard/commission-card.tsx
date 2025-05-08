export function CommissionForecastCard() {
  return (
    <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] overflow-hidden">
      <div className="p-4 border-b border-[#2A2A2A]">
        <h2 className="text-lg font-semibold">Commission Forecast</h2>
        <p className="text-sm text-gray-400">Historical and projected commission earnings</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-400">Historical Total</p>
            <p className="text-xl font-bold mt-1">$0</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Monthly Average</p>
            <p className="text-xl font-bold mt-1">$0</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Forecast Total</p>
            <p className="text-xl font-bold mt-1">$0</p>
          </div>
        </div>
        
        {/* Chart placeholder */}
        <div className="h-40 bg-[#2A2A2A]/30 rounded-md flex items-center justify-center mb-4">
          <span className="text-sm text-gray-400">Chart will appear here</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">Active</span>
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded text-xs">Projected</span>
          </div>
          
          <button className="text-xs text-emerald-500 hover:underline">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
