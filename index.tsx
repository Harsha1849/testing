"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronDown,
  ChevronUp,
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  Target,
  Clock,
  ArrowRight,
  Sparkles,
  PieChartIcon,
  BarChart3,
  Wallet,
  Store,
  Globe,
} from "lucide-react"
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface CalculationResults {
  monthlyRevenue: number
  commissionPaid: number
  ownSystemCost: number
  netSavings: number
  suggestedWebsiteCost: number
  suggestedMaintenanceCost: number
}

export default function RestaurantCalculator() {
  const [ordersPerDay, setOrdersPerDay] = useState<number>(50)
  const [averageOrderValue, setAverageOrderValue] = useState<number>(350)
  const [commissionRate, setCommissionRate] = useState<number>(25)
  const [showBreakdown, setShowBreakdown] = useState<boolean>(false)

  const [results, setResults] = useState<CalculationResults>({
    monthlyRevenue: 0,
    commissionPaid: 0,
    ownSystemCost: 0,
    netSavings: 0,
    suggestedWebsiteCost: 0,
    suggestedMaintenanceCost: 0,
  })

  useEffect(() => {
    calculateResults()
  }, [ordersPerDay, averageOrderValue, commissionRate])

  const calculateResults = () => {
    const monthlyOrders = ordersPerDay * 30
    const monthlyRevenue = monthlyOrders * averageOrderValue
    const commissionPaid = (monthlyRevenue * commissionRate) / 100
    const ownSystemCost = 5000
    const suggestedMaintenanceCost = 6000
    const totalMonthlyCost = ownSystemCost + suggestedMaintenanceCost
    const netSavings = commissionPaid - totalMonthlyCost
    const suggestedWebsiteCost = Math.max(40000, netSavings * 1.75)

    setResults({
      monthlyRevenue,
      commissionPaid,
      ownSystemCost,
      netSavings,
      suggestedWebsiteCost,
      suggestedMaintenanceCost,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const pieChartData = [
    { name: "Platform Commission", value: results.commissionPaid, color: "#EF4444" },
    { name: "Own System", value: results.ownSystemCost + results.suggestedMaintenanceCost, color: "#10B981" },
    { name: "Monthly Savings", value: Math.max(0, results.netSavings), color: "#3B82F6" },
  ]

  const savingsPercentage =
    results.commissionPaid > 0 ? (Math.max(0, results.netSavings) / results.commissionPaid) * 100 : 0
  const paybackMonths = results.netSavings > 0 ? Math.ceil(results.suggestedWebsiteCost / results.netSavings) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Smart Restaurant Analytics
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Calculate Your Platform Savings
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover how much you could save by switching from delivery platforms to your own ordering system
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-4">
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <Store className="h-5 w-5 text-white" />
                  </div>
                  Restaurant Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="orders" className="text-sm font-semibold text-gray-700">
                    Average Orders Per Day
                  </Label>
                  <div className="relative">
                    <Input
                      id="orders"
                      type="number"
                      value={ordersPerDay}
                      onChange={(e) => setOrdersPerDay(Number(e.target.value) || 0)}
                      placeholder="e.g., 50"
                      className="text-lg h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Badge variant="secondary" className="text-xs">
                        orders
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="orderValue" className="text-sm font-semibold text-gray-700">
                    Average Order Value
                  </Label>
                  <div className="relative">
                    <Input
                      id="orderValue"
                      type="number"
                      value={averageOrderValue}
                      onChange={(e) => setAverageOrderValue(Number(e.target.value) || 0)}
                      placeholder="e.g., 350"
                      className="text-lg h-12 border-2 border-gray-200 focus:border-blue-500 transition-colors pl-8"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-semibold text-gray-700">Commission Rate</Label>
                    <Badge variant="outline" className="text-lg font-bold">
                      {commissionRate}%
                    </Badge>
                  </div>
                  <Slider
                    value={[commissionRate]}
                    onValueChange={(value) => setCommissionRate(value[0])}
                    max={35}
                    min={15}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>15% (Low)</span>
                    <span>35% (High)</span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                      <p className="text-xs text-blue-600 font-medium">Monthly Orders</p>
                      <p className="text-lg font-bold text-blue-700">{ordersPerDay * 30}</p>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                      <p className="text-xs text-green-600 font-medium">Daily Revenue</p>
                      <p className="text-lg font-bold text-green-700">
                        {formatCurrency(ordersPerDay * averageOrderValue)}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="h-6 w-6" />
                    <span className="text-sm font-medium opacity-90">Monthly Revenue</span>
                  </div>
                  <p className="text-3xl font-bold">{formatCurrency(results.monthlyRevenue)}</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-red-500 to-red-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingDown className="h-6 w-6" />
                    <span className="text-sm font-medium opacity-90">Commission Lost</span>
                  </div>
                  <p className="text-3xl font-bold">{formatCurrency(results.commissionPaid)}</p>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10" />
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-6 w-6" />
                    <span className="text-sm font-medium opacity-90">Monthly Savings</span>
                  </div>
                  <p className="text-3xl font-bold">{formatCurrency(Math.max(0, results.netSavings))}</p>
                </CardContent>
              </Card>
            </div>

            {/* Savings Progress */}
            {results.netSavings > 0 && (
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Savings Potential</h3>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {savingsPercentage.toFixed(0)}% Savings
                    </Badge>
                  </div>
                  <Progress value={Math.min(savingsPercentage, 100)} className="h-3 mb-2" />
                  <p className="text-sm text-gray-600">
                    You could save {savingsPercentage.toFixed(0)}% of your current platform costs
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Investment Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Globe className="h-5 w-5 text-white" />
                    </div>
                    Investment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-700">Website Development</span>
                      <Badge variant="outline" className="text-purple-700 border-purple-300">
                        One-time
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-purple-800">{formatCurrency(results.suggestedWebsiteCost)}</p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-indigo-700">Monthly Maintenance</span>
                      <Badge variant="outline" className="text-indigo-700 border-indigo-300">
                        Recurring
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold text-indigo-800">
                      {formatCurrency(results.suggestedMaintenanceCost)}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                      <PieChartIcon className="h-5 w-5 text-white" />
                    </div>
                    Cost Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        dataKey="value"
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip>
                        <ChartTooltipContent
                          formatter={(value) => formatCurrency(value as number)}
                          labelFormatter={(label) => label}
                        />
                      </ChartTooltip>
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Investment Summary */}
            {results.netSavings > 0 && (
              <Card className="shadow-xl border-0 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Target className="h-6 w-6" />
                    </div>
                    Investment Opportunity
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5" />
                        <span className="text-sm font-medium opacity-90">Investment</span>
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(results.suggestedWebsiteCost)}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-sm font-medium opacity-90">Monthly Savings</span>
                      </div>
                      <p className="text-2xl font-bold">{formatCurrency(results.netSavings)}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="h-5 w-5" />
                        <span className="text-sm font-medium opacity-90">Payback Period</span>
                      </div>
                      <p className="text-2xl font-bold">{paybackMonths} months</p>
                    </div>
                  </div>

                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Zap className="h-6 w-6" />
                      <span className="text-lg font-semibold">After Recovery Period</span>
                    </div>
                    <p className="text-3xl font-bold mb-2">{formatCurrency(results.netSavings)}</p>
                    <p className="opacity-90">pure profit every month!</p>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm opacity-80">
                      <ArrowRight className="h-4 w-4" />
                      <span>{formatCurrency(results.netSavings * 12)} additional profit per year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Detailed Breakdown */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between p-6 h-auto hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="h-5 w-5" />
                      <span className="font-semibold text-lg">Detailed Analysis</span>
                    </div>
                    {showBreakdown ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent className="pt-0 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full" />
                          Current Platform Costs
                        </h4>
                        <div className="space-y-3 text-sm bg-red-50 p-4 rounded-lg">
                          <div className="flex justify-between">
                            <span>Average orders per day:</span>
                            <span className="font-medium">{ordersPerDay} orders</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Average order value:</span>
                            <span className="font-medium">{formatCurrency(averageOrderValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly orders:</span>
                            <span className="font-medium">{ordersPerDay * 30} orders</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Commission rate:</span>
                            <span className="font-medium">{commissionRate}%</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold">Total commission paid:</span>
                            <span className="font-bold text-red-600">{formatCurrency(results.commissionPaid)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          Own System Costs
                        </h4>
                        <div className="space-y-3 text-sm bg-green-50 p-4 rounded-lg">
                          <div className="flex justify-between">
                            <span>Monthly ordering system:</span>
                            <span className="font-medium">{formatCurrency(results.ownSystemCost)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly maintenance:</span>
                            <span className="font-medium">{formatCurrency(results.suggestedMaintenanceCost)}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-semibold">Total monthly cost:</span>
                            <span className="font-bold text-green-600">
                              {formatCurrency(results.ownSystemCost + results.suggestedMaintenanceCost)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Investment Analysis
                      </h4>
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div className="text-center p-3 bg-white rounded-lg">
                          <span className="text-gray-600">Payback Period</span>
                          <p className="text-lg font-bold text-blue-600">
                            {results.netSavings > 0 ? `${paybackMonths} months` : "N/A"}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <span className="text-gray-600">Annual Savings</span>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(Math.max(0, results.netSavings * 12))}
                          </p>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg">
                          <span className="text-gray-600">ROI (1 Year)</span>
                          <p className="text-lg font-bold text-purple-600">
                            {results.suggestedWebsiteCost > 0
                              ? `${(((results.netSavings * 12) / results.suggestedWebsiteCost) * 100).toFixed(0)}%`
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-gray-600 shadow-sm">
            <Calculator className="h-4 w-4" />
            Calculations are estimates based on provided inputs. Actual costs may vary.
          </div>
        </div>
      </div>
    </div>
  )
}
