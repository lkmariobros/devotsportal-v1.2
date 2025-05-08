import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/shared/utils/formatters";

interface CommissionForecastProps {
  historicalTotal?: number;
  monthlyAverage?: number;
  forecastTotal?: number;
  data?: {
    labels: string[];
    historical: number[];
    forecast: number[];
  };
  isLoading?: boolean;
}

export function CommissionForecastChart({
  historicalTotal = 0,
  monthlyAverage = 0,
  forecastTotal = 0,
  data = { labels: [], historical: [], forecast: [] },
  isLoading = false,
}: CommissionForecastProps) {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Commission Forecast</CardTitle>
        <CardDescription>
          Historical and projected commission earnings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <p className="text-xs text-muted-foreground">Historical Total</p>
            <p className="text-xl font-bold mt-1">{formatCurrency(historicalTotal)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Average</p>
            <p className="text-xl font-bold mt-1">{formatCurrency(monthlyAverage)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Forecast Total</p>
            <p className="text-xl font-bold mt-1">{formatCurrency(forecastTotal)}</p>
          </div>
        </div>
        
        {/* Chart placeholder - in a real app, you would use a chart library like Recharts */}
        <div className="h-[200px] bg-muted/20 rounded-md flex items-center justify-center mb-4">
          {data.labels.length > 0 ? (
            <div className="w-full h-full p-4">
              <div className="flex h-full items-end justify-between gap-2">
                {data.labels.map((label, index) => {
                  // Calculate heights for historical and forecast bars
                  const allValues = [...data.historical, ...data.forecast];
                  const maxValue = Math.max(...allValues);
                  
                  const historicalValue = data.historical[index] || 0;
                  const forecastValue = data.forecast[index] || 0;
                  
                  const historicalHeight = maxValue > 0 ? (historicalValue / maxValue) * 100 : 0;
                  const forecastHeight = maxValue > 0 ? (forecastValue / maxValue) * 100 : 0;
                  
                  const isHistorical = index < data.historical.length;
                  
                  return (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div className="flex gap-1">
                        {isHistorical ? (
                          <div 
                            className="w-8 bg-primary rounded-t-sm" 
                            style={{ height: `${historicalHeight}%` }}
                          />
                        ) : (
                          <div 
                            className="w-8 bg-primary/50 rounded-t-sm" 
                            style={{ height: `${forecastHeight}%` }}
                          />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <span className="text-sm text-muted-foreground">No commission data available</span>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Historical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary/50 rounded-sm"></div>
            <span className="text-xs text-muted-foreground">Forecast</span>
          </div>
          <button className="text-xs text-primary hover:underline">
            View Detailed Report
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
