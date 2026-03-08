import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  ControlStatus,
  EvidenceStatus,
  TaskPriority,
  TaskStatus,
} from "../backend.d";

interface StatusBadgeProps {
  status: ControlStatus | EvidenceStatus | TaskStatus | TaskPriority | string;
  className?: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  // ControlStatus
  [ControlStatus.Compliant]: {
    label: "Compliant",
    className:
      "bg-success/15 text-success border-success/30 hover:bg-success/20",
  },
  [ControlStatus.Partial_]: {
    label: "Partial",
    className:
      "bg-warning/15 text-warning border-warning/30 hover:bg-warning/20",
  },
  [ControlStatus.NonCompliant]: {
    label: "Non-Compliant",
    className:
      "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/20",
  },
  [ControlStatus.NotApplicable]: {
    label: "N/A",
    className: "bg-muted text-muted-foreground border-border",
  },
  // EvidenceStatus
  [EvidenceStatus.Active]: {
    label: "Active",
    className: "bg-success/15 text-success border-success/30",
  },
  [EvidenceStatus.Expired]: {
    label: "Expired",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  [EvidenceStatus.Pending]: {
    label: "Pending",
    className: "bg-warning/15 text-warning border-warning/30",
  },
  // TaskStatus
  [TaskStatus.Open]: {
    label: "Open",
    className: "bg-muted text-muted-foreground border-border",
  },
  [TaskStatus.InProgress]: {
    label: "In Progress",
    className: "bg-primary/15 text-primary border-primary/30",
  },
  [TaskStatus.Completed]: {
    label: "Completed",
    className: "bg-success/15 text-success border-success/30",
  },
  [TaskStatus.OnHold]: {
    label: "On Hold",
    className: "bg-warning/15 text-warning border-warning/30",
  },
  // TaskPriority
  [TaskPriority.High]: {
    label: "High",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
  [TaskPriority.Medium]: {
    label: "Medium",
    className: "bg-warning/15 text-warning border-warning/30",
  },
  [TaskPriority.Low]: {
    label: "Low",
    className: "bg-muted text-muted-foreground border-border",
  },
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: String(status),
    className: "bg-muted text-muted-foreground border-border",
  };
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-[10px] font-semibold tracking-wide px-1.5 py-0.5",
        config.className,
        className,
      )}
    >
      {config.label}
    </Badge>
  );
}
