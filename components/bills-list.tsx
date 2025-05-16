"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, Plus, AlertCircle } from "lucide-react"
import Link from "next/link"

export function BillsList() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingBills = [
    {
      id: 1,
      name: "Rent",
      amount: 1200,
      dueDate: "2023-05-01",
      status: "upcoming",
      autopay: true,
      category: "Housing",
    },
    {
      id: 2,
      name: "Electricity",
      amount: 85,
      dueDate: "2023-05-05",
      status: "upcoming",
      autopay: false,
      category: "Utilities",
    },
    {
      id: 3,
      name: "Internet",
      amount: 65,
      dueDate: "2023-05-10",
      status: "upcoming",
      autopay: true,
      category: "Utilities",
    },
    {
      id: 4,
      name: "Phone",
      amount: 45,
      dueDate: "2023-05-15",
      status: "upcoming",
      autopay: false,
      category: "Utilities",
    },
    {
      id: 5,
      name: "Streaming Service",
      amount: 15,
      dueDate: "2023-05-20",
      status: "upcoming",
      autopay: true,
      category: "Entertainment",
    },
  ]

  const paidBills = [
    {
      id: 6,
      name: "Gym Membership",
      amount: 50,
      dueDate: "2023-04-15",
      paidDate: "2023-04-15",
      status: "paid",
      autopay: true,
      category: "Health",
    },
    {
      id: 7,
      name: "Car Insurance",
      amount: 120,
      dueDate: "2023-04-10",
      paidDate: "2023-04-09",
      status: "paid",
      autopay: false,
      category: "Insurance",
    },
    {
      id: 8,
      name: "Water Bill",
      amount: 35,
      dueDate: "2023-04-05",
      paidDate: "2023-04-05",
      status: "paid",
      autopay: true,
      category: "Utilities",
    },
  ]

  const overdueBills = [
    {
      id: 9,
      name: "Credit Card",
      amount: 250,
      dueDate: "2023-04-25",
      status: "overdue",
      autopay: false,
      category: "Finance",
      daysOverdue: 3,
    },
  ]

  const markAsPaid = (billId: number) => {
    // Here you would handle marking a bill as paid
    console.log(`Marking bill ${billId} as paid`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bills</h1>
        <Link href="/add-bill">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Bill
        </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bills & Recurring Expenses</CardTitle>
          <CardDescription>Manage your upcoming and paid bills</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                Upcoming
                {upcomingBills.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {upcomingBills.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="paid">
                Paid
                {paidBills.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {paidBills.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="overdue">
                Overdue
                {overdueBills.length > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {overdueBills.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-4">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{bill.name}</span>
                      {bill.autopay && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Autopay
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{bill.category}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Due {new Date(bill.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-medium">${bill.amount.toFixed(2)}</div>
                    </div>
                    {!bill.autopay && (
                      <Button size="sm" onClick={() => markAsPaid(bill.id)}>
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="paid" className="space-y-4 mt-4">
              {paidBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{bill.name}</span>
                      <Badge variant="outline" className="text-xs bg-green-50">
                        <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                        Paid
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{bill.category}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Paid on {new Date(bill.paidDate!).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${bill.amount.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="overdue" className="space-y-4 mt-4">
              {overdueBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{bill.name}</span>
                      <Badge variant="destructive" className="text-xs">
                        <AlertCircle className="mr-1 h-3 w-3" />
                        {bill.daysOverdue} days overdue
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{bill.category}</div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      Due {new Date(bill.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="font-medium">${bill.amount.toFixed(2)}</div>
                    </div>
                    <Button size="sm" onClick={() => markAsPaid(bill.id)}>
                      Mark Paid
                    </Button>
                  </div>
                </div>
              ))}
              {overdueBills.length === 0 && (
                <div className="text-center p-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No Overdue Bills</h3>
                  <p className="text-muted-foreground">You're all caught up!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
