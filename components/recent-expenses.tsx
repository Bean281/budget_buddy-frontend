import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Coffee, Utensils, Car, Home, Smartphone } from "lucide-react"

export function RecentExpenses() {
  // Mock data for recent expenses
  const expenses = [
    {
      id: 1,
      description: "Grocery Shopping",
      amount: 45.8,
      date: "2023-04-27",
      time: "14:30",
      category: "Food",
      icon: ShoppingCart,
      color: "bg-income-muted text-income dark:bg-income-muted dark:text-income-foreground",
    },
    {
      id: 2,
      description: "Coffee Shop",
      amount: 5.75,
      date: "2023-04-27",
      time: "09:15",
      category: "Coffee",
      icon: Coffee,
      color: "bg-warning-muted text-warning dark:bg-warning-muted dark:text-warning-foreground",
    },
    {
      id: 3,
      description: "Restaurant Lunch",
      amount: 18.5,
      date: "2023-04-27",
      time: "12:45",
      category: "Dining",
      icon: Utensils,
      color: "bg-expense-muted text-expense dark:bg-expense-muted dark:text-expense-foreground",
    },
    {
      id: 4,
      description: "Gas Station",
      amount: 35.4,
      date: "2023-04-26",
      time: "17:20",
      category: "Transportation",
      icon: Car,
      color: "bg-savings-muted text-savings dark:bg-savings-muted dark:text-savings-foreground",
    },
    {
      id: 5,
      description: "Internet Bill",
      amount: 65.0,
      date: "2023-04-26",
      time: "09:00",
      category: "Utilities",
      icon: Home,
      color: "bg-investment-muted text-investment dark:bg-investment-muted dark:text-investment-foreground",
    },
    {
      id: 6,
      description: "Phone Bill",
      amount: 45.0,
      date: "2023-04-25",
      time: "10:30",
      category: "Utilities",
      icon: Smartphone,
      color: "bg-info-muted text-info dark:bg-info-muted dark:text-info-foreground",
    },
  ]

  // Group expenses by date
  const groupedExpenses = expenses.reduce(
    (groups, expense) => {
      const date = expense.date
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(expense)
      return groups
    },
    {} as Record<string, typeof expenses>,
  )

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (dateString === today.toISOString().split("T")[0]) {
      return "Today"
    } else if (dateString === yesterday.toISOString().split("T")[0]) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
    }
  }

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Recent Expenses</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedExpenses).map(([date, expenses]) => (
            <div key={date} className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">{formatDate(date)}</h3>
              <div className="space-y-2">
                {expenses.map((expense) => (
                  <div
                    key={expense.id}
                    className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${expense.color}`}>
                        <expense.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{expense.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {expense.time} • {expense.category}
                        </div>
                      </div>
                    </div>
                    <div className="font-medium text-expense">-${expense.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
