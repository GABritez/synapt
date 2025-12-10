import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ProgressChartProps {
  data: { date: string; accuracy: number; speed: number }[];
  title: string;
}

export function ProgressChart({ data, title }: ProgressChartProps) {
  return (
    <div className="card-neural">
      <h3 className="text-lg font-semibold text-foreground mb-6">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(239 84% 67%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(239 84% 67%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217 33% 25%)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="hsl(215 20% 65%)" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              fontFamily="JetBrains Mono"
            />
            <YAxis 
              stroke="hsl(215 20% 65%)" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
              fontFamily="JetBrains Mono"
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(217 33% 17%)', 
                border: '1px solid hsl(217 33% 25%)',
                borderRadius: '12px',
                boxShadow: '0 8px 32px hsl(222 47% 5% / 0.5)'
              }}
              labelStyle={{ color: 'hsl(210 40% 98%)', fontFamily: 'JetBrains Mono' }}
              itemStyle={{ fontFamily: 'JetBrains Mono' }}
            />
            <Area 
              type="monotone" 
              dataKey="accuracy" 
              stroke="hsl(239 84% 67%)" 
              strokeWidth={2}
              fill="url(#accuracyGradient)"
              name="Precisión %"
              dot={{ fill: 'hsl(239 84% 67%)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(239 84% 67%)', stroke: 'hsl(239 84% 67%)', strokeWidth: 2, filter: 'drop-shadow(0 0 8px hsl(239 84% 67%))' }}
            />
            <Area 
              type="monotone" 
              dataKey="speed" 
              stroke="hsl(160 84% 39%)" 
              strokeWidth={2}
              fill="url(#speedGradient)"
              name="Velocidad %"
              dot={{ fill: 'hsl(160 84% 39%)', strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, fill: 'hsl(160 84% 39%)', stroke: 'hsl(160 84% 39%)', strokeWidth: 2, filter: 'drop-shadow(0 0 8px hsl(160 84% 39%))' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Precisión</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-sm text-muted-foreground">Velocidad</span>
        </div>
      </div>
    </div>
  );
}
