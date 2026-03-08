import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Clock, Filter, Loader2, Wand2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Standard, TaskPriority, TaskStatus } from "../backend.d";
import StatusBadge from "../components/StatusBadge";
import { STANDARD_LABELS } from "../data/mockData";
import { useAllTasks, useUpdateTask } from "../hooks/useQueries";

const PRIORITY_CONFIG: Record<
  TaskPriority,
  { label: string; dotColor: string }
> = {
  [TaskPriority.High]: { label: "High Priority", dotColor: "bg-destructive" },
  [TaskPriority.Medium]: { label: "Medium Priority", dotColor: "bg-warning" },
  [TaskPriority.Low]: {
    label: "Low Priority",
    dotColor: "bg-muted-foreground",
  },
};

export default function Wizard() {
  const [standardFilter, setStandardFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");

  const { data: tasks, isLoading } = useAllTasks();
  const updateTaskMutation = useUpdateTask();

  const filtered = useMemo(() => {
    return (tasks ?? []).filter((t) => {
      const matchStandard =
        standardFilter === "all" || t.standard === standardFilter;
      const matchPriority =
        priorityFilter === "all" || t.priority === priorityFilter;
      return matchStandard && matchPriority;
    });
  }, [tasks, standardFilter, priorityFilter]);

  // Group by priority
  const grouped = useMemo(() => {
    const groups: Record<TaskPriority, typeof filtered> = {
      [TaskPriority.High]: [],
      [TaskPriority.Medium]: [],
      [TaskPriority.Low]: [],
    };
    for (const t of filtered) {
      if (groups[t.priority]) groups[t.priority].push(t);
    }
    return groups;
  }, [filtered]);

  const completedCount = (tasks ?? []).filter(
    (t) => t.status === TaskStatus.Completed,
  ).length;
  const totalCount = (tasks ?? []).length;
  const completionPct =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleMarkComplete = async (task: (typeof filtered)[0]) => {
    try {
      await updateTaskMutation.mutateAsync({
        taskId: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status:
          task.status === TaskStatus.Completed
            ? TaskStatus.Open
            : TaskStatus.Completed,
      });
      toast.success(
        task.status === TaskStatus.Completed
          ? "Task reopened"
          : "Task marked complete",
      );
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleStatusChange = async (
    task: (typeof filtered)[0],
    status: TaskStatus,
  ) => {
    try {
      await updateTaskMutation.mutateAsync({
        taskId: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status,
      });
      toast.success("Task status updated");
    } catch {
      toast.error("Failed to update task");
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
            <Wand2 className="w-6 h-6 text-primary" />
            Implementation Wizard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Step-by-step guidance for implementing compliance controls
          </p>
        </div>
      </motion.div>

      {/* Progress Banner */}
      <Card className="bg-card border-border">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex-shrink-0">
              <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
                Implementation Progress
              </div>
              <div className="font-display text-3xl font-bold text-foreground">
                {completionPct}%
              </div>
            </div>
            <div className="flex-1">
              <Progress value={completionPct} className="h-3 bg-muted/50" />
              <div className="flex items-center gap-4 mt-1.5 text-[10px] font-mono text-muted-foreground">
                <span className="text-success">{completedCount} completed</span>
                <span className="text-muted-foreground">
                  {totalCount - completedCount} remaining
                </span>
                <span className="text-foreground">{totalCount} total</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <Select value={standardFilter} onValueChange={setStandardFilter}>
          <SelectTrigger className="bg-card border-border w-40 text-xs">
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
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="bg-card border-border w-40 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">
              All Priorities
            </SelectItem>
            {Object.values(TaskPriority).map((p) => (
              <SelectItem key={p} value={p} className="text-xs">
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Badge
          variant="outline"
          className="font-mono text-xs text-muted-foreground border-border"
        >
          {filtered.length} tasks
        </Badge>
      </div>

      {/* Task Groups */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-24 bg-muted/40" />
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {(
            [
              TaskPriority.High,
              TaskPriority.Medium,
              TaskPriority.Low,
            ] as TaskPriority[]
          ).map((priority) => {
            const priorityTasks = grouped[priority];
            if (priorityTasks.length === 0) return null;
            const config = PRIORITY_CONFIG[priority];
            return (
              <div key={priority}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${config.dotColor}`} />
                  <h2 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-wider">
                    {config.label}
                  </h2>
                  <Badge
                    variant="outline"
                    className="font-mono text-[10px] text-muted-foreground border-border"
                  >
                    {priorityTasks.length}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {priorityTasks.map((task, taskIndex) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.2, delay: taskIndex * 0.03 }}
                        data-ocid={`wizard.task.item.${taskIndex + 1}`}
                      >
                        <Card
                          className={`bg-card border-border hover:border-primary/20 transition-all duration-150 ${
                            task.status === TaskStatus.Completed
                              ? "opacity-60"
                              : ""
                          }`}
                        >
                          <CardContent className="py-3 px-4">
                            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-2 flex-wrap">
                                  <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded flex-shrink-0">
                                    {task.controlId}
                                  </span>
                                  <Badge
                                    variant="outline"
                                    className="font-mono text-[10px] text-accent border-accent/30 bg-accent/5"
                                  >
                                    {STANDARD_LABELS[task.standard]}
                                  </Badge>
                                  <StatusBadge status={task.priority} />
                                  <StatusBadge status={task.status} />
                                </div>
                                <h3
                                  className={`font-medium text-sm mt-1.5 ${task.status === TaskStatus.Completed ? "line-through text-muted-foreground" : "text-foreground"}`}
                                >
                                  {task.title}
                                </h3>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                                  {task.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Select
                                  value={task.status}
                                  onValueChange={(v) =>
                                    handleStatusChange(task, v as TaskStatus)
                                  }
                                >
                                  <SelectTrigger className="h-7 text-xs bg-background border-border w-32">
                                    <Clock className="w-3 h-3 mr-1 text-muted-foreground" />
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {Object.values(TaskStatus).map((s) => (
                                      <SelectItem
                                        key={s}
                                        value={s}
                                        className="text-xs"
                                      >
                                        {s}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Button
                                  size="sm"
                                  variant={
                                    task.status === TaskStatus.Completed
                                      ? "outline"
                                      : "default"
                                  }
                                  className={`h-7 text-[11px] px-2 ${
                                    task.status === TaskStatus.Completed
                                      ? "border-success/30 text-success hover:bg-success/10"
                                      : "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30"
                                  }`}
                                  onClick={() => handleMarkComplete(task)}
                                  disabled={updateTaskMutation.isPending}
                                  data-ocid={`wizard.task.complete.button.${taskIndex + 1}`}
                                >
                                  {updateTaskMutation.isPending ? (
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                  ) : (
                                    <>
                                      <CheckCircle2 className="w-3 h-3 mr-1" />
                                      {task.status === TaskStatus.Completed
                                        ? "Reopen"
                                        : "Complete"}
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12" data-ocid="wizard.empty_state">
              <Wand2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">
                No tasks match the current filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
