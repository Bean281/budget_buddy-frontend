"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Home,
  ShoppingCart,
  Car,
  Utensils,
  Tv,
  Briefcase,
  Gift,
  Lightbulb,
  Wifi,
  Smartphone,
  PiggyBank,
  TrendingUp,
  Building,
  Landmark,
  CreditCard,
  Droplet,
  Scissors,
  Shirt,
  GraduationCap,
  Heart,
  Plane,
  Coffee,
  Music,
  BookOpen,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

// Define a type for icon mapping
type IconComponent = typeof DollarSign
interface IconMap {
  [key: string]: IconComponent
}

export function CategoryManagement() {
  const [activeTab, setActiveTab] = useState("expense")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null)

  // Form state
  const [categoryName, setCategoryName] = useState("")
  const [categoryIcon, setCategoryIcon] = useState("dollar-sign")
  const [categoryColor, setCategoryColor] = useState("#3b82f6")
  const [categoryBudget, setCategoryBudget] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")

  // Icon mapping
  const iconMap: IconMap = {
    "dollar-sign": DollarSign,
    home: Home,
    "shopping-cart": ShoppingCart,
    car: Car,
    utensils: Utensils,
    tv: Tv,
    briefcase: Briefcase,
    gift: Gift,
    lightbulb: Lightbulb,
    wifi: Wifi,
    smartphone: Smartphone,
    "piggy-bank": PiggyBank,
    "trending-up": TrendingUp,
    building: Building,
    landmark: Landmark,
    "credit-card": CreditCard,
    droplet: Droplet,
    scissors: Scissors,
    shirt: Shirt,
    "graduation-cap": GraduationCap,
    heart: Heart,
    plane: Plane,
    coffee: Coffee,
    music: Music,
    "book-open": BookOpen,
  }

  // Function to render icon
  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName] || DollarSign
    return <IconComponent className="h-4 w-4" />
  }

  // Mock data for categories
  const [expenseCategories, setExpenseCategories] = useState([
    {
      id: "housing",
      name: "Housing",
      icon: "home",
      color: "#8b5cf6",
      budget: 1200,
      description: "Rent, mortgage, property taxes",
    },
    {
      id: "groceries",
      name: "Groceries",
      icon: "shopping-cart",
      color: "#22c55e",
      budget: 500,
      description: "Food and household items",
    },
    {
      id: "transportation",
      name: "Transportation",
      icon: "car",
      color: "#3b82f6",
      budget: 250,
      description: "Gas, public transit, car maintenance",
    },
    {
      id: "utilities",
      name: "Utilities",
      icon: "lightbulb",
      color: "#eab308",
      budget: 200,
      description: "Electricity, water, gas",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      icon: "tv",
      color: "#ec4899",
      budget: 300,
      description: "Movies, events, hobbies",
    },
  ])

  const [incomeCategories, setIncomeCategories] = useState([
    {
      id: "salary",
      name: "Salary",
      icon: "briefcase",
      color: "#22c55e",
      budget: 0,
      description: "Regular employment income",
    },
    {
      id: "freelance",
      name: "Freelance",
      icon: "dollar-sign",
      color: "#3b82f6",
      budget: 0,
      description: "Contract and gig work",
    },
    {
      id: "investments",
      name: "Investments",
      icon: "trending-up",
      color: "#8b5cf6",
      budget: 0,
      description: "Dividends, capital gains, interest",
    },
    { id: "gifts", name: "Gifts", icon: "gift", color: "#ec4899", budget: 0, description: "Money received as gifts" },
  ])

  const [investmentCategories, setInvestmentCategories] = useState([
    {
      id: "emergency",
      name: "Emergency Fund",
      icon: "piggy-bank",
      color: "#22c55e",
      budget: 0,
      description: "3-6 months of expenses",
    },
    {
      id: "stocks",
      name: "Stocks",
      icon: "bar-chart",
      color: "#3b82f6",
      budget: 0,
      description: "Individual stocks and ETFs",
    },
    {
      id: "realestate",
      name: "Real Estate",
      icon: "building",
      color: "#8b5cf6",
      budget: 0,
      description: "Property investments",
    },
    {
      id: "retirement",
      name: "Retirement",
      icon: "landmark",
      color: "#eab308",
      budget: 0,
      description: "401k, IRA, pension",
    },
  ])

  // Enhanced icon options with visual representation
  const iconOptions = [
    { value: "dollar-sign", label: "Dollar", icon: DollarSign },
    { value: "home", label: "Home", icon: Home },
    { value: "shopping-cart", label: "Shopping Cart", icon: ShoppingCart },
    { value: "car", label: "Car", icon: Car },
    { value: "utensils", label: "Food", icon: Utensils },
    { value: "tv", label: "Entertainment", icon: Tv },
    { value: "briefcase", label: "Work", icon: Briefcase },
    { value: "gift", label: "Gift", icon: Gift },
    { value: "lightbulb", label: "Utilities", icon: Lightbulb },
    { value: "wifi", label: "Internet", icon: Wifi },
    { value: "smartphone", label: "Phone", icon: Smartphone },
    { value: "piggy-bank", label: "Savings", icon: PiggyBank },
    { value: "trending-up", label: "Investments", icon: TrendingUp },
    { value: "building", label: "Real Estate", icon: Building },
    { value: "landmark", label: "Banking", icon: Landmark },
    { value: "credit-card", label: "Credit Card", icon: CreditCard },
    { value: "droplet", label: "Water", icon: Droplet },
    { value: "scissors", label: "Services", icon: Scissors },
    { value: "shirt", label: "Clothing", icon: Shirt },
    { value: "graduation-cap", label: "Education", icon: GraduationCap },
    { value: "heart", label: "Health", icon: Heart },
    { value: "plane", label: "Travel", icon: Plane },
    { value: "coffee", label: "Coffee", icon: Coffee },
    { value: "music", label: "Music", icon: Music },
    { value: "book-open", label: "Books", icon: BookOpen },
  ]

  // Update the colorOptions array to match the new color scheme
  const colorOptions = [
    { value: "#22c55e", label: "Green (Primary)" },
    { value: "#f97316", label: "Orange (Food)" },
    { value: "#8b5cf6", label: "Purple (Entertainment)" },
    { value: "#3b82f6", label: "Blue (Shopping)" },
    { value: "#f59e0b", label: "Amber (Coffee)" },
    { value: "#10b981", label: "Emerald (Housing)" },
    { value: "#ef4444", label: "Red (Transportation)" },
    { value: "#0ea5e9", label: "Sky (Utilities)" },
    { value: "#6b7280", label: "Gray" },
  ]

  const getCurrentCategories = () => {
    switch (activeTab) {
      case "expense":
        return expenseCategories
      case "income":
        return incomeCategories
      case "investment":
        return investmentCategories
      default:
        return []
    }
  }

  const setCurrentCategories = (categories: any[]) => {
    switch (activeTab) {
      case "expense":
        setExpenseCategories(categories)
        break
      case "income":
        setIncomeCategories(categories)
        break
      case "investment":
        setInvestmentCategories(categories)
        break
    }
  }

  const handleAddCategory = () => {
    setIsEditMode(false)
    setCategoryName("")
    setCategoryIcon("dollar-sign")
    setCategoryColor("#3b82f6")
    setCategoryBudget("")
    setCategoryDescription("")
    setIsDialogOpen(true)
  }

  const handleEditCategory = (category: any) => {
    setIsEditMode(true)
    setEditingCategoryId(category.id)
    setCategoryName(category.name)
    setCategoryIcon(category.icon)
    setCategoryColor(category.color)
    setCategoryBudget(category.budget.toString())
    setCategoryDescription(category.description)
    setIsDialogOpen(true)
  }

  const handleDeleteCategory = (categoryId: string) => {
    const categories = getCurrentCategories().filter((cat) => cat.id !== categoryId)
    setCurrentCategories(categories)
    toast({
      title: "Category deleted",
      description: "The category has been removed.",
    })
  }

  const handleSaveCategory = () => {
    if (!categoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name is required.",
        variant: "destructive",
      })
      return
    }

    const newCategory = {
      id: isEditMode && editingCategoryId ? editingCategoryId : Date.now().toString(),
      name: categoryName,
      icon: categoryIcon,
      color: categoryColor,
      budget: categoryBudget ? Number.parseFloat(categoryBudget) : 0,
      description: categoryDescription,
    }

    if (isEditMode && editingCategoryId) {
      const categories = getCurrentCategories().map((cat) => (cat.id === editingCategoryId ? newCategory : cat))
      setCurrentCategories(categories)
      toast({
        title: "Category updated",
        description: `${categoryName} has been updated.`,
      })
    } else {
      const categories = [...getCurrentCategories(), newCategory]
      setCurrentCategories(categories)
      toast({
        title: "Category added",
        description: `${categoryName} has been added.`,
      })
    }

    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Category Management</h1>
        <Button onClick={handleAddCategory}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>Create, edit, and organize your financial categories</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="expense">Expense</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
            </TabsList>

            <TabsContent value="expense" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {expenseCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: category.color }}
                            >
                              {renderIcon(category.icon)}
                            </div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>${category.budget.toFixed(2)}</TableCell>
                        <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="income" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomeCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: category.color }}
                            >
                              {renderIcon(category.icon)}
                            </div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="investment" className="mt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Description</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investmentCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-8 w-8 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: category.color }}
                            >
                              {renderIcon(category.icon)}
                            </div>
                            <span className="font-medium">{category.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{category.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEditCategory(category)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Category" : "Add Category"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Update the category details below." : "Fill in the details to create a new category."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input
                id="categoryName"
                placeholder="e.g., Groceries, Rent, Salary"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="categoryIcon">Icon</Label>
                <Select value={categoryIcon} onValueChange={setCategoryIcon}>
                  <SelectTrigger id="categoryIcon" className="flex items-center gap-2">
                    <SelectValue placeholder="Select icon">
                      <div className="flex items-center gap-2">
                        {renderIcon(categoryIcon)}
                        <span>{iconOptions.find((icon) => icon.value === categoryIcon)?.label || "Select icon"}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <ScrollArea className="h-72">
                      <div className="grid grid-cols-2 gap-2 p-2">
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value} className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              <icon.icon className="h-4 w-4" />
                              <span>{icon.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </div>
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryColor">Color</Label>
                <Select value={categoryColor} onValueChange={setCategoryColor}>
                  <SelectTrigger id="categoryColor">
                    <SelectValue placeholder="Select color">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: categoryColor }}></div>
                        {colorOptions.find((color) => color.value === categoryColor)?.label || "Select color"}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <div className="grid grid-cols-3 gap-2 p-2">
                      {colorOptions.map((color) => (
                        <SelectItem key={color.value} value={color.value}>
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full" style={{ backgroundColor: color.value }}></div>
                            {color.label}
                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeTab === "expense" && (
              <div className="space-y-2">
                <Label htmlFor="categoryBudget">Budget Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="categoryBudget"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-9"
                    value={categoryBudget}
                    onChange={(e) => setCategoryBudget(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Description (Optional)</Label>
              <Input
                id="categoryDescription"
                placeholder="Add a description for this category"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
              />
            </div>

            {/* Preview of the category */}
            <div className="border rounded-md p-4 mt-4">
              <h4 className="text-sm font-medium mb-2">Preview</h4>
              <div className="flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: categoryColor }}
                >
                  {renderIcon(categoryIcon)}
                </div>
                <div>
                  <div className="font-medium">{categoryName || "Category Name"}</div>
                  <div className="text-xs text-muted-foreground">{categoryDescription || "Category description"}</div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>{isEditMode ? "Update" : "Create"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
