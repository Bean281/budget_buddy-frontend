"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DollarSign, AlertCircle } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function AddBillForm() {
  const router = useRouter()
  const [billName, setBillName] = useState("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [frequency, setFrequency] = useState("monthly")
  const [category, setCategory] = useState("")
  const [autopay, setAutopay] = useState(false)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; amount?: string; dueDate?: string; category?: string }>({})

  const categories = [
    { id: "housing", name: "Housing" },
    { id: "utilities", name: "Utilities" },
    { id: "transportation", name: "Transportation" },
    { id: "insurance", name: "Insurance" },
    { id: "subscriptions", name: "Subscriptions" },
    { id: "entertainment", name: "Entertainment" },
    { id: "health", name: "Health" },
    { id: "education", name: "Education" },
    { id: "other", name: "Other" },
  ]

  const validateForm = () => {
    const newErrors: { name?: string; amount?: string; dueDate?: string; category?: string } = {}
    let isValid = true

    if (!billName.trim()) {
      newErrors.name = "Please enter a bill name"
      isValid = false
    }

    if (!amount || Number.parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
      isValid = false
    }

    if (!dueDate) {
      newErrors.dueDate = "Please select a due date"
      isValid = false
    }

    if (!category) {
      newErrors.category = "Please select a category"
      isValid = false
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
        name: billName,
        amount,
        dueDate,
        frequency,
        category,
        autopay,
        notes,
      })

      setIsSubmitting(false)
      toast({
        title: "Bill added",
        description: `${billName} has been added to your bills.`,
      })

      // Reset form
      setBillName("")
      setAmount("")
      setDueDate("")
      setFrequency("monthly")
      setCategory("")
      setAutopay(false)
      setNotes("")

      // Redirect to bills page
      router.push("/bills")
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Bill</h1>

      <Card>
        <CardHeader>
          <CardTitle>New Bill</CardTitle>
          <CardDescription>Add a recurring bill or expense</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="billName">Bill Name</Label>
                <Input
                  id="billName"
                  placeholder="e.g., Rent, Electricity, Netflix"
                  value={billName}
                  onChange={(e) => {
                    setBillName(e.target.value)
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
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-9"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value)
                      setErrors({ ...errors, amount: undefined })
                    }}
                  />
                </div>
                {errors.amount && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.amount}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value)
                    setErrors({ ...errors, dueDate: undefined })
                  }}
                />
                {errors.dueDate && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.dueDate}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annually">Annually</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => {
                    setCategory(value)
                    setErrors({ ...errors, category: undefined })
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="autopay" checked={autopay} onCheckedChange={setAutopay} />
                <Label htmlFor="autopay">Autopay enabled</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Add any additional details..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Bill"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
