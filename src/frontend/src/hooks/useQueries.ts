import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Assessment,
  ComplianceControl,
  ComplianceReport,
  ControlStatus,
  CrosswalkMapping,
  EvidenceRecord,
  EvidenceStatus,
  EvidenceType,
  ImplementationTask,
  Standard,
  TaskPriority,
  TaskStatus,
} from "../backend.d";
import {
  mockAssessments,
  mockControls,
  mockCrosswalkMappings,
  mockEvidenceCoverage,
  mockEvidenceRecords,
  mockReports,
  mockTasks,
} from "../data/mockData";
import { useActor } from "./useActor";

// ── Controls ───────────────────────────────────────────────────

export function useAllControls() {
  const { actor, isFetching } = useActor();
  return useQuery<ComplianceControl[]>({
    queryKey: ["controls"],
    queryFn: async () => {
      if (!actor) return mockControls;
      const data = await actor.getAllComplianceControls();
      return data.length > 0 ? data : mockControls;
    },
    enabled: !isFetching,
    placeholderData: mockControls,
  });
}

export function useControlsByStandard(standard: Standard) {
  const { actor, isFetching } = useActor();
  return useQuery<ComplianceControl[]>({
    queryKey: ["controls", standard],
    queryFn: async () => {
      if (!actor) return mockControls.filter((c) => c.standard === standard);
      const data = await actor.getControlsByStandard(standard);
      return data.length > 0
        ? data
        : mockControls.filter((c) => c.standard === standard);
    },
    enabled: !isFetching,
    placeholderData: mockControls.filter((c) => c.standard === standard),
  });
}

// ── Crosswalk ──────────────────────────────────────────────────

export function useAllCrosswalkMappings() {
  const { actor, isFetching } = useActor();
  return useQuery<CrosswalkMapping[]>({
    queryKey: ["crosswalk"],
    queryFn: async () => {
      if (!actor) return mockCrosswalkMappings;
      const data = await actor.getAllCrosswalkMappings();
      return data.length > 0 ? data : mockCrosswalkMappings;
    },
    enabled: !isFetching,
    placeholderData: mockCrosswalkMappings,
  });
}

export function useCrosswalkMappings(
  sourceStandard: Standard,
  targetStandard: Standard,
) {
  const { actor, isFetching } = useActor();
  return useQuery<CrosswalkMapping[]>({
    queryKey: ["crosswalk", sourceStandard, targetStandard],
    queryFn: async () => {
      if (!actor) {
        return mockCrosswalkMappings.filter(
          (m) =>
            m.sourceStandard === sourceStandard &&
            m.targetStandard === targetStandard,
        );
      }
      const data = await actor.getCrosswalkMappings(
        sourceStandard,
        targetStandard,
      );
      if (data.length > 0) return data;
      return mockCrosswalkMappings.filter(
        (m) =>
          m.sourceStandard === sourceStandard &&
          m.targetStandard === targetStandard,
      );
    },
    enabled: !isFetching,
  });
}

// ── Assessments ────────────────────────────────────────────────

export function useAllAssessments() {
  const { actor, isFetching } = useActor();
  return useQuery<Assessment[]>({
    queryKey: ["assessments"],
    queryFn: async () => {
      if (!actor) return mockAssessments;
      const data = await actor.getAllAssessments();
      return data.length > 0 ? data : mockAssessments;
    },
    enabled: !isFetching,
    placeholderData: mockAssessments,
  });
}

export function useRecentActivity(limit = 5) {
  const { actor, isFetching } = useActor();
  return useQuery<Assessment[]>({
    queryKey: ["assessments", "recent", limit],
    queryFn: async () => {
      if (!actor) return mockAssessments.slice(0, limit);
      const data = await actor.getRecentAssessmentActivity(BigInt(limit));
      return data.length > 0 ? data : mockAssessments.slice(0, limit);
    },
    enabled: !isFetching,
    placeholderData: mockAssessments.slice(0, limit),
  });
}

export function useCreateAssessment() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (standard: Standard) => {
      if (!actor) throw new Error("Not connected");
      return actor.createAssessment(standard);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assessments"] });
    },
  });
}

export function useUpdateAssessmentStatus() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      assessmentId,
      controlId,
      status,
    }: {
      assessmentId: string;
      controlId: string;
      status: ControlStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAssessmentControlStatus(
        assessmentId,
        controlId,
        status,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["assessments"] });
    },
  });
}

// ── Evidence ───────────────────────────────────────────────────

export function useAllEvidence() {
  const { actor, isFetching } = useActor();
  return useQuery<EvidenceRecord[]>({
    queryKey: ["evidence"],
    queryFn: async () => {
      if (!actor) return mockEvidenceRecords;
      const data = await actor.getAllEvidenceRecords();
      return data.length > 0 ? data : mockEvidenceRecords;
    },
    enabled: !isFetching,
    placeholderData: mockEvidenceRecords,
  });
}

export function useEvidenceCoverage() {
  const { actor, isFetching } = useActor();
  return useQuery<Array<[Standard, bigint]>>({
    queryKey: ["evidence", "coverage"],
    queryFn: async () => {
      if (!actor) return mockEvidenceCoverage;
      const data = await actor.getEvidenceCoverageSummary();
      return data.length > 0 ? data : mockEvidenceCoverage;
    },
    enabled: !isFetching,
    placeholderData: mockEvidenceCoverage,
  });
}

export function useCreateEvidence() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      controlId: string;
      standard: Standard;
      name: string;
      evidenceType: EvidenceType;
      status: EvidenceStatus;
      expiryDate: bigint | null;
      notes: string;
      linkedAssessmentId: string | null;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.createEvidenceRecord(
        args.controlId,
        args.standard,
        args.name,
        args.evidenceType,
        args.status,
        args.expiryDate,
        args.notes,
        args.linkedAssessmentId,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["evidence"] });
    },
  });
}

export function useDeleteEvidence() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (evidenceId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteEvidenceRecord(evidenceId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["evidence"] });
    },
  });
}

// ── Tasks ──────────────────────────────────────────────────────

export function useAllTasks() {
  const { actor, isFetching } = useActor();
  return useQuery<ImplementationTask[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      if (!actor) return mockTasks;
      const data = await actor.getAllImplementationTasks();
      return data.length > 0 ? data : mockTasks;
    },
    enabled: !isFetching,
    placeholderData: mockTasks,
  });
}

export function useUpdateTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      taskId: string;
      title: string;
      description: string;
      priority: TaskPriority;
      status: TaskStatus;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateImplementationTask(
        args.taskId,
        args.title,
        args.description,
        args.priority,
        args.status,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

export function useDeleteTask() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (taskId: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteImplementationTask(taskId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// ── Reports ────────────────────────────────────────────────────

export function useComplianceReport(standard: Standard) {
  const { actor, isFetching } = useActor();
  return useQuery<ComplianceReport>({
    queryKey: ["report", standard],
    queryFn: async () => {
      if (!actor) return mockReports[standard];
      const data = await actor.getComplianceReport(standard);
      return data;
    },
    enabled: !isFetching,
    placeholderData: mockReports[standard],
  });
}

// ── Auth / Role ────────────────────────────────────────────────

export function useUserRole() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userRole"],
    queryFn: async () => {
      if (!actor) return "guest";
      return actor.getCallerUserRole();
    },
    enabled: !isFetching,
  });
}
