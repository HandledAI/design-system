"use client"

import { PerformanceMetricsTable } from "@/registry/new-york/ui/performance-metrics-table"

export function PerformanceMetricsTableShowcase() {
  return (
    <div id="custom-performance-metrics-table" className="border rounded-xl p-6 space-y-4 scroll-m-20">
      <h3 className="font-semibold text-lg">Performance Metrics Table</h3>
      <PerformanceMetricsTable
        title="Team Members"
        entityColumnLabel="Team Member"
        primaryMetricColumnLabel="Patients Scheduled (Jan)"
        rateColumnLabel="Conversion Rate"
        metricOneColumnLabel="Calls"
        metricTwoColumnLabel="Time on Phone"
        metricThreeColumnLabel="Texts"
        metricFourColumnLabel="Work Items"
        viewOptions={["By Team Member", "By Facility"]}
        searchPlaceholder="Search members..."
      />
    </div>
  )
}
