import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

export function UpcomingBills() {
  const bills = [
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
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Bills</CardTitle>
        <CardDescription>You have {bills.length} bills due this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bills.map((bill) => (
            <div key={bill.id} className="flex items-center justify-between">
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
              </div>
              <div className="text-right">
                <div className="font-medium">${bill.amount.toFixed(2)}</div>
                <div className="text-sm text-muted-foreground">Due {new Date(bill.dueDate).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
