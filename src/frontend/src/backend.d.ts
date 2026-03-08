import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ImplementationTask {
    id: string;
    status: TaskStatus;
    title: string;
    createdAt: Time;
    createdBy: Principal;
    description: string;
    controlId: string;
    priority: TaskPriority;
    standard: Standard;
    linkedAssessmentId?: string;
}
export interface CrosswalkMapping {
    sourceControlId: string;
    sourceStandard: Standard;
    targetControlId: string;
    targetStandard: Standard;
}
export interface Assessment {
    id: string;
    createdAt: Time;
    user: Principal;
    controlsStatus: Array<[string, ControlStatus]>;
    lastUpdated: Time;
    standard: Standard;
}
export interface ComplianceControl {
    id: string;
    description: string;
    standard: Standard;
    family: ControlFamily;
}
export interface EvidenceRecord {
    id: string;
    status: EvidenceStatus;
    expiryDate?: Time;
    name: string;
    createdAt: Time;
    createdBy: Principal;
    controlId: string;
    notes: string;
    standard: Standard;
    linkedAssessmentId?: string;
    evidenceType: EvidenceType;
}
export interface ComplianceReport {
    notApplicableCount: bigint;
    partialCount: bigint;
    compliantCount: bigint;
    totalControls: bigint;
    nonCompliantCount: bigint;
    standard: Standard;
    compliancePercentage: number;
}
export interface UserProfile {
    name: string;
    role: string;
    organization: string;
}
export enum ControlFamily {
    Physical_Security = "Physical_Security",
    Security_Assessment = "Security_Assessment",
    Continuous_Monitoring = "Continuous_Monitoring",
    Cryptography = "Cryptography",
    Asset_Management = "Asset_Management",
    Communications_Security = "Communications_Security",
    Access_Control = "Access_Control",
    Operations_Security = "Operations_Security"
}
export enum ControlStatus {
    NotApplicable = "NotApplicable",
    NonCompliant = "NonCompliant",
    Partial_ = "Partial",
    Compliant = "Compliant"
}
export enum EvidenceStatus {
    Active = "Active",
    Expired = "Expired",
    Pending = "Pending"
}
export enum EvidenceType {
    Log = "Log",
    Policy = "Policy",
    Document = "Document",
    Screenshot = "Screenshot"
}
export enum Standard {
    NIST_CSF = "NIST_CSF",
    CMMC = "CMMC",
    SOC2 = "SOC2",
    NERC_CIP = "NERC_CIP",
    ISO27001 = "ISO27001",
    IEC62443 = "IEC62443"
}
export enum TaskPriority {
    Low = "Low",
    High = "High",
    Medium = "Medium"
}
export enum TaskStatus {
    OnHold = "OnHold",
    Open = "Open",
    InProgress = "InProgress",
    Completed = "Completed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addComplianceControl(control: ComplianceControl): Promise<void>;
    addCrosswalkMapping(mapping: CrosswalkMapping): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAssessment(standard: Standard): Promise<string>;
    createEvidenceRecord(controlId: string, standard: Standard, name: string, evidenceType: EvidenceType, status: EvidenceStatus, expiryDate: Time | null, notes: string, linkedAssessmentId: string | null): Promise<string>;
    createImplementationTask(controlId: string, standard: Standard, title: string, description: string, priority: TaskPriority, linkedAssessmentId: string | null): Promise<string>;
    deleteAssessment(assessmentId: string): Promise<void>;
    deleteComplianceControl(controlId: string): Promise<void>;
    deleteCrosswalkMapping(sourceStandard: Standard, sourceControlId: string, targetStandard: Standard, targetControlId: string): Promise<void>;
    deleteEvidenceRecord(evidenceId: string): Promise<void>;
    deleteImplementationTask(taskId: string): Promise<void>;
    getAllAssessments(): Promise<Array<Assessment>>;
    getAllComplianceControls(): Promise<Array<ComplianceControl>>;
    getAllCrosswalkMappings(): Promise<Array<CrosswalkMapping>>;
    getAllEvidenceRecords(): Promise<Array<EvidenceRecord>>;
    getAllImplementationTasks(): Promise<Array<ImplementationTask>>;
    getAssessment(assessmentId: string): Promise<Assessment>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getComplianceControl(controlId: string): Promise<ComplianceControl>;
    getComplianceReport(standard: Standard): Promise<ComplianceReport>;
    getControlsByStandard(standard: Standard): Promise<Array<ComplianceControl>>;
    getCrosswalkMappings(sourceStandard: Standard, targetStandard: Standard): Promise<Array<CrosswalkMapping>>;
    getEvidenceByControl(controlId: string): Promise<Array<EvidenceRecord>>;
    getEvidenceByStandard(standard: Standard): Promise<Array<EvidenceRecord>>;
    getEvidenceCoverageSummary(): Promise<Array<[Standard, bigint]>>;
    getEvidenceRecord(evidenceId: string): Promise<EvidenceRecord>;
    getImplementationTask(taskId: string): Promise<ImplementationTask>;
    getRecentAssessmentActivity(limit: bigint): Promise<Array<Assessment>>;
    getTasksByPriority(priority: TaskPriority): Promise<Array<ImplementationTask>>;
    getTasksByPrioritySorted(): Promise<Array<ImplementationTask>>;
    getTasksByStandard(standard: Standard): Promise<Array<ImplementationTask>>;
    getUserAssessments(user: Principal): Promise<Array<Assessment>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateAssessmentControlStatus(assessmentId: string, controlId: string, status: ControlStatus): Promise<void>;
    updateComplianceControl(control: ComplianceControl): Promise<void>;
    updateEvidenceRecord(evidenceId: string, name: string, evidenceType: EvidenceType, status: EvidenceStatus, expiryDate: Time | null, notes: string): Promise<void>;
    updateImplementationTask(taskId: string, title: string, description: string, priority: TaskPriority, status: TaskStatus): Promise<void>;
}
