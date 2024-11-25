"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"

const chartConfig = {
  desktop: {
    label: "Appoinments",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Patients",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type Props = {
  chartData: { count: number; month: string | null }[]
}

type ChartDataItem = {
  month: string
  desktop: number
  mobile: number
}
const monthNames = ["January", "February", "March", "April", "May", "June"]
const DashChart = ({ chartData }: Props) => {
  const [formattedData, setFormattedData] = useState<ChartDataItem[]>([])
  console.log(formattedData)
  useEffect(() => {
    const transformData = () => {
      const data = chartData.map((item, index) => ({
        month: monthNames[index] || `Month ${index + 1}`,
        desktop: Math.round(item.count),
        mobile: Math.round(item.count * 0.8),
      }))
      setFormattedData(data)
    }

    transformData()
  }, [chartData])

  return (
    <div className="">
      <Card borderRadius="10px h-[50vh]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Week Chart</h2>
          <CardTitle>Line Chart - Multiple</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              data={formattedData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                Trending up by 5.2% this month{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-2 leading-none text-muted-foreground">
                Showing total visitors for the last 6 months
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default DashChart
