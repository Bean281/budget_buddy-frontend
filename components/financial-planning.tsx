"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowUpCircle,
  ArrowDownCircle,
  Save,
  Calendar,
  CalendarDays,
  CalendarRange,
  Plus,
  Trash2,
  Edit,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

// Types for our financial planning data
interface PlanItem {
  id: string
  description: string
  amount: number
  category?: string
}

interface FinancialPlan {
  income: PlanItem[]
  expenses: PlanItem[]
  savings: PlanItem[]
}

export function FinancialPlanning() {
  const [planTab, setPlanTab] = useState("daily")

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"income" | "expense" | "savings">("income")
  const [isEditing, setIsEditing] = useState(false)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  // Form state
  const [itemDescription, setItemDescription] = useState("")
  const [itemAmount, setItemAmount] = useState("")
  const [itemCategory, setItemCategory] = useState("")

  // Mock data for planning
  const [dailyPlan, setDailyPlan] = useState<FinancialPlan>({
    income: [
      { id: "d1", description: "Freelance Work", amount: 150 },
      { id: "d2", description: "Side Gig", amount: 50 },
    ],
    expenses: [
      { id: "d3", description: "Groceries", amount: 20 },
      { id: "d4", description: "Transportation", amount: 10 },
      { id: "d5", description: "Lunch", amount: 15 },
      { id: "d6", description: "Coffee", amount: 5 },
    ],
    savings: [],
  })

  const [weeklyPlan, setWeeklyPlan] = useState<FinancialPlan>({
    income: [
      { id: "w1", description: "Freelance Project", amount: 800 },
      { id: "w2", description: "Part-time Job", amount: 400 },
    ],
    expenses: [
      { id: "w3", description: "Rent (weekly portion)", amount: 300 },
      { id: "w4", description: "Groceries", amount: 120 },
      { id: "w5", description: "Utilities (weekly portion)", amount: 50 },
      { id: "w6", description: "Entertainment", amount: 80 },
      { id: "w7", description: "Transportation", amount: 60 },
    ],
    savings: [],
  })

  const [monthlyPlan, setMonthlyPlan] = useState<FinancialPlan>({
    income: [
      { id: "m1", description: "Salary", amount: 3500 },
      { id: "m2", description: "Freelance Projects", amount: 1000 },
      { id: "m3", description: "Investment Returns", amount: 50 },
    ],
    expenses: [
      { id: "m4", description: "Rent", amount: 1200 },
      { id: "m5", description: "Groceries", amount: 500 },
      { id: "m6", description: "Utilities", amount: 200 },
      { id: "m7", description: "Internet & Phone", amount: 120 },
      { id: "m8", description: "Transportation", amount: 250 },
      { id: "m9", description: "Entertainment", amount: 300 },
      { id: "m10", description: "Subscriptions", amount: 50 },
      { id: "m11", description: "Insurance", amount: 150 },
    ],
    savings: [
      { id: "m12", description: "Emergency Fund", amount: 500 },
      { id: "m13", description: "Vacation Fund", amount: 200 },
      { id: "m14", description: "New Laptop Fund", amount: 100 },
    ],
  })

  // Categories for each type
  const incomeCategories = [
    { id: "salary", name: "Salary" },
    { id: "freelance", name: "Freelance" },
    { id: "investments", name: "Investments" },
    { id: "gifts", name: "Gifts" },
    { id: "other-income", name: "Other Income" },
  ]

  const expenseCategories = [
    { id: "housing", name: "Housing" },
    { id: "food", name: "Food" },
    { id: "transportation", name: "Transportation" },
    { id: "utilities", name: "Utilities" },
    { id: "entertainment", name: "Entertainment" },
    { id: "health", name: "Health" },
    { id: "education", name: "Education" },
    { id: "personal", name: "Personal" },
    { id: "other-expense", name: "Other Expense" },
  ]

  const savingsCategories = [
    { id: "emergency", name: "Emergency Fund" },
    { id: "retirement", name: "Retirement" },
    { id: "vacation", name: "Vacation" },
    { id: "education", name: "Education" },
    { id: "major-purchase", name: "Major Purchase" },
    { id: "other-savings", name: "Other Savings" },
  ]

  const getCurrentPlan = () => {
    switch (planTab) {
      case "daily":
        return dailyPlan
      case "weekly":
        return weeklyPlan
      case "monthly":
        return monthlyPlan
      default:
        return dailyPlan
    }
  }

  const setCurrentPlan = (plan: FinancialPlan) => {
    switch (planTab) {
      case "daily":
        setDailyPlan(plan)
        break
      case "weekly":
        setWeeklyPlan(plan)
        break
      case "monthly":
        setMonthlyPlan(plan)
        break
    }
  }

  const calculateTotals = (items: PlanItem[]) => {
    return items.reduce((total, item) => total + item.amount, 0)
  }

  const handleAddItem = (type: "income" | "expense" | "savings") => {
    setDialogType(type)
    setIsEditing(false)
    setItemDescription("")
    setItemAmount("")
    setItemCategory("")
    setIsDialogOpen(true)
  }

  const handleEditItem = (type: "income" | "expense" | "savings", item: PlanItem) => {
    setDialogType(type)
    setIsEditing(true)
    setEditingItemId(item.id)
    setItemDescription(item.description)
    setItemAmount(item.amount.toString())
    setItemCategory(item.category || "")
    setIsDialogOpen(true)
  }

  const handleDeleteItem = (type: "income" | "expense" | "savings", itemId: string) => {
    const currentPlan = getCurrentPlan()
    const updatedPlan = {
      ...currentPlan,
      [type]: currentPlan[type].filter((item) => item.id !== itemId),
    }
    setCurrentPlan(updatedPlan)

    toast({
      title: "Item deleted",
      description: `The ${type} item has been removed from your plan.`,
    })
  }

  const handleSaveItem = () => {
    if (!itemDescription.trim()) {
      toast({
        title: "Error",
        description: "Description is required.",
        variant: "destructive",
      })
      return
    }

    if (!itemAmount || Number.parseFloat(itemAmount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount.",
        variant: "destructive",
      })
      return
    }

    const currentPlan = getCurrentPlan()

    if (isEditing && editingItemId) {
      // Update existing item
      const updatedPlan = {
        ...currentPlan,
        [dialogType]: currentPlan[dialogType].map((item) =>
          item.id === editingItemId
            ? {
                ...item,
                description: itemDescription,
                amount: Number.parseFloat(itemAmount),
                category: itemCategory || undefined,
              }
            : item,
        ),
      }
      setCurrentPlan(updatedPlan)

      toast({
        title: "Item updated",
        description: `The ${dialogType} item has been updated.`,
      })
    } else {
      // Add new item
      const newItem: PlanItem = {
        id: Date.now().toString(),
        description: itemDescription,
        amount: Number.parseFloat(itemAmount),
        category: itemCategory || undefined,
      }

      const updatedPlan = {
        ...currentPlan,
        [dialogType]: [...currentPlan[dialogType], newItem],
      }
      setCurrentPlan(updatedPlan)

      toast({
        title: "Item added",
        description: `The ${dialogType} item has been added to your plan.`,
      })
    }

    setIsDialogOpen(false)
  }

  const handleSavePlan = () => {
    // Here you would send the plan to your backend API
    // For now, we'll just show a success message
    toast({
      title: "Plan saved",
      description: `Your ${planTab} plan has been saved.`,
    })
  }

  const getCategoryName = (type: "income" | "expense" | "savings", categoryId?: string) => {
    if (!categoryId) return ""

    let categories
    switch (type) {
      case "income":
        categories = incomeCategories
        break
      case "expense":
        categories = expenseCategories
        break
      case "savings":
        categories = savingsCategories
        break
    }

    return categories.find((cat) => cat.id === categoryId)?.name || ""
  }

  // Calculate totals
  const currentPlan = getCurrentPlan()
  const incomeTotal = calculateTotals(currentPlan.income)
  const expenseTotal = calculateTotals(currentPlan.expenses)
  const savingsTotal = calculateTotals(currentPlan.savings)
  const netAmount = incomeTotal - expenseTotal - savingsTotal

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Financial Planning</h1>

      <Card>
        <CardHeader>
          <CardTitle>Plan Your Finances</CardTitle>
          <CardDescription>Create and manage your financial plans</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={planTab} onValueChange={setPlanTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Daily</span>
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>Weekly</span>
              </TabsTrigger>
              <TabsTrigger value="monthly" className="flex items-center gap-2">
                <CalendarRange className="h-4 w-4" />
                <span>Monthly</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <ArrowUpCircle className="h-5 w-5 mr-2 text-income" />
                      Income
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("income")} className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </Button>
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dailyPlan.income.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <div>{item.description}</div>
                                {item.category && (
                                  <div className="text-xs text-muted-foreground">
                                    {getCategoryName("income", item.category)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleEditItem("income", item)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteItem("income", item.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total Income</TableCell>
                          <TableCell className="text-right font-medium text-income">
                            ${calculateTotals(dailyPlan.income).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <ArrowDownCircle className="h-5 w-5 mr-2 text-expense" />
                      Expenses
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("expense")} className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </Button>
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {dailyPlan.expenses.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <div>{item.description}</div>
                                {item.category && (
                                  <div className="text-xs text-muted-foreground">
                                    {getCategoryName("expense", item.category)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleEditItem("expense", item)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteItem("expense", item.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total Expenses</TableCell>
                          <TableCell className="text-right font-medium text-expense">
                            ${calculateTotals(dailyPlan.expenses).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                      <p className="text-2xl font-bold text-income">${calculateTotals(dailyPlan.income).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                      <p className="text-2xl font-bold text-expense">
                        ${calculateTotals(dailyPlan.expenses).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Net</p>
                      <p
                        className={`text-2xl font-bold ${
                          calculateTotals(dailyPlan.income) - calculateTotals(dailyPlan.expenses) >= 0
                            ? "text-income"
                            : "text-expense"
                        }`}
                      >
                        ${(calculateTotals(dailyPlan.income) - calculateTotals(dailyPlan.expenses)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSavePlan}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Daily Plan
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <ArrowUpCircle className="h-5 w-5 mr-2 text-income" />
                      Income
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("income")} className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </Button>
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weeklyPlan.income.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <div>{item.description}</div>
                                {item.category && (
                                  <div className="text-xs text-muted-foreground">
                                    {getCategoryName("income", item.category)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleEditItem("income", item)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteItem("income", item.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total Income</TableCell>
                          <TableCell className="text-right font-medium text-income">
                            ${calculateTotals(weeklyPlan.income).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <ArrowDownCircle className="h-5 w-5 mr-2 text-expense" />
                      Expenses
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("expense")} className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </Button>
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weeklyPlan.expenses.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <div>{item.description}</div>
                                {item.category && (
                                  <div className="text-xs text-muted-foreground">
                                    {getCategoryName("expense", item.category)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleEditItem("expense", item)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteItem("expense", item.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total Expenses</TableCell>
                          <TableCell className="text-right font-medium text-expense">
                            ${calculateTotals(weeklyPlan.expenses).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                      <p className="text-2xl font-bold text-income">${calculateTotals(weeklyPlan.income).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                      <p className="text-2xl font-bold text-expense">
                        ${calculateTotals(weeklyPlan.expenses).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Net</p>
                      <p
                        className={`text-2xl font-bold ${
                          calculateTotals(weeklyPlan.income) - calculateTotals(weeklyPlan.expenses) >= 0
                            ? "text-income"
                            : "text-expense"
                        }`}
                      >
                        ${(calculateTotals(weeklyPlan.income) - calculateTotals(weeklyPlan.expenses)).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSavePlan}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Weekly Plan
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <ArrowUpCircle className="h-5 w-5 mr-2 text-income" />
                      Income
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("income")} className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </Button>
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthlyPlan.income.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <div>{item.description}</div>
                                {item.category && (
                                  <div className="text-xs text-muted-foreground">
                                    {getCategoryName("income", item.category)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleEditItem("income", item)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteItem("income", item.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total Income</TableCell>
                          <TableCell className="text-right font-medium text-income">
                            ${calculateTotals(monthlyPlan.income).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <ArrowDownCircle className="h-5 w-5 mr-2 text-expense" />
                      Expenses
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("expense")} className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </Button>
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthlyPlan.expenses.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <div>{item.description}</div>
                                {item.category && (
                                  <div className="text-xs text-muted-foreground">
                                    {getCategoryName("expense", item.category)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleEditItem("expense", item)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteItem("expense", item.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total Expenses</TableCell>
                          <TableCell className="text-right font-medium text-expense">
                            ${calculateTotals(monthlyPlan.expenses).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2 flex items-center justify-between">
                    <span className="flex items-center">
                      <Save className="h-5 w-5 mr-2 text-savings" />
                      Savings
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("savings")} className="h-8 gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add</span>
                    </Button>
                  </h3>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {monthlyPlan.savings.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>
                              <div>
                                <div>{item.description}</div>
                                {item.category && (
                                  <div className="text-xs text-muted-foreground">
                                    {getCategoryName("savings", item.category)}
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleEditItem("savings", item)}
                                >
                                  <Edit className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={() => handleDeleteItem("savings", item.id)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell className="font-medium">Total Savings</TableCell>
                          <TableCell className="text-right font-medium text-savings">
                            ${calculateTotals(monthlyPlan.savings).toFixed(2)}
                          </TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>

              <Card className="bg-muted/50">
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Income</p>
                      <p className="text-2xl font-bold text-income">${incomeTotal.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
                      <p className="text-2xl font-bold text-expense">${expenseTotal.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Savings</p>
                      <p className="text-2xl font-bold text-savings">${savingsTotal.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                      <p className={`text-2xl font-bold ${netAmount >= 0 ? "text-income" : "text-expense"}`}>
                        ${netAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button onClick={handleSavePlan}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Monthly Plan
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Item Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? `Edit ${dialogType}` : `Add ${dialogType}`}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? `Update the details of this ${dialogType} item.`
                : `Add a new ${dialogType} item to your financial plan.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder={`Enter ${dialogType} description`}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-7"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category (Optional)</Label>
              <Select value={itemCategory} onValueChange={setItemCategory}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {dialogType === "income" &&
                    incomeCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  {dialogType === "expense" &&
                    expenseCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  {dialogType === "savings" &&
                    savingsCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveItem}>{isEditing ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
