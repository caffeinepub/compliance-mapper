import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GitCompare, Info, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { type ControlFamily, Standard } from "../backend.d";
import { FAMILY_LABELS, STANDARD_LABELS } from "../data/mockData";
import { useAllControls, useCrosswalkMappings } from "../hooks/useQueries";

const STANDARDS = Object.values(Standard);

const CONFIDENCE_RULES: Record<string, { label: string; className: string }> = {
  direct: {
    label: "Direct",
    className: "bg-success/15 text-success border-success/30",
  },
  partial: {
    label: "Partial",
    className: "bg-warning/15 text-warning border-warning/30",
  },
  indirect: {
    label: "Indirect",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

function getMappingConfidence(
  sourceId: string,
  targetId: string,
): keyof typeof CONFIDENCE_RULES {
  // Heuristic: same control family prefix = direct, similar number = partial, else indirect
  const srcNum = Number.parseInt(sourceId.replace(/\D/g, ""), 10);
  const tgtNum = Number.parseInt(targetId.replace(/\D/g, ""), 10);
  if (Math.abs(srcNum - tgtNum) <= 1) return "direct";
  if (Math.abs(srcNum - tgtNum) <= 5) return "partial";
  return "indirect";
}

export default function Crosswalk() {
  const [sourceStandard, setSourceStandard] = useState<Standard>(
    Standard.IEC62443,
  );
  const [targetStandard, setTargetStandard] = useState<Standard>(
    Standard.NIST_CSF,
  );
  const [search, setSearch] = useState("");
  const [familyFilter, setFamilyFilter] = useState<string>("all");

  const { data: mappings, isLoading } = useCrosswalkMappings(
    sourceStandard,
    targetStandard,
  );
  const { data: controls } = useAllControls();

  const controlMap = useMemo(() => {
    const map: Record<string, { description: string; family: ControlFamily }> =
      {};
    for (const c of controls ?? []) {
      map[c.id] = { description: c.description, family: c.family };
    }
    return map;
  }, [controls]);

  const filtered = useMemo(() => {
    return (mappings ?? []).filter((m) => {
      const matchSearch =
        !search ||
        m.sourceControlId.toLowerCase().includes(search.toLowerCase()) ||
        m.targetControlId.toLowerCase().includes(search.toLowerCase()) ||
        (controlMap[m.sourceControlId]?.description ?? "")
          .toLowerCase()
          .includes(search.toLowerCase());
      const matchFamily =
        familyFilter === "all" ||
        controlMap[m.sourceControlId]?.family === familyFilter;
      return matchSearch && matchFamily;
    });
  }, [mappings, search, familyFilter, controlMap]);

  const uniqueFamilies = useMemo(() => {
    const families = new Set<string>();
    for (const m of mappings ?? []) {
      const f = controlMap[m.sourceControlId]?.family;
      if (f) families.add(f);
    }
    return Array.from(families);
  }, [mappings, controlMap]);

  return (
    <TooltipProvider>
      <div className="p-4 lg:p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground flex items-center gap-2">
            <GitCompare className="w-6 h-6 text-primary" />
            Standards Crosswalk
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Map controls between cybersecurity standards to understand coverage
            and gaps
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="flex items-center gap-2 flex-1">
            <div className="flex-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1 block">
                Source Standard
              </span>
              <Select
                value={sourceStandard}
                onValueChange={(v) => setSourceStandard(v as Standard)}
              >
                <SelectTrigger
                  data-ocid="crosswalk.source.select"
                  className="bg-card border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STANDARDS.filter((s) => s !== targetStandard).map((s) => (
                    <SelectItem key={s} value={s} className="font-mono text-sm">
                      {STANDARD_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-5 flex-shrink-0 text-muted-foreground">→</div>
            <div className="flex-1">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1 block">
                Target Standard
              </span>
              <Select
                value={targetStandard}
                onValueChange={(v) => setTargetStandard(v as Standard)}
              >
                <SelectTrigger
                  data-ocid="crosswalk.target.select"
                  className="bg-card border-border"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STANDARDS.filter((s) => s !== sourceStandard).map((s) => (
                    <SelectItem key={s} value={s} className="font-mono text-sm">
                      {STANDARD_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <div>
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1 block">
                Control Family
              </span>
              <Select value={familyFilter} onValueChange={setFamilyFilter}>
                <SelectTrigger className="bg-card border-border w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Families</SelectItem>
                  {uniqueFamilies.map((f) => (
                    <SelectItem key={f} value={f} className="text-sm">
                      {FAMILY_LABELS[f as ControlFamily] ?? f}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by control ID or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border font-mono text-sm"
            data-ocid="crosswalk.search_input"
          />
        </div>

        {/* Stats row */}
        <div className="flex gap-3 flex-wrap">
          {Object.entries(CONFIDENCE_RULES).map(([key, conf]) => {
            const count = filtered.filter(
              (m) =>
                getMappingConfidence(m.sourceControlId, m.targetControlId) ===
                key,
            ).length;
            return (
              <Badge
                key={key}
                variant="outline"
                className={`font-mono text-xs ${conf.className}`}
              >
                {conf.label}: {count}
              </Badge>
            );
          })}
          <Badge
            variant="outline"
            className="font-mono text-xs text-muted-foreground border-border"
          >
            Total: {filtered.length} mappings
          </Badge>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-foreground">
                {STANDARD_LABELS[sourceStandard]} →{" "}
                {STANDARD_LABELS[targetStandard]} Mappings
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="p-4 space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-10 bg-muted/40" />
                  ))}
                </div>
              ) : filtered.length === 0 ? (
                <div
                  className="p-8 text-center"
                  data-ocid="crosswalk.empty_state"
                >
                  <GitCompare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No mappings found for this combination
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table data-ocid="crosswalk.table">
                    <TableHeader>
                      <TableRow className="border-border hover:bg-transparent">
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-28">
                          {STANDARD_LABELS[sourceStandard]} Control
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground">
                          Description
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-24">
                          Family
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-28">
                          → {STANDARD_LABELS[targetStandard]}
                        </TableHead>
                        <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-24">
                          Confidence
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filtered.map((mapping, idx) => {
                        const srcControl = controlMap[mapping.sourceControlId];
                        const confidence = getMappingConfidence(
                          mapping.sourceControlId,
                          mapping.targetControlId,
                        );
                        const conf = CONFIDENCE_RULES[confidence];
                        return (
                          <TableRow
                            key={`${mapping.sourceControlId}-${mapping.targetControlId}-${idx}`}
                            className="border-border hover:bg-muted/20 transition-colors"
                          >
                            <TableCell>
                              <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                                {mapping.sourceControlId}
                              </span>
                            </TableCell>
                            <TableCell className="text-xs text-foreground max-w-xs">
                              {srcControl?.description ?? "—"}
                            </TableCell>
                            <TableCell>
                              {srcControl?.family ? (
                                <span className="text-[10px] font-mono text-muted-foreground">
                                  {FAMILY_LABELS[srcControl.family]}
                                </span>
                              ) : (
                                "—"
                              )}
                            </TableCell>
                            <TableCell>
                              <span className="font-mono text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded">
                                {mapping.targetControlId}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge
                                    variant="outline"
                                    className={`font-mono text-[10px] ${conf.className}`}
                                  >
                                    {conf.label}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="text-xs">
                                    {confidence === "direct" &&
                                      "Controls address the same requirement directly"}
                                    {confidence === "partial" &&
                                      "Controls partially overlap in scope"}
                                    {confidence === "indirect" &&
                                      "Controls are related but address different aspects"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="w-3.5 h-3.5" />
          <span>
            Confidence ratings indicate the strength of the mapping between
            control requirements.
          </span>
        </div>
      </div>
    </TooltipProvider>
  );
}
