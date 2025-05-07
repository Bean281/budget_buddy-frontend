"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"

export function StatisticsDashboard() {
  const [timeRange, setTimeRange] = useState("month")

  // Mock data for charts
  const incomeVsExpenseData = [
    { name: "Week 1", income: 1200, expenses: 800 },
    { name: "Week 2", income: 1500, expenses: 1200 },
    { name: "Week 3", income: 1000, expenses: 950 },
    { name: "Week 4", income: 1800, expenses: 1100 },
  ]

  const categoryBreakdownData = [
    { name: "Housing", value: 35 },
    { name: "Food", value: 20 },
    { name: "Transportation", value: 15 },
    { name: "Utilities", value: 10 },
    { name: "Entertainment", value: 10 },
    { name: "Other", value: 10 },
  ]

  const COLORS = [
    "hsl(var(--category-food))",
    "hsl(var(--category-entertainment))",
    "hsl(var(--category-shopping))",
    "hsl(var(--category-coffee))",
    "hsl(var(--category-housing))",
    "hsl(var(--category-transportation))",
    "hsl(var(--category-utilities))",
  ]

  const savingsGoalsData = [
    { name: "Emergency Fund", current: 3000, target: 10000 },
    { name: "New Laptop", current: 800, target: 1500 },
    { name: "Vacation", current: 1200, target: 3000 },
  ]

  const monthlyTrendData = [
    { name: "Jan", income: 3800, expenses: 2500, savings: 1300 },
    { name: "Feb", income: 4200, expenses: 2800, savings: 1400 },
    { name: "Mar", income: 3900, expenses: 2600, savings: 1300 },
    { name: "Apr", income: 4500, expenses: 2900, savings: 1600 },
    { name: "May", income: 4550, expenses: 2345, savings: 2205 },
  ]

  // Daily spending trend data
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

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Daily Spending Trends Chart */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle>Daily Spending Trends</CardTitle>
          <CardDescription>Your spending pattern from April 2 to April 15</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySpendingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  formatter={(value) => [`$${value}`, "Amount"]}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded-lg border bg-background p-2 shadow-sm">
                          <div className="font-bold">{label}</div>
                          <div className="flex flex-col">
                            <span className="text-lg font-bold">${payload[0].value}</span>
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Weekly breakdown for {timeRange}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incomeVsExpenseData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value}`} />
                  <Tooltip
                    formatter={(value) => [`$${value}`, undefined]}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Income</span>
                                <span className="font-bold text-income">${payload[0].value}</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">Expenses</span>
                                <span className="font-bold text-expense">${payload[1].value}</span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" fill="hsl(var(--income))" name="Income" />
                  <Bar dataKey="expenses" fill="hsl(var(--expense))" name="Expenses" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 text-sm text-center text-muted-foreground">
              Income: $5,500 | Expenses: $4,050 | Net: $1,450
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdownData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, undefined]}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="flex flex-col">
                              <span className="font-bold">{payload[0].name}</span>
                              <span className="text-muted-foreground">{payload[0].value}% of total expenses</span>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="card-hover bg-gradient-to-br from-background to-secondary/20">
        <CardHeader>
          <CardTitle>Plan vs Reality</CardTitle>
          <CardDescription>Compare your financial plan with actual results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-medium">Income</h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Planned</span>
                <span>$4,200.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actual</span>
                <span>$4,550.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Difference</span>
                <span className="text-income">+$350.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Expenses</h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Planned</span>
                <span>$2,500.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actual</span>
                <span>$2,345.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Difference</span>
                <span className="text-income">-$155.00</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Savings</h3>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Planned</span>
                <span>$1,000.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Actual</span>
                <span>$1,200.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Difference</span>
                <span className="text-income">+$200.00</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
