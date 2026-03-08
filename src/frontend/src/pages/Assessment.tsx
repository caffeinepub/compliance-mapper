import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, Loader2, Plus, Search } from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ControlStatus, Standard } from "../backend.d";
import StatusBadge from "../components/StatusBadge";
import { FAMILY_LABELS, STANDARD_LABELS } from "../data/mockData";
import {
  useAllAssessments,
  useControlsByStandard,
  useCreateAssessment,
  useUpdateAssessmentStatus,
} from "../hooks/useQueries";

const STANDARDS = Object.values(Standard);
const STATUS_OPTIONS = [
  ControlStatus.Compliant,
  ControlStatus.Partial_,
  ControlStatus.NonCompliant,
  ControlStatus.NotApplicable,
];

export default function Assessment() {
  const [activeStandard, setActiveStandard] = useState<Standard>(
    Standard.IEC62443,
  );
  const [search, setSearch] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createStandard, setCreateStandard] = useState<Standard>(
    Standard.IEC62443,
  );

  const { data: assessments, isLoading: assessmentsLoading } =
    useAllAssessments();
  const { data: controls, isLoading: controlsLoading } =
    useControlsByStandard(activeStandard);
  const createMutation = useCreateAssessment();
  const updateStatusMutation = useUpdateAssessmentStatus();

  // Find current assessment for active standard
  const currentAssessment = useMemo(
    () => assessments?.find((a) => a.standard === activeStandard),
    [assessments, activeStandard],
  );

  // Build status map from assessment
  const statusMap = useMemo(() => {
    const map: Record<string, ControlStatus> = {};
    if (currentAssessment) {
      for (const [controlId, status] of currentAssessment.controlsStatus) {
        map[controlId] = status;
      }
    }
    return map;
  }, [currentAssessment]);

  // Filter controls
  const filteredControls = useMemo(() => {
    return (controls ?? []).filter(
      (c) =>
        !search ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        FAMILY_LABELS[c.family].toLowerCase().includes(search.toLowerCase()),
    );
  }, [controls, search]);

  // Compliance score
  const complianceScore = useMemo(() => {
    if (!controls || controls.length === 0) return 0;
    const statuses = controls.map(
      (c) => statusMap[c.id] ?? ControlStatus.NonCompliant,
    );
    const compliant = statuses.filter(
      (s) => s === ControlStatus.Compliant,
    ).length;
    return Math.round((compliant / controls.length) * 100);
  }, [controls, statusMap]);

  const handleStatusChange = async (
    controlId: string,
    status: ControlStatus,
  ) => {
    if (!currentAssessment) {
      toast.error("No active assessment. Create one first.");
      return;
    }
    try {
      await updateStatusMutation.mutateAsync({
        assessmentId: currentAssessment.id,
        controlId,
        status,
      });
      toast.success("Control status updated");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleCreateAssessment = async () => {
    try {
      await createMutation.mutateAsync(createStandard);
      setCreateDialogOpen(false);
      toast.success(
        `Assessment created for ${STANDARD_LABELS[createStandard]}`,
      );
    } catch {
      toast.error("Failed to create assessment");
    }
  };

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
            <ClipboardList className="w-6 h-6 text-primary" />
            Gap Assessment
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Evaluate control compliance status across standards
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 text-xs bg-primary/90 hover:bg-primary shadow-glow-sm"
          onClick={() => setCreateDialogOpen(true)}
          data-ocid="assessment.create.button"
        >
          <Plus className="w-3.5 h-3.5" />
          New Assessment
        </Button>
      </motion.div>

      {/* Standard Tabs */}
      <Tabs
        value={activeStandard}
        onValueChange={(v) => setActiveStandard(v as Standard)}
      >
        <TabsList className="bg-card border border-border gap-0.5 flex-wrap h-auto p-1">
          {STANDARDS.map((s) => (
            <TabsTrigger
              key={s}
              value={s}
              data-ocid="assessment.standard.tab"
              className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-glow-sm"
            >
              {STANDARD_LABELS[s]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Score bar */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-shrink-0">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                {STANDARD_LABELS[activeStandard]} Compliance Score
              </div>
              <div className="font-display text-3xl font-bold text-foreground">
                {complianceScore}%
              </div>
            </div>
            <div className="flex-1">
              <Progress value={complianceScore} className="h-3 bg-muted/50" />
              <div className="flex items-center gap-4 mt-1.5 text-[10px] font-mono text-muted-foreground">
                {controls && (
                  <>
                    <span className="text-success">
                      {
                        controls.filter(
                          (c) => statusMap[c.id] === ControlStatus.Compliant,
                        ).length
                      }{" "}
                      Compliant
                    </span>
                    <span className="text-warning">
                      {
                        controls.filter(
                          (c) => statusMap[c.id] === ControlStatus.Partial_,
                        ).length
                      }{" "}
                      Partial
                    </span>
                    <span className="text-destructive">
                      {
                        controls.filter(
                          (c) => statusMap[c.id] === ControlStatus.NonCompliant,
                        ).length
                      }{" "}
                      Non-Compliant
                    </span>
                    <span className="text-muted-foreground">
                      {controls.filter((c) => !statusMap[c.id]).length}{" "}
                      Unassessed
                    </span>
                  </>
                )}
              </div>
            </div>
            {!currentAssessment && (
              <Button
                size="sm"
                variant="outline"
                className="text-xs border-primary/30 text-primary hover:bg-primary/10"
                onClick={() => {
                  setCreateStandard(activeStandard);
                  setCreateDialogOpen(true);
                }}
              >
                Create Assessment
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search controls..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 bg-card border-border font-mono text-sm"
        />
      </div>

      {/* Controls Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            {STANDARD_LABELS[activeStandard]} Controls (
            {filteredControls.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {assessmentsLoading || controlsLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 bg-muted/40" />
              ))}
            </div>
          ) : filteredControls.length === 0 ? (
            <div className="p-8 text-center" data-ocid="assessment.empty_state">
              <ClipboardList className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">No controls found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-28">
                      Control ID
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground">
                      Description
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-40">
                      Family
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-48">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredControls.map((control) => {
                    const currentStatus =
                      statusMap[control.id] ?? ControlStatus.NonCompliant;
                    return (
                      <TableRow
                        key={control.id}
                        className="border-border hover:bg-muted/20 transition-colors"
                      >
                        <TableCell>
                          <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                            {control.id}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-foreground">
                          {control.description}
                        </TableCell>
                        <TableCell>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {FAMILY_LABELS[control.family]}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={currentStatus}
                            onValueChange={(v) =>
                              handleStatusChange(control.id, v as ControlStatus)
                            }
                          >
                            <SelectTrigger className="h-7 text-xs bg-card border-border w-36">
                              <SelectValue>
                                <StatusBadge status={currentStatus} />
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {STATUS_OPTIONS.map((s) => (
                                <SelectItem
                                  key={s}
                                  value={s}
                                  className="text-xs"
                                >
                                  <StatusBadge status={s} />
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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

      {/* Create Assessment Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="assessment.create.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Create New Assessment
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1.5 block">
                Standard
              </span>
              <Select
                value={createStandard}
                onValueChange={(v) => setCreateStandard(v as Standard)}
              >
                <SelectTrigger className="bg-background border-border">
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
            </div>
            <p className="text-xs text-muted-foreground">
              This will create a new assessment for all controls in{" "}
              {STANDARD_LABELS[createStandard]}.
            </p>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setCreateDialogOpen(false)}
              className="text-xs"
              data-ocid="assessment.create.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateAssessment}
              disabled={createMutation.isPending}
              className="text-xs bg-primary/90 hover:bg-primary"
              data-ocid="assessment.create.confirm_button"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Assessment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
