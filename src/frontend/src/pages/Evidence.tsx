import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  Filter,
  FolderOpen,
  Loader2,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  type EvidenceRecord,
  EvidenceStatus,
  EvidenceType,
  Standard,
} from "../backend.d";
import StatusBadge from "../components/StatusBadge";
import { STANDARD_LABELS } from "../data/mockData";
import {
  useAllEvidence,
  useCreateEvidence,
  useDeleteEvidence,
} from "../hooks/useQueries";

function formatDate(ts?: bigint): string {
  if (!ts) return "—";
  const ms = Number(ts / BigInt(1_000_000));
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isExpiringSoon(ts?: bigint): boolean {
  if (!ts) return false;
  const ms = Number(ts / BigInt(1_000_000));
  const days = (ms - Date.now()) / (1000 * 60 * 60 * 24);
  return days > 0 && days <= 30;
}

const EVIDENCE_TYPE_LABELS: Record<EvidenceType, string> = {
  [EvidenceType.Document]: "Document",
  [EvidenceType.Screenshot]: "Screenshot",
  [EvidenceType.Log]: "Log",
  [EvidenceType.Policy]: "Policy",
};

export default function Evidence() {
  const [search, setSearch] = useState("");
  const [standardFilter, setStandardFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<EvidenceRecord | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    controlId: "",
    standard: Standard.IEC62443,
    evidenceType: EvidenceType.Document,
    status: EvidenceStatus.Active,
    expiryDate: "",
    notes: "",
  });

  const { data: evidence, isLoading } = useAllEvidence();
  const createMutation = useCreateEvidence();
  const deleteMutation = useDeleteEvidence();

  const expiringSoonCount = useMemo(
    () => (evidence ?? []).filter((e) => isExpiringSoon(e.expiryDate)).length,
    [evidence],
  );

  const filtered = useMemo(() => {
    return (evidence ?? []).filter((e) => {
      const matchSearch =
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.controlId.toLowerCase().includes(search.toLowerCase());
      const matchStandard =
        standardFilter === "all" || e.standard === standardFilter;
      const matchStatus = statusFilter === "all" || e.status === statusFilter;
      return matchSearch && matchStandard && matchStatus;
    });
  }, [evidence, search, standardFilter, statusFilter]);

  const handleAddEvidence = async () => {
    if (!formData.name || !formData.controlId) {
      toast.error("Name and Control ID are required");
      return;
    }
    try {
      const expiryDate = formData.expiryDate
        ? BigInt(new Date(formData.expiryDate).getTime()) * BigInt(1_000_000)
        : null;
      await createMutation.mutateAsync({
        ...formData,
        expiryDate,
        linkedAssessmentId: null,
      });
      setAddDialogOpen(false);
      setFormData({
        name: "",
        controlId: "",
        standard: Standard.IEC62443,
        evidenceType: EvidenceType.Document,
        status: EvidenceStatus.Active,
        expiryDate: "",
        notes: "",
      });
      toast.success("Evidence record added");
    } catch {
      toast.error("Failed to add evidence");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      setDeleteTarget(null);
      toast.success("Evidence record deleted");
    } catch {
      toast.error("Failed to delete evidence");
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
            <FolderOpen className="w-6 h-6 text-primary" />
            Evidence Manager
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and track compliance evidence records
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5 text-xs bg-primary/90 hover:bg-primary shadow-glow-sm"
          onClick={() => setAddDialogOpen(true)}
          data-ocid="evidence.add.open_modal_button"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Evidence
        </Button>
      </motion.div>

      {/* Expiry Alert */}
      {expiringSoonCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-md bg-warning/10 border border-warning/30 text-warning text-sm"
        >
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">
            {expiringSoonCount} evidence record
            {expiringSoonCount > 1 ? "s" : ""} expiring within 30 days
          </span>
        </motion.div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or control ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card border-border font-mono text-sm"
            data-ocid="evidence.search_input"
          />
        </div>
        <div className="flex gap-2">
          <Select value={standardFilter} onValueChange={setStandardFilter}>
            <SelectTrigger className="bg-card border-border w-36 text-xs">
              <Filter className="w-3 h-3 mr-1 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                All Standards
              </SelectItem>
              {Object.values(Standard).map((s) => (
                <SelectItem key={s} value={s} className="text-xs font-mono">
                  {STANDARD_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="bg-card border-border w-32 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-xs">
                All Statuses
              </SelectItem>
              {Object.values(EvidenceStatus).map((s) => (
                <SelectItem key={s} value={s} className="text-xs">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-foreground">
            Evidence Records ({filtered.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-4 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 bg-muted/40" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-8 text-center" data-ocid="evidence.empty_state">
              <FolderOpen className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                No evidence records found
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto" data-ocid="evidence.table">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-24">
                      Type
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-28">
                      Standard
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-24">
                      Control
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-24">
                      Status
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-28">
                      Expiry
                    </TableHead>
                    <TableHead className="font-mono text-[10px] uppercase text-muted-foreground w-16" />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((record, idx) => {
                    const expiring = isExpiringSoon(record.expiryDate);
                    return (
                      <TableRow
                        key={record.id}
                        data-ocid={`evidence.item.${idx + 1}`}
                        className="border-border hover:bg-muted/20 transition-colors"
                      >
                        <TableCell>
                          <div>
                            <div className="text-xs font-medium text-foreground">
                              {record.name}
                            </div>
                            {record.notes && (
                              <div className="text-[10px] text-muted-foreground mt-0.5 truncate max-w-64">
                                {record.notes}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-[10px] font-mono text-muted-foreground">
                            {EVIDENCE_TYPE_LABELS[record.evidenceType]}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="font-mono text-[10px] text-accent border-accent/30 bg-accent/5"
                          >
                            {STANDARD_LABELS[record.standard]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-xs font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                            {record.controlId}
                          </span>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={record.status} />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {expiring && (
                              <AlertTriangle className="w-3 h-3 text-warning flex-shrink-0" />
                            )}
                            <span
                              className={`text-[10px] font-mono ${expiring ? "text-warning" : "text-muted-foreground"}`}
                            >
                              {formatDate(record.expiryDate)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            onClick={() => setDeleteTarget(record)}
                            data-ocid={`evidence.delete_button.${idx + 1}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
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

      {/* Add Evidence Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent
          className="bg-card border-border max-w-md"
          data-ocid="evidence.add.dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display">
              Add Evidence Record
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Link compliance evidence to a specific control
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Name *
              </Label>
              <Input
                placeholder="e.g., Access Control Policy v2.0"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-background border-border text-sm"
                data-ocid="evidence.add.input"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Control ID *
                </Label>
                <Input
                  placeholder="e.g., SR-1.1"
                  value={formData.controlId}
                  onChange={(e) =>
                    setFormData({ ...formData, controlId: e.target.value })
                  }
                  className="bg-background border-border font-mono text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Standard
                </Label>
                <Select
                  value={formData.standard}
                  onValueChange={(v) =>
                    setFormData({ ...formData, standard: v as Standard })
                  }
                >
                  <SelectTrigger className="bg-background border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Standard).map((s) => (
                      <SelectItem
                        key={s}
                        value={s}
                        className="text-xs font-mono"
                      >
                        {STANDARD_LABELS[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Type
                </Label>
                <Select
                  value={formData.evidenceType}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      evidenceType: v as EvidenceType,
                    })
                  }
                >
                  <SelectTrigger className="bg-background border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(EvidenceType).map((t) => (
                      <SelectItem key={t} value={t} className="text-xs">
                        {EVIDENCE_TYPE_LABELS[t]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(v) =>
                    setFormData({ ...formData, status: v as EvidenceStatus })
                  }
                >
                  <SelectTrigger className="bg-background border-border text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(EvidenceStatus).map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Expiry Date
              </Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) =>
                  setFormData({ ...formData, expiryDate: e.target.value })
                }
                className="bg-background border-border text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Notes
              </Label>
              <Textarea
                placeholder="Additional notes about this evidence..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="bg-background border-border text-sm resize-none"
                rows={3}
                data-ocid="evidence.add.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAddDialogOpen(false)}
              className="text-xs"
              data-ocid="evidence.add.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddEvidence}
              disabled={createMutation.isPending}
              className="text-xs bg-primary/90 hover:bg-primary"
              data-ocid="evidence.add.submit_button"
            >
              {createMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Evidence"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-display text-destructive">
              Delete Evidence
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Are you sure you want to delete{" "}
              <span className="text-foreground font-medium">
                "{deleteTarget?.name}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              className="text-xs"
              data-ocid="evidence.delete.cancel_button"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="text-xs"
              data-ocid="evidence.delete.confirm_button"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
