"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  ShoppingCart,
  Car,
  Utensils,
  Tv,
  Briefcase,
  Wallet,
  Landmark,
  Gift,
  Smartphone,
  Droplet,
  Lightbulb,
  Wifi,
  DollarSign,
  PiggyBank,
  TrendingUp,
  Building,
  Bitcoin,
  BarChart,
  AlertCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function AddTransactionForm() {
  const router = useRouter()
  const [transactionType, setTransactionType] = useState("expense")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
  )
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{ amount?: string; category?: string }>({})

  const expenseCategories = [
    { id: "housing", name: "Housing", icon: Home },
    { id: "groceries", name: "Groceries", icon: ShoppingCart },
    { id: "transportation", name: "Transportation", icon: Car },
    { id: "dining", name: "Dining Out", icon: Utensils },
    { id: "entertainment", name: "Entertainment", icon: Tv },
    { id: "utilities", name: "Utilities", icon: Lightbulb },
    { id: "internet", name: "Internet", icon: Wifi },
    { id: "phone", name: "Phone", icon: Smartphone },
    { id: "water", name: "Water", icon: Droplet },
  ]

  const incomeCategories = [
    { id: "salary", name: "Salary", icon: Briefcase },
    { id: "freelance", name: "Freelance", icon: DollarSign },
    { id: "investments", name: "Investments", icon: TrendingUp },
    { id: "gifts", name: "Gifts", icon: Gift },
    { id: "other", name: "Other", icon: Wallet },
  ]

  const investmentCategories = [
    { id: "emergency", name: "Emergency Fund", icon: PiggyBank },
    { id: "stocks", name: "Stocks", icon: BarChart },
    { id: "realestate", name: "Real Estate", icon: Building },
    { id: "crypto", name: "Cryptocurrency", icon: Bitcoin },
    { id: "retirement", name: "Retirement", icon: Landmark },
  ]

  const validateForm = () => {
    const newErrors: { amount?: string; category?: string } = {}
    let isValid = true

    if (!amount || Number.parseFloat(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount"
      isValid = false
    }

    if (!selectedCategory) {
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
        type: transactionType,
        category: selectedCategory,
        amount,
        date,
        time,
        notes,
      })

      setIsSubmitting(false)
      toast({
        title: "Transaction added",
        description: `${transactionType === "income" ? "Income" : transactionType === "expense" ? "Expense" : "Investment"} of $${amount} has been added.`,
      })

      // Reset form
      setSelectedCategory("")
      setAmount("")
      setNotes("")
      setDate(new Date().toISOString().split("T")[0])
      setTime(new Date().toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }))

      // Redirect to transactions page
      router.push("/transactions")
    }, 1000)
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>

      <Card>
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>Record your income, expense, or investment</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={transactionType} onValueChange={setTransactionType} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="expense">Expense</TabsTrigger>
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="investment">Investment</TabsTrigger>
              </TabsList>

              <TabsContent value="expense">
                <div className="grid grid-cols-3 gap-2 my-4">
                  {expenseCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setErrors({ ...errors, category: undefined })
                      }}
                    >
                      <category.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs text-center">{category.name}</span>
                    </div>
                  ))}
                </div>
                {errors.category && (
                  <div className="text-sm text-red-500 flex items-center mt-1 mb-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="income">
                <div className="grid grid-cols-3 gap-2 my-4">
                  {incomeCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setErrors({ ...errors, category: undefined })
                      }}
                    >
                      <category.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs text-center">{category.name}</span>
                    </div>
                  ))}
                </div>
                {errors.category && (
                  <div className="text-sm text-red-500 flex items-center mt-1 mb-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="investment">
                <div className="grid grid-cols-3 gap-2 my-4">
                  {investmentCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground border-primary"
                          : "hover:bg-muted"
                      }`}
                      onClick={() => {
                        setSelectedCategory(category.id)
                        setErrors({ ...errors, category: undefined })
                      }}
                    >
                      <category.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs text-center">{category.name}</span>
                    </div>
                  ))}
                </div>
                {errors.category && (
                  <div className="text-sm text-red-500 flex items-center mt-1 mb-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.category}
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
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
                    required
                  />
                </div>
                {errors.amount && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.amount}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
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
            {isSubmitting ? "Saving..." : "Save Transaction"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
