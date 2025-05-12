"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { transactionFormSchema, TransactionFormValues } from "./add-transaction-form/helpers/schema"
import { useCreateTransaction } from "@/hooks/use-transactions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  Gift,
  Smartphone,
  Droplet,
  Lightbulb,
  Wifi,
  DollarSign,
  AlertCircle,
} from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

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
  { id: "gifts", name: "Gifts", icon: Gift },
  { id: "other", name: "Other", icon: Wallet },
]

export function AddTransactionForm() {
  const router = useRouter()
  const { mutate: createTransaction, isPending } = useCreateTransaction()
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: {
      amount: 0,
      type: "EXPENSE",
      date: new Date().toISOString().slice(0, 10),
      categoryId: "",
      description: "",
      notes: "",
      billId: "",
    },
  })

  const type = form.watch("type")
  const categoryId = form.watch("categoryId")

  function onSubmit(values: TransactionFormValues) {
    if (!values.amount || isNaN(values.amount)) {
      form.setError("amount", { message: "Amount is required" })
      return
    }
    createTransaction(values, {
      onSuccess: () => {
        toast.success("Transaction added!")
        form.reset()
        router.push("/transactions")
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.message || "Failed to add transaction")
      },
    })
  }

  let categories = expenseCategories
  if (type === "INCOME") categories = incomeCategories

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Transaction</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Transaction</CardTitle>
          <CardDescription>Record your income or expense</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={type} onValueChange={v => form.setValue("type", v as any)} className="mb-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="EXPENSE">Expense</TabsTrigger>
                <TabsTrigger value="INCOME">Income</TabsTrigger>
              </TabsList>
              <TabsContent value="EXPENSE">
                <div className="grid grid-cols-3 gap-2 my-4">
                  {expenseCategories.map(category => (
                    <div
                      key={category.id}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${categoryId === category.id ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}
                      onClick={() => form.setValue("categoryId", category.id)}
                    >
                      <category.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs text-center">{category.name}</span>
                    </div>
                  ))}
                </div>
                {form.formState.errors.categoryId && (
                  <div className="text-sm text-red-500 flex items-center mt-1 mb-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {form.formState.errors.categoryId.message}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="INCOME">
                <div className="grid grid-cols-3 gap-2 my-4">
                  {incomeCategories.map(category => (
                    <div
                      key={category.id}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border transition-colors ${categoryId === category.id ? "bg-primary text-primary-foreground border-primary" : "hover:bg-muted"}`}
                      onClick={() => form.setValue("categoryId", category.id)}
                    >
                      <category.icon className="h-6 w-6 mb-1" />
                      <span className="text-xs text-center">{category.name}</span>
                    </div>
                  ))}
                </div>
                {form.formState.errors.categoryId && (
                  <div className="text-sm text-red-500 flex items-center mt-1 mb-2">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {form.formState.errors.categoryId.message}
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
                    {...form.register("amount", { valueAsNumber: true })}
                  />
                </div>
                {form.formState.errors.amount && (
                  <div className="text-sm text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {form.formState.errors.amount.message}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" {...form.register("date")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billId">Bill ID (optional)</Label>
                  <Input id="billId" type="text" {...form.register("billId")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" type="text" {...form.register("description")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea id="notes" {...form.register("notes")} />
              </div>
            </div>
            <Button className="w-full mt-6" type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Transaction"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

