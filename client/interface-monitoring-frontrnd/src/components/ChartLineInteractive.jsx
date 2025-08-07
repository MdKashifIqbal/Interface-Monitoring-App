import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive line chart"

const chartData = [
  { date: "2024-04-01", success: 222, failure: 150, warning: 80 },
  { date: "2024-04-02", success: 97, failure: 180, warning: 120 },
  { date: "2024-04-03", success: 167, failure: 120, warning: 90 },
  { date: "2024-04-04", success: 242, failure: 260, warning: 140 },
  { date: "2024-04-05", success: 373, failure: 290, warning: 160 },
  { date: "2024-04-06", success: 301, failure: 340, warning: 180 },
  { date: "2024-04-07", success: 245, failure: 180, warning: 100 },
  { date: "2024-04-08", success: 409, failure: 320, warning: 170 },
  { date: "2024-04-09", success: 59, failure: 110, warning: 70 },
  { date: "2024-04-10", success: 261, failure: 190, warning: 110 },
  { date: "2024-04-11", success: 327, failure: 350, warning: 190 },
  { date: "2024-04-12", success: 292, failure: 210, warning: 130 },
  { date: "2024-04-13", success: 342, failure: 380, warning: 200 },
  { date: "2024-04-14", success: 137, failure: 220, warning: 140 },
  { date: "2024-04-15", success: 120, failure: 170, warning: 95 },
  { date: "2024-04-16", success: 138, failure: 190, warning: 105 },
  { date: "2024-04-17", success: 446, failure: 360, warning: 210 },
  { date: "2024-04-18", success: 364, failure: 410, warning: 230 },
  { date: "2024-04-19", success: 243, failure: 180, warning: 120 },
  { date: "2024-04-20", success: 89, failure: 150, warning: 85 },
  { date: "2024-04-21", success: 137, failure: 200, warning: 110 },
  { date: "2024-04-22", success: 224, failure: 170, warning: 100 },
  { date: "2024-04-23", success: 138, failure: 230, warning: 135 },
  { date: "2024-04-24", success: 387, failure: 290, warning: 165 },
  { date: "2024-04-25", success: 215, failure: 250, warning: 140 },
  { date: "2024-04-26", success: 75, failure: 130, warning: 75 },
  { date: "2024-04-27", success: 383, failure: 420, warning: 220 },
  { date: "2024-04-28", success: 122, failure: 180, warning: 95 },
  { date: "2024-04-29", success: 315, failure: 240, warning: 145 },
  { date: "2024-04-30", success: 454, failure: 380, warning: 210 },
  { date: "2024-05-01", success: 165, failure: 220, warning: 125 },
  { date: "2024-05-02", success: 293, failure: 310, warning: 175 },
  { date: "2024-05-03", success: 247, failure: 190, warning: 115 },
  { date: "2024-05-04", success: 385, failure: 420, warning: 235 },
  { date: "2024-05-05", success: 481, failure: 390, warning: 220 },
  { date: "2024-05-06", success: 498, failure: 520, warning: 280 },
  { date: "2024-05-07", success: 388, failure: 300, warning: 170 },
  { date: "2024-05-08", success: 149, failure: 210, warning: 125 },
  { date: "2024-05-09", success: 227, failure: 180, warning: 105 },
  { date: "2024-05-10", success: 293, failure: 330, warning: 185 },
  { date: "2024-05-11", success: 335, failure: 270, warning: 155 },
  { date: "2024-05-12", success: 197, failure: 240, warning: 135 },
  { date: "2024-05-13", success: 197, failure: 160, warning: 90 },
  { date: "2024-05-14", success: 448, failure: 490, warning: 265 },
  { date: "2024-05-15", success: 473, failure: 380, warning: 215 },
  { date: "2024-05-16", success: 338, failure: 400, warning: 225 },
  { date: "2024-05-17", success: 499, failure: 420, warning: 240 },
  { date: "2024-05-18", success: 315, failure: 350, warning: 195 },
  { date: "2024-05-19", success: 235, failure: 180, warning: 110 },
  { date: "2024-05-20", success: 177, failure: 230, warning: 130 },
  { date: "2024-05-21", success: 82, failure: 140, warning: 85 },
  { date: "2024-05-22", success: 81, failure: 120, warning: 70 },
  { date: "2024-05-23", success: 252, failure: 290, warning: 165 },
  { date: "2024-05-24", success: 294, failure: 220, warning: 135 },
  { date: "2024-05-25", success: 201, failure: 250, warning: 145 },
  { date: "2024-05-26", success: 213, failure: 170, warning: 100 },
  { date: "2024-05-27", success: 420, failure: 460, warning: 250 },
  { date: "2024-05-28", success: 233, failure: 190, warning: 115 },
  { date: "2024-05-29", success: 78, failure: 130, warning: 75 },
  { date: "2024-05-30", success: 340, failure: 280, warning: 160 },
  { date: "2024-05-31", success: 178, failure: 230, warning: 130 },
  { date: "2024-06-01", success: 178, failure: 200, warning: 115 },
  { date: "2024-06-02", success: 470, failure: 410, warning: 235 },
  { date: "2024-06-03", success: 103, failure: 160, warning: 95 },
  { date: "2024-06-04", success: 439, failure: 380, warning: 215 },
  { date: "2024-06-05", success: 88, failure: 140, warning: 80 },
  { date: "2024-06-06", success: 294, failure: 250, warning: 145 },
  { date: "2024-06-07", success: 323, failure: 370, warning: 205 },
  { date: "2024-06-08", success: 385, failure: 320, warning: 180 },
  { date: "2024-06-09", success: 438, failure: 480, warning: 260 },
  { date: "2024-06-10", success: 155, failure: 200, warning: 115 },
  { date: "2024-06-11", success: 92, failure: 150, warning: 85 },
  { date: "2024-06-12", success: 492, failure: 420, warning: 240 },
  { date: "2024-06-13", success: 81, failure: 130, warning: 75 },
  { date: "2024-06-14", success: 426, failure: 380, warning: 215 },
  { date: "2024-06-15", success: 307, failure: 350, warning: 195 },
  { date: "2024-06-16", success: 371, failure: 310, warning: 175 },
  { date: "2024-06-17", success: 475, failure: 520, warning: 280 },
  { date: "2024-06-18", success: 107, failure: 170, warning: 100 },
  { date: "2024-06-19", success: 341, failure: 290, warning: 165 },
  { date: "2024-06-20", success: 408, failure: 450, warning: 245 },
  { date: "2024-06-21", success: 169, failure: 210, warning: 125 },
  { date: "2024-06-22", success: 317, failure: 270, warning: 155 },
  { date: "2024-06-23", success: 480, failure: 530, warning: 285 },
  { date: "2024-06-24", success: 132, failure: 180, warning: 105 },
  { date: "2024-06-25", success: 141, failure: 190, warning: 110 },
  { date: "2024-06-26", success: 434, failure: 380, warning: 215 },
  { date: "2024-06-27", success: 448, failure: 490, warning: 265 },
  { date: "2024-06-28", success: 149, failure: 200, warning: 115 },
  { date: "2024-06-29", success: 103, failure: 160, warning: 95 },
  { date: "2024-06-30", success: 446, failure: 400, warning: 225 },
]

// Define chart configuration as a regular object instead of using ChartConfig type
const chartConfig = {
  metrics: {
    label: "Metrics",
  },
  success: {
    label: "Success",
    color: "#22c55e", // Green color for success
  },
  failure: {
    label: "Failure", 
    color: "#ef4444", // Red color for failure
  },
  warning: {
    label: "Warning",
    color: "#f59e0b", // Orange/yellow color for warning
  },
}

export function ChartLineInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>
            Showing metrics (success, failure, warning) for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Line
              dataKey="success"
              type="monotone"
              stroke="#22c55e"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="failure"
              type="monotone"
              stroke="#ef4444"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="warning"
              type="monotone"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
