import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart3,
  CheckCircle2,
  Download,
  HelpCircle,
  MinusCircle,
  Shield,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";
import { Standard } from "../backend.d";
import { STANDARD_LABELS, mockReports } from "../data/mockData";
import { useComplianceReport, useEvidenceCoverage } from "../hooks/useQueries";

const STANDARDS = Object.values(Standard);

const CHART_COLORS = {
  compliant: "oklch(0.7 0.2 145)",
  partial: "oklch(0.75 0.18 55)",
  nonCompliant: "oklch(0.6 0.22 25)",
  notApplicable: "oklch(0.4 0.02 255)",
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className={`flex items-center gap-3 p-3 rounded-md border ${color}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <div className="font-display text-2xl font-bold text-foreground">
          {value}
        </div>
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  );
}

export default function Reports() {
  const [activeStandard, setActiveStandard] = useState<Standard>(
    Standard.IEC62443,
  );
  const { data: report, isLoading: reportLoading } =
    useComplianceReport(activeStandard);
  const { data: coverage, isLoading: coverageLoading } = useEvidenceCoverage();

  const handleExport = () => {
    window.print();
  };

  const allReports = STANDARDS.map((s) => mockReports[s]);

  const chartData = report
    ? [
        {
          name: "Compliant",
          value: Number(report.compliantCount),
          color: CHART_COLORS.compliant,
        },
        {
          name: "Partial",
          value: Number(report.partialCount),
          color: CHART_COLORS.partial,
        },
        {
          name: "Non-Compliant",
          value: Number(report.nonCompliantCount),
          color: CHART_COLORS.nonCompliant,
        },
        {
          name: "N/A",
          value: Number(report.notApplicableCount),
          color: CHART_COLORS.notApplicable,
        },
      ].filter((d) => d.value > 0)
    : [];

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Compliance Reports
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Comprehensive compliance posture analysis and evidence coverage
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={activeStandard}
            onValueChange={(v) => setActiveStandard(v as Standard)}
          >
            <SelectTrigger
              className="bg-card border-border w-40 text-sm"
              data-ocid="reports.standard.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STANDARDS.map((s) => (
                <SelectItem key={s} value={s} className="font-mono text-sm">
                  {STANDARD_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs border-border hover:border-primary/50"
            onClick={handleExport}
            data-ocid="reports.export.button"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </Button>
        </div>
      </motion.div>

      {/* Compliance Report Card */}
      {reportLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 bg-muted/40" />
          ))}
        </div>
      ) : (
        report && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Score Banner */}
            <Card className="bg-card border-border relative overflow-hidden">
              <div className="absolute inset-0 cyber-grid opacity-20" />
              <CardContent className="py-5 relative">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shadow-glow-sm">
                      <Shield className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                        {STANDARD_LABELS[activeStandard]} Compliance Score
                      </div>
                      <div className="font-display text-4xl font-bold text-foreground">
                        {report.compliancePercentage}%
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {Number(report.totalControls)} total controls assessed
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Progress
                      value={report.compliancePercentage}
                      className="h-3 bg-muted/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <StatCard
                icon={<CheckCircle2 className="w-5 h-5 text-success" />}
                label="Compliant"
                value={Number(report.compliantCount)}
                color="border-success/20 bg-success/5"
              />
              <StatCard
                icon={<MinusCircle className="w-5 h-5 text-warning" />}
                label="Partial"
                value={Number(report.partialCount)}
                color="border-warning/20 bg-warning/5"
              />
              <StatCard
                icon={<XCircle className="w-5 h-5 text-destructive" />}
                label="Non-Compliant"
                value={Number(report.nonCompliantCount)}
                color="border-destructive/20 bg-destructive/5"
              />
              <StatCard
                icon={<HelpCircle className="w-5 h-5 text-muted-foreground" />}
                label="Not Applicable"
                value={Number(report.notApplicableCount)}
                color="border-border bg-muted/20"
              />
            </div>

            {/* Chart + All Standards Summary */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Donut Chart */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    Compliance Breakdown — {STANDARD_LABELS[activeStandard]}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={85}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry) => (
                          <Cell
                            key={entry.name}
                            fill={entry.color}
                            stroke="transparent"
                          />
                        ))}
                      </Pie>
                      <RechartsTooltip
                        contentStyle={{
                          background: "oklch(0.155 0.03 260)",
                          border: "1px solid oklch(0.25 0.04 255)",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      />
                      <Legend
                        formatter={(value) => (
                          <span
                            style={{
                              fontSize: "11px",
                              fontFamily: "JetBrains Mono, monospace",
                              color: "oklch(0.85 0.018 220)",
                            }}
                          >
                            {value}
                          </span>
                        )}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* All Standards Summary */}
              <Card className="bg-card border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">
                    All Standards Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {allReports.map((r) => (
                    <button
                      key={r.standard}
                      type="button"
                      aria-label={`Select ${STANDARD_LABELS[r.standard]}`}
                      aria-pressed={r.standard === activeStandard}
                      className={`w-full text-left space-y-1.5 p-2 rounded-md transition-colors cursor-pointer ${
                        r.standard === activeStandard
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted/20"
                      }`}
                      onClick={() => setActiveStandard(r.standard)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-foreground">
                          {STANDARD_LABELS[r.standard]}
                        </span>
                        <span
                          className={`text-xs font-mono font-bold ${
                            r.compliancePercentage >= 80
                              ? "text-success"
                              : r.compliancePercentage >= 60
                                ? "text-warning"
                                : "text-destructive"
                          }`}
                        >
                          {r.compliancePercentage}%
                        </span>
                      </div>
                      <Progress
                        value={r.compliancePercentage}
                        className="h-1.5 bg-muted/50"
                      />
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Evidence Coverage Table */}
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">
                  Evidence Coverage by Standard
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {coverageLoading ? (
                  <div className="p-4 space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-10 bg-muted/40" />
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground">
                          Standard
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-32">
                          Evidence Items
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground">
                          Coverage Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(coverage ?? []).map(([standard, count]) => (
                        <TableRow
                          key={standard}
                          className="border-border hover:bg-muted/20"
                        >
                          <TableCell className="font-mono text-xs font-semibold text-foreground">
                            {STANDARD_LABELS[standard]}
                          </TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {count.toString()} items
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`font-mono text-[10px] ${
                                Number(count) >= 3
                                  ? "text-success border-success/30 bg-success/10"
                                  : Number(count) >= 1
                                    ? "text-warning border-warning/30 bg-warning/10"
                                    : "text-destructive border-destructive/30 bg-destructive/10"
                              }`}
                            >
                              {Number(count) >= 3
                                ? "Good"
                                : Number(count) >= 1
                                  ? "Partial"
                                  : "None"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )
      )}
    </div>
  );
}
