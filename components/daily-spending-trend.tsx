"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

export function DailySpendingTrend() {
  // Data points matching the chart in the image (April 2-14)
  const dailySpendingData = [
    { date: "Apr 2", amount: 45 },
    { date: "Apr 3", amount: 35 },
    { date: "Apr 4", amount: 60 },
    { date: "Apr 5", amount: 25 },
    { date: "Apr 6", amount: 30 },
    { date: "Apr 7", amount: 40 },
    { date: "Apr 8", amount: 55 },
    { date: "Apr 9", amount: 65 },
    { date: "Apr 10", amount: 50 },
    { date: "Apr 11", amount: 45 },
    { date: "Apr 12", amount: 60 },
    { date: "Apr 13", amount: 75 },
    { date: "Apr 14", amount: 35 },
    { date: "Apr 15", amount: 40 },
  ]

  // Calculate statistics
  const totalSpent = dailySpendingData.reduce((sum, day) => sum + day.amount, 0)
  const averageDaily = totalSpent / dailySpendingData.length
  const highestDay = [...dailySpendingData].sort((a, b) => b.amount - a.amount)[0]
  const lowestDay = [...dailySpendingData].sort((a, b) => a.amount - b.amount)[0]

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Daily Spending Trends</CardTitle>
        <CardDescription>Your spending pattern from April 2 to April 15</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dailySpendingData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" opacity={0.4} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 80]}
                tickCount={5}
                tickFormatter={(value) => `${value}`}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null

                  const data = payload[0].payload

                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-sm">
                      <div className="font-bold mb-1">{data.date}</div>
                      <div className="text-lg font-bold">${data.amount.toFixed(2)}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {data.amount > averageDaily ? "Above average" : "Below average"}
                      </div>
                    </div>
                  )
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="stat-card">
            <div className="text-sm text-muted-foreground">Total Spent</div>
            <div className="text-xl font-bold text-expense">${totalSpent.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-muted-foreground">Daily Average</div>
            <div className="text-xl font-bold">${averageDaily.toFixed(2)}</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-muted-foreground">Highest Day</div>
            <div className="text-xl font-bold">${highestDay.amount.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">{highestDay.date}</div>
          </div>
          <div className="stat-card">
            <div className="text-sm text-muted-foreground">Lowest Day</div>
            <div className="text-xl font-bold">${lowestDay.amount.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">{lowestDay.date}</div>
          </div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>14-day period</span>
            <span>April 2023</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
