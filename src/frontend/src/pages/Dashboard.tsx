import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FolderPlus,
  Plus,
  Shield,
  TrendingUp,
} from "lucide-react";
import { type Variants, motion } from "motion/react";
import { useState } from "react";
import { ControlStatus, Standard } from "../backend.d";
import ComplianceRing from "../components/ComplianceRing";
import { STANDARD_LABELS, mockReports } from "../data/mockData";
import { useEvidenceCoverage, useRecentActivity } from "../hooks/useQueries";

const standards = [
  Standard.IEC62443,
  Standard.NIST_CSF,
  Standard.ISO27001,
  Standard.SOC2,
  Standard.CMMC,
  Standard.NERC_CIP,
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / BigInt(1_000_000));
  const diff = Date.now() - ms;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: recentActivity, isLoading: activityLoading } =
    useRecentActivity(5);
  const { data: coverage, isLoading: coverageLoading } = useEvidenceCoverage();
  const [_hoveredStandard, setHoveredStandard] = useState<Standard | null>(
    null,
  );

  // Aggregate gap stats from mock data
  const gapStats = standards.map((s) => {
    const r = mockReports[s];
    return {
      standard: s,
      compliant: Number(r.compliantCount),
      partial: Number(r.partialCount),
      nonCompliant: Number(r.nonCompliantCount),
      na: Number(r.notApplicableCount),
      total: Number(r.totalControls),
      pct: r.compliancePercentage,
    };
  });

  const totalCompliant = gapStats.reduce((a, s) => a + s.compliant, 0);
  const totalPartial = gapStats.reduce((a, s) => a + s.partial, 0);
  const totalNonCompliant = gapStats.reduce((a, s) => a + s.nonCompliant, 0);
  const totalControls = gapStats.reduce((a, s) => a + s.total, 0);
  const overallPct = Math.round((totalCompliant / totalControls) * 100);

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Security Compliance Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5 font-mono">
            IEC 62443 · NIST CSF · ISO 27001 · SOC 2 · CMMC · NERC CIP
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs border-border hover:border-primary/50"
            onClick={() => navigate({ to: "/evidence" })}
            data-ocid="dashboard.add_evidence.button"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            Add Evidence
          </Button>
          <Button
            size="sm"
            className="gap-1.5 text-xs bg-primary/90 hover:bg-primary shadow-glow-sm"
            onClick={() => navigate({ to: "/assessment" })}
            data-ocid="dashboard.start_assessment.button"
          >
            <Plus className="w-3.5 h-3.5" />
            Start Assessment
          </Button>
        </div>
      </motion.div>

      {/* Overall Score Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="relative rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-accent/5 p-4 overflow-hidden"
      >
        <div className="absolute inset-0 cyber-grid opacity-30" />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center shadow-glow-sm">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-mono uppercase tracking-wider">
                Overall Compliance Score
              </div>
              <div className="font-display text-3xl font-bold text-foreground">
                {overallPct}%
              </div>
            </div>
          </div>
          <div className="flex-1">
            <Progress value={overallPct} className="h-2 bg-muted/50" />
            <div className="flex items-center gap-4 mt-2 text-xs font-mono">
              <span className="text-success">{totalCompliant} compliant</span>
              <span className="text-warning">{totalPartial} partial</span>
              <span className="text-destructive">
                {totalNonCompliant} non-compliant
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Compliance Rings */}
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="mb-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider font-mono flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Standards Overview
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {standards.map((standard) => {
            const report = mockReports[standard];
            return (
              <motion.div
                key={standard}
                variants={item}
                onHoverStart={() => setHoveredStandard(standard)}
                onHoverEnd={() => setHoveredStandard(null)}
              >
                <Card
                  className="p-4 bg-card border-border hover:border-primary/30 transition-all duration-200 cursor-pointer hover:shadow-glow-sm"
                  onClick={() => navigate({ to: "/reports" })}
                >
                  <CardContent className="p-0 flex justify-center">
                    <ComplianceRing
                      value={report.compliancePercentage}
                      size={80}
                      strokeWidth={6}
                      color="auto"
                      label={STANDARD_LABELS[standard]}
                      sublabel={`${Number(report.totalControls)} controls`}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Two column: Gap Bar + Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Gap Analysis */}
        <motion.div variants={item} initial="hidden" animate="show">
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning" />
                Gap Analysis by Standard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gapStats.map((s) => (
                <div key={s.standard} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-foreground">
                      {STANDARD_LABELS[s.standard]}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {s.pct}%
                    </span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden bg-muted/50 gap-px">
                    <div
                      className="bg-success transition-all duration-700"
                      style={{ width: `${(s.compliant / s.total) * 100}%` }}
                    />
                    <div
                      className="bg-warning transition-all duration-700"
                      style={{ width: `${(s.partial / s.total) * 100}%` }}
                    />
                    <div
                      className="bg-destructive transition-all duration-700"
                      style={{ width: `${(s.nonCompliant / s.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex gap-3 text-[10px] font-mono text-muted-foreground">
                    <span className="text-success">{s.compliant}C</span>
                    <span className="text-warning">{s.partial}P</span>
                    <span className="text-destructive">{s.nonCompliant}NC</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item} initial="hidden" animate="show">
          <Card className="bg-card border-border h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                Recent Assessment Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activityLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-12 bg-muted/40" />
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {(recentActivity ?? []).map((assessment) => {
                    const compliantCount = assessment.controlsStatus.filter(
                      ([, s]) => s === ControlStatus.Compliant,
                    ).length;
                    const total = assessment.controlsStatus.length;
                    const pct =
                      total > 0
                        ? Math.round((compliantCount / total) * 100)
                        : 0;
                    return (
                      <div
                        key={assessment.id}
                        className="flex items-center gap-3 p-2.5 rounded-md bg-muted/20 border border-border hover:border-primary/20 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-mono font-semibold text-foreground truncate">
                            {STANDARD_LABELS[assessment.standard]} Assessment
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Progress
                              value={pct}
                              className="h-1 flex-1 bg-muted/50"
                            />
                            <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
                              {pct}%
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono whitespace-nowrap">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(assessment.lastUpdated)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Evidence Coverage */}
      <motion.div variants={item} initial="hidden" animate="show">
        <Card className="bg-card border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Shield className="w-4 h-4 text-accent" />
              Evidence Coverage by Standard
            </CardTitle>
          </CardHeader>
          <CardContent>
            {coverageLoading ? (
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-8 w-24 bg-muted/40" />
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(coverage ?? []).map(([standard, count]) => (
                  <Badge
                    key={standard}
                    variant="outline"
                    className="font-mono text-xs gap-1.5 px-3 py-1.5 bg-accent/10 border-accent/30 text-accent cursor-pointer hover:bg-accent/15 transition-colors"
                    onClick={() => navigate({ to: "/evidence" })}
                  >
                    {STANDARD_LABELS[standard]}
                    <span className="bg-accent/20 text-accent rounded px-1 text-[10px]">
                      {count.toString()} items
                    </span>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
