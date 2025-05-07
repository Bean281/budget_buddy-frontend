"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DollarSign, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function AddGoalForm() {
  const router = useRouter()
  const [goalName, setGoalName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [currentAmount, setCurrentAmount] = useState("0")
  const [targetDate, setTargetDate] = useState("")
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; targetAmount?: string; targetDate?: string }>({})

  const validateForm = () => {
    const newErrors: { name?: string; targetAmount?: string; targetDate?: string } = {}
    let isValid = true

    if (!goalName.trim()) {
      newErrors.name = "Please enter a goal name"
      isValid = false
    }

    if (!targetAmount || Number.parseFloat(targetAmount) <= 0) {
      newErrors.targetAmount = "Please enter a valid target amount"
      isValid = false
    }

    if (!targetDate) {
      newErrors.targetDate = "Please select a target date"
      isValid = false
    } else {
      const selectedDate = new Date(targetDate)
      const today = new Date()
      if (selectedDate <= today) {
        newErrors.targetDate = "Target date must be in the future"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Here you would handle the form submission to your backend
      console.log({
        name: goalName,
        targetAmount,
        currentAmount,
        targetDate,
        description,
      })

      setIsSubmitting(false)
      toast({
        title: "Savings goal created",
        description: `${goalName} has been added to your goals.`,
      })

      // Reset form
      setGoalName("")
      setTargetAmount("")
      setCurrentAmount("0")
      setTargetDate("")
      setDescription("")

      // Redirect to goals page
      router.push("/goals")
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Savings Goal</h1>

      <Card>
        <CardHeader>
          <CardTitle>New Savings Goal</CardTitle>
          <CardDescription>Set a financial target to work towards</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goalName">Goal Name</Label>
                <Input
                  id="goalName"
                  placeholder="e.g., Emergency Fund, Vacation, New Car"
                  value={goalName}
                  onChange={(e) => {
                    setGoalName(e.target.value)
                    setErrors({ ...errors, name: undefined })
                  }}
                />
                {errors.name && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="targetAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-9"
                    value={targetAmount}
                    onChange={(e) => {
                      setTargetAmount(e.target.value)
                      setErrors({ ...errors, targetAmount: undefined })
                    }}
                  />
                </div>
                {errors.targetAmount && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.targetAmount}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAmount">Current Amount (Optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="currentAmount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-9"
                    value={currentAmount}
                    onChange={(e) => setCurrentAmount(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={targetDate}
                  onChange={(e) => {
                    setTargetDate(e.target.value)
                    setErrors({ ...errors, targetDate: undefined })
                  }}
                />
                {errors.targetDate && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.targetDate}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add details about your goal..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Goal"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
