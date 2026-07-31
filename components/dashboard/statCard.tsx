"use client";

import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, Line, ResponsiveContainer } from "recharts";
import { formatPercent } from "@/lib/format";
import { Card } from "../providerui/card";

type StatCardProps = {
  icon: LucideIcon;
  iconColorClass: string; // e.g. "bg-orange-50 text-orange-500"
  value: string; // already formatted, e.g. "4,500,000"
  label: string; // e.g. "Monthly Revenue (XAF)"
  changePercent: number; // e.g. 12 or -1
  sparklineData: number[];
  sparklineColor: string; // e.g. "#f97316" (a hex color, since recharts needs a real color value, not a Tailwind class)
};

export function StatCard({
  icon: Icon,
  iconColorClass,
  value,
  label,
  changePercent,
  sparklineData,
  sparklineColor,
}: StatCardProps) {
  const isPositive = changePercent >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  // recharts needs an array of objects, not just plain numbers
  const chartData = sparklineData.map((value, index) => ({ index, value }));

  const gradientId = `gradient-${sparklineColor.replace("#", "")}`;

  return (
    <Card className="relative overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconColorClass}`}
        >
          <Icon size={18} />
        </div>
        <span
          className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}
        >
          <TrendIcon size={12} />
          {formatPercent(changePercent)}
        </span>
      </div>

      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mb-3 text-xs text-slate-500">{label}</p>

      <div className="h-10 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={sparklineColor}
                  stopOpacity={0.25}
                />
                <stop
                  offset="100%"
                  stopColor={sparklineColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill={`url(#${gradientId})`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={sparklineColor}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
