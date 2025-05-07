import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SavingsGoals() {
  const goals = [
    {
      id: 1,
      name: "Emergency Fund",
      currentAmount: 3000,
      targetAmount: 10000,
      targetDate: "2023-12-31",
    },
    {
      id: 2,
      name: "New Laptop",
      currentAmount: 800,
      targetAmount: 1500,
      targetDate: "2023-08-15",
    },
    {
      id: 3,
      name: "Vacation",
      currentAmount: 1200,
      targetAmount: 3000,
      targetDate: "2023-10-01",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
        <CardDescription>Track your progress toward financial goals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {goals.map((goal) => {
            const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100)
            let progressColor = "bg-red-500"

            if (progress >= 75) {
              progressColor = "bg-green-500"
            } else if (progress >= 50) {
              progressColor = "bg-yellow-500"
            }

            return (
              <div key={goal.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{goal.name}</span>
                  <span className="text-sm">
                    ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                  </span>
                </div>
                <Progress value={progress} className={progressColor} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{progress}% complete</span>
                  <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
