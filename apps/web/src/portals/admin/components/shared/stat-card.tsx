interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: string;
  color?: string;
}

export function StatCard({ title, value, change, icon, color = "emerald" }: StatCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4 border border-[#2A2A2A]">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          <div className="flex items-center mt-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
            <span className="text-xs text-gray-400">
              {change}% vs last week
            </span>
          </div>
        </div>
        
        <div className={`w-10 h-10 rounded-full bg-${color}-600/10 flex items-center justify-center text-${color}-500`}>
          <StatIcon name={icon} />
        </div>
      </div>
    </div>
  );
}

function StatIcon({ name }: { name: string }) {
  return <div className="w-5 h-5 bg-current opacity-70 rounded-sm" />;
}
