import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, Wallet, Calendar, ArrowDownRight } from "lucide-react"
import { UpcomingBills } from "./upcoming-bills"
import { SavingsGoals } from "./savings-goals"
import { RecentExpenses } from "./recent-expenses"
import { DailySpendingTrend } from "./daily-spending-trend"
import { BudgetProgress } from "./budget-progress"

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <div className="rounded-full bg-primary-muted p-2 text-primary">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,550.00</div>
            <p className="text-xs text-primary flex items-center">
              <TrendingUp className="mr-1 h-4 w-4 inline" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-expense card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <div className="rounded-full bg-expense-muted p-2 text-expense">
              <DollarSign className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,345.00</div>
            <p className="text-xs text-expense flex items-center">
              <TrendingDown className="mr-1 h-4 w-4 inline" />
              +5.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-savings card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Savings</CardTitle>
            <div className="rounded-full bg-savings-muted p-2 text-savings">
              <Wallet className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,200.00</div>
            <p className="text-xs text-savings flex items-center">
              <TrendingUp className="mr-1 h-4 w-4 inline" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-info card-hover">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
            <div className="rounded-full bg-info-muted p-2 text-info">
              <Calendar className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,005.00</div>
            <p className="text-xs text-muted-foreground">22% of monthly income</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Spending */}
      <Card className="bg-gradient-to-br from-background to-secondary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Today's Spending</CardTitle>
          <CardDescription>Your spending for {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">$78.50</div>
              <div className="text-sm text-muted-foreground">
                <ArrowDownRight className="inline h-4 w-4 text-expense mr-1" />4 transactions today
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">Daily Budget</div>
              <div className="text-lg">$100.00</div>
              <div className="text-xs text-income">$21.50 remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Progress */}
      <div className="grid gap-4 md:grid-cols-2">
        <BudgetProgress title="Weekly Budget" current={420} target={700} period="This Week" />
        <BudgetProgress title="Monthly Budget" current={2345} target={3500} period="This Month" />
      </div>

      {/* Daily Spending Trend */}
      <DailySpendingTrend />

      <div className="grid gap-4 md:grid-cols-2">
        <UpcomingBills />
        <SavingsGoals />
      </div>

      {/* Recent Expenses */}
      <RecentExpenses />
    </div>
  )
}
