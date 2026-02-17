"use client"

import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { ViewsOverTime } from "@/lib/types"

export function CmsMiniChart({ data }: { data: ViewsOverTime[] }) {
  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.72 0.19 195)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.72 0.19 195)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fontSize: 10, fill: "oklch(0.60 0 0)" }}
            tickFormatter={(val) => new Date(val).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "oklch(0.60 0 0)" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "oklch(0.10 0.01 260)",
              border: "1px solid oklch(0.20 0.01 260)",
              borderRadius: "8px",
              fontSize: "12px",
              color: "oklch(0.95 0 0)",
            }}
            labelFormatter={(val) => new Date(val).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
          />
          <Area
            type="monotone"
            dataKey="views"
            stroke="oklch(0.72 0.19 195)"
            fillOpacity={1}
            fill="url(#viewsGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
