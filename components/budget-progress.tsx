import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface BudgetProgressProps {
  title: string
  current: number
  target: number
  period: string
}

export function BudgetProgress({ title, current, target, period }: BudgetProgressProps) {
  const percentage = Math.min(Math.round((current / target) * 100), 100)
  const remaining = target - current
  const isOverBudget = current > target

  let progressColor = "bg-income"
  if (percentage > 70) {
    progressColor = "bg-warning"
  }
  if (isOverBudget) {
    progressColor = "bg-expense"
  }

  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{period}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">
              ${current.toFixed(2)} of ${target.toFixed(2)}
            </span>
            <span className="text-sm font-medium">
              {isOverBudget ? (
                <span className="text-expense">Over budget by ${Math.abs(remaining).toFixed(2)}</span>
              ) : (
                <span className="text-income">${remaining.toFixed(2)} remaining</span>
              )}
            </span>
          </div>
          <Progress value={percentage} className={progressColor} />
          <div className="text-xs text-muted-foreground text-right">{percentage}% used</div>
        </div>
      </CardContent>
    </Card>
  )
}
