export function TransactionsCard() {
  return (
    <div className="bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] overflow-hidden">
      <div className="p-4 border-b border-[#2A2A2A] flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Transactions</h2>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-400">$0</p>
            <span className="ml-2 px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-xs">
              +0%
            </span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button className="text-xs text-blue-400 hover:text-blue-300">Revenue</button>
          <span className="text-gray-600">|</span>
          <button className="text-xs text-gray-400 hover:text-white">Chart</button>
        </div>
      </div>
      
      <div className="p-4">
        {/* Chart placeholder */}
        <div className="h-40 bg-[#2A2A2A]/30 rounded-md flex items-center justify-center mb-4">
          <span className="text-sm text-gray-400">Chart will appear here</span>
        </div>
        
        <div className="flex justify-center">
          <button className="text-xs text-emerald-500 hover:underline">
            View Detailed Report
          </button>
        </div>
      </div>
    </div>
  );
}
