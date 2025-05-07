"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, TrendingUp, Calendar, DollarSign, CheckCircle2 } from "lucide-react"

export function GoalsList() {
  const [activeTab, setActiveTab] = useState("active")

  const activeGoals = [
    {
      id: 1,
      name: "Emergency Fund",
      currentAmount: 3000,
      targetAmount: 10000,
      targetDate: "2023-12-31",
      description: "3 months of living expenses",
    },
    {
      id: 2,
      name: "New Laptop",
      currentAmount: 800,
      targetAmount: 1500,
      targetDate: "2023-08-15",
      description: "For freelance work",
    },
    {
      id: 3,
      name: "Vacation",
      currentAmount: 1200,
      targetAmount: 3000,
      targetDate: "2023-10-01",
      description: "Summer trip to the beach",
    },
  ]

  const completedGoals = [
    {
      id: 4,
      name: "New Phone",
      currentAmount: 800,
      targetAmount: 800,
      targetDate: "2023-03-15",
      completedDate: "2023-03-10",
      description: "Replacement for old phone",
    },
    {
      id: 5,
      name: "Concert Tickets",
      currentAmount: 250,
      targetAmount: 250,
      targetDate: "2023-02-28",
      completedDate: "2023-02-25",
      description: "Favorite band's tour",
    },
  ]

  const addFunds = (goalId: number) => {
    // Here you would handle adding funds to a goal
    console.log(`Adding funds to goal ${goalId}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Savings Goals</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Goal
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Financial Goals</CardTitle>
          <CardDescription>Track progress toward your savings targets</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Goals</TabsTrigger>
              <TabsTrigger value="completed">Completed Goals</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6 mt-4">
              {activeGoals.map((goal) => {
                const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100)
                let progressColor = "bg-red-500"

                if (progress >= 75) {
                  progressColor = "bg-green-500"
                } else if (progress >= 50) {
                  progressColor = "bg-yellow-500"
                }

                const daysLeft = Math.ceil(
                  (new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )

                return (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-medium">{goal.name}</h3>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <Button size="sm" variant="outline" onClick={() => addFunds(goal.id)}>
                          <Plus className="mr-1 h-3 w-3" />
                          Add Funds
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="flex items-center">
                          <DollarSign className="mr-1 h-4 w-4" />${goal.currentAmount.toFixed(2)} / $
                          {goal.targetAmount.toFixed(2)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {daysLeft} days left
                        </span>
                      </div>
                      <Progress value={progress} className={progressColor} />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{progress}% complete</span>
                        <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </TabsContent>

            <TabsContent value="completed" className="space-y-6 mt-4">
              {completedGoals.map((goal) => (
                <div key={goal.id} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-medium">{goal.name}</h3>
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.description}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      <span className="text-sm text-muted-foreground">
                        Completed on {new Date(goal.completedDate!).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4" />${goal.currentAmount.toFixed(2)} / $
                        {goal.targetAmount.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={100} className="bg-green-500" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>100% complete</span>
                      <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}

              {completedGoals.length === 0 && (
                <div className="text-center p-8">
                  <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No Completed Goals Yet</h3>
                  <p className="text-muted-foreground">Keep working toward your active goals!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
