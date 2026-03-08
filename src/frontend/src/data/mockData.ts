import {
  ControlFamily,
  ControlStatus,
  EvidenceStatus,
  EvidenceType,
  Standard,
  TaskPriority,
  TaskStatus,
} from "../backend.d";
import type {
  Assessment,
  ComplianceControl,
  ComplianceReport,
  CrosswalkMapping,
  EvidenceRecord,
  ImplementationTask,
} from "../backend.d";

// ── Mock Compliance Controls ───────────────────────────────────

export const mockControls: ComplianceControl[] = [
  // IEC 62443
  {
    id: "SR-1.1",
    description: "Human user identification and authentication",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.2",
    description:
      "Software process and device identification and authentication",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.3",
    description: "Account management",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-2.1",
    description: "Authorization enforcement",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-3.1",
    description: "Communication integrity",
    standard: Standard.IEC62443,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SR-3.2",
    description: "Protection against malicious code",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-4.1",
    description: "Information confidentiality",
    standard: Standard.IEC62443,
    family: ControlFamily.Cryptography,
  },
  {
    id: "SR-5.1",
    description: "Network segmentation",
    standard: Standard.IEC62443,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SR-6.1",
    description: "Audit log accessibility",
    standard: Standard.IEC62443,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "SR-7.1",
    description: "Denial of service protection",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },

  // NIST CSF
  {
    id: "ID.AM-1",
    description: "Physical devices and systems inventoried",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "ID.AM-2",
    description: "Software platforms and applications inventoried",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "PR.AC-1",
    description: "Identities and credentials managed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  {
    id: "PR.AC-3",
    description: "Remote access managed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  {
    id: "DE.CM-1",
    description: "Network monitoring performed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.CM-4",
    description: "Malicious code detected",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "RS.RP-1",
    description: "Response plan executed during/after incident",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },

  // ISO 27001
  {
    id: "A.9.1.1",
    description: "Access control policy",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.2.1",
    description: "User registration and de-registration",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.10.1.1",
    description: "Policy on the use of cryptographic controls",
    standard: Standard.ISO27001,
    family: ControlFamily.Cryptography,
  },
  {
    id: "A.12.4.1",
    description: "Event logging",
    standard: Standard.ISO27001,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "A.13.1.1",
    description: "Network controls",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.14.1.1",
    description: "Information security requirements analysis",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },

  // SOC 2
  {
    id: "CC6.1",
    description: "Logical and physical access controls",
    standard: Standard.SOC2,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CC6.2",
    description: "New access credentials issued to authorized users",
    standard: Standard.SOC2,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CC7.1",
    description: "Vulnerability management procedures",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC7.2",
    description: "System monitoring for anomalies",
    standard: Standard.SOC2,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "CC8.1",
    description: "Change management processes",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },

  // CMMC
  {
    id: "AC.L1-3.1.1",
    description: "Limit system access to authorized users",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L1-3.1.2",
    description: "Limit system access to authorized transactions",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L1-3.5.1",
    description: "Identify information system users",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SI.L1-3.14.1",
    description: "Identify, report, and correct vulnerabilities",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "MP.L1-3.8.1",
    description: "Sanitize or destroy CUI media",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },

  // NERC CIP
  {
    id: "CIP-002-5",
    description: "BES Cyber System categorization",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "CIP-003-8",
    description: "Security management controls",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-005-6",
    description: "Electronic security perimeters",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "CIP-006-6",
    description: "Physical security of BES Cyber Systems",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-007-6",
    description: "Systems security management",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-010-3",
    description: "Configuration change management",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
];

// ── Mock Crosswalk Mappings ────────────────────────────────────

export const mockCrosswalkMappings: CrosswalkMapping[] = [
  // IEC 62443 → NIST CSF
  {
    sourceControlId: "SR-1.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "PR.AC-1",
    targetStandard: Standard.NIST_CSF,
  },
  {
    sourceControlId: "SR-1.2",
    sourceStandard: Standard.IEC62443,
    targetControlId: "PR.AC-1",
    targetStandard: Standard.NIST_CSF,
  },
  {
    sourceControlId: "SR-1.3",
    sourceStandard: Standard.IEC62443,
    targetControlId: "PR.AC-1",
    targetStandard: Standard.NIST_CSF,
  },
  {
    sourceControlId: "SR-2.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "PR.AC-3",
    targetStandard: Standard.NIST_CSF,
  },
  {
    sourceControlId: "SR-3.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "DE.CM-1",
    targetStandard: Standard.NIST_CSF,
  },
  {
    sourceControlId: "SR-3.2",
    sourceStandard: Standard.IEC62443,
    targetControlId: "DE.CM-4",
    targetStandard: Standard.NIST_CSF,
  },
  {
    sourceControlId: "SR-6.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "DE.CM-1",
    targetStandard: Standard.NIST_CSF,
  },
  // IEC 62443 → ISO 27001
  {
    sourceControlId: "SR-1.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "A.9.1.1",
    targetStandard: Standard.ISO27001,
  },
  {
    sourceControlId: "SR-1.3",
    sourceStandard: Standard.IEC62443,
    targetControlId: "A.9.2.1",
    targetStandard: Standard.ISO27001,
  },
  {
    sourceControlId: "SR-3.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "A.13.1.1",
    targetStandard: Standard.ISO27001,
  },
  {
    sourceControlId: "SR-4.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "A.10.1.1",
    targetStandard: Standard.ISO27001,
  },
  {
    sourceControlId: "SR-6.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "A.12.4.1",
    targetStandard: Standard.ISO27001,
  },
  // IEC 62443 → SOC 2
  {
    sourceControlId: "SR-1.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "CC6.1",
    targetStandard: Standard.SOC2,
  },
  {
    sourceControlId: "SR-1.3",
    sourceStandard: Standard.IEC62443,
    targetControlId: "CC6.2",
    targetStandard: Standard.SOC2,
  },
  {
    sourceControlId: "SR-3.2",
    sourceStandard: Standard.IEC62443,
    targetControlId: "CC7.1",
    targetStandard: Standard.SOC2,
  },
  {
    sourceControlId: "SR-6.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "CC7.2",
    targetStandard: Standard.SOC2,
  },
  // IEC 62443 → CMMC
  {
    sourceControlId: "SR-1.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "AC.L1-3.1.1",
    targetStandard: Standard.CMMC,
  },
  {
    sourceControlId: "SR-2.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "AC.L1-3.1.2",
    targetStandard: Standard.CMMC,
  },
  {
    sourceControlId: "SR-1.2",
    sourceStandard: Standard.IEC62443,
    targetControlId: "IA.L1-3.5.1",
    targetStandard: Standard.CMMC,
  },
  // IEC 62443 → NERC CIP
  {
    sourceControlId: "SR-5.1",
    sourceStandard: Standard.IEC62443,
    targetControlId: "CIP-005-6",
    targetStandard: Standard.NERC_CIP,
  },
  {
    sourceControlId: "SR-3.2",
    sourceStandard: Standard.IEC62443,
    targetControlId: "CIP-007-6",
    targetStandard: Standard.NERC_CIP,
  },
  // NIST CSF → ISO 27001
  {
    sourceControlId: "ID.AM-1",
    sourceStandard: Standard.NIST_CSF,
    targetControlId: "CIP-002-5",
    targetStandard: Standard.NERC_CIP,
  },
  {
    sourceControlId: "PR.AC-1",
    sourceStandard: Standard.NIST_CSF,
    targetControlId: "A.9.1.1",
    targetStandard: Standard.ISO27001,
  },
  {
    sourceControlId: "DE.CM-1",
    sourceStandard: Standard.NIST_CSF,
    targetControlId: "A.12.4.1",
    targetStandard: Standard.ISO27001,
  },
];

// ── Mock Assessments ───────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PRINCIPAL_MOCK: any = {
  _isPrincipal: true,
  _arr: new Uint8Array([1, 2, 3]),
  toText: () => "aaaaa-aa",
  toHex: () => "010203",
  toUint8Array: () => new Uint8Array([1, 2, 3]),
  compareTo: () => "lt",
  isAnonymous: () => false,
};

export const mockAssessments: Assessment[] = [
  {
    id: "assess-001",
    standard: Standard.IEC62443,
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    lastUpdated:
      BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    user: PRINCIPAL_MOCK,
    controlsStatus: [
      ["SR-1.1", ControlStatus.Compliant],
      ["SR-1.2", ControlStatus.Compliant],
      ["SR-1.3", ControlStatus.Partial_],
      ["SR-2.1", ControlStatus.Partial_],
      ["SR-3.1", ControlStatus.Compliant],
      ["SR-3.2", ControlStatus.NonCompliant],
      ["SR-4.1", ControlStatus.Compliant],
      ["SR-5.1", ControlStatus.Partial_],
      ["SR-6.1", ControlStatus.Compliant],
      ["SR-7.1", ControlStatus.NonCompliant],
    ],
  },
  {
    id: "assess-002",
    standard: Standard.NIST_CSF,
    createdAt:
      BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    lastUpdated:
      BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    user: PRINCIPAL_MOCK,
    controlsStatus: [
      ["ID.AM-1", ControlStatus.Compliant],
      ["ID.AM-2", ControlStatus.Compliant],
      ["PR.AC-1", ControlStatus.Compliant],
      ["PR.AC-3", ControlStatus.Partial_],
      ["DE.CM-1", ControlStatus.Compliant],
      ["DE.CM-4", ControlStatus.NonCompliant],
      ["RS.RP-1", ControlStatus.Partial_],
    ],
  },
];

// ── Mock Evidence Records ──────────────────────────────────────

export const mockEvidenceRecords: EvidenceRecord[] = [
  {
    id: "ev-001",
    name: "ICS Network Segmentation Policy v2.1",
    standard: Standard.IEC62443,
    controlId: "SR-5.1",
    evidenceType: EvidenceType.Policy,
    status: EvidenceStatus.Active,
    expiryDate:
      BigInt(Date.now() + 180 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    notes: "Updated network segmentation policy covering OT/IT boundaries",
    createdAt:
      BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "ev-002",
    name: "User Access Review Q1 2026",
    standard: Standard.IEC62443,
    controlId: "SR-1.3",
    evidenceType: EvidenceType.Document,
    status: EvidenceStatus.Active,
    expiryDate:
      BigInt(Date.now() + 25 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    notes: "Quarterly access review sign-off from IT Security Manager",
    createdAt:
      BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "ev-003",
    name: "SIEM Alert Screenshots — Nov 2025",
    standard: Standard.NIST_CSF,
    controlId: "DE.CM-1",
    evidenceType: EvidenceType.Screenshot,
    status: EvidenceStatus.Active,
    expiryDate:
      BigInt(Date.now() + 60 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    notes: "Monthly SIEM alert summary demonstrating active monitoring",
    createdAt:
      BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "ev-004",
    name: "Cryptographic Controls Policy",
    standard: Standard.ISO27001,
    controlId: "A.10.1.1",
    evidenceType: EvidenceType.Policy,
    status: EvidenceStatus.Expired,
    expiryDate:
      BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    notes: "Policy expired — renewal in progress",
    createdAt:
      BigInt(Date.now() - 370 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "ev-005",
    name: "Firewall Rule Export — CIP-005",
    standard: Standard.NERC_CIP,
    controlId: "CIP-005-6",
    evidenceType: EvidenceType.Log,
    status: EvidenceStatus.Active,
    expiryDate:
      BigInt(Date.now() + 90 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    notes: "Electronic security perimeter ruleset export from FortiGate",
    createdAt: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "ev-006",
    name: "SOC 2 Type II Report FY2025",
    standard: Standard.SOC2,
    controlId: "CC6.1",
    evidenceType: EvidenceType.Document,
    status: EvidenceStatus.Active,
    expiryDate:
      BigInt(Date.now() + 200 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    notes: "Annual SOC 2 Type II audit report from Deloitte",
    createdAt:
      BigInt(Date.now() - 45 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "ev-007",
    name: "CMMC Self-Assessment Worksheet",
    standard: Standard.CMMC,
    controlId: "AC.L1-3.1.1",
    evidenceType: EvidenceType.Document,
    status: EvidenceStatus.Pending,
    notes: "Draft self-assessment worksheet pending legal review",
    createdAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "ev-008",
    name: "Audit Log Retention Policy v1.5",
    standard: Standard.IEC62443,
    controlId: "SR-6.1",
    evidenceType: EvidenceType.Policy,
    status: EvidenceStatus.Active,
    expiryDate:
      BigInt(Date.now() + 12 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    notes: "Log retention schedule and archival procedures",
    createdAt:
      BigInt(Date.now() - 60 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
];

// ── Mock Implementation Tasks ──────────────────────────────────

export const mockTasks: ImplementationTask[] = [
  {
    id: "task-001",
    title: "Deploy multi-factor authentication for ICS operator access",
    description:
      "Implement hardware-token MFA for all Level 2+ ICS operators. Integration with existing LDAP directory required.",
    controlId: "SR-1.1",
    standard: Standard.IEC62443,
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    createdAt:
      BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
    linkedAssessmentId: "assess-001",
  },
  {
    id: "task-002",
    title: "Implement network segmentation between OT and IT zones",
    description:
      "Configure Layer 3 segmentation with stateful firewall inspection at DMZ boundary. Document all crossing traffic.",
    controlId: "SR-5.1",
    standard: Standard.IEC62443,
    priority: TaskPriority.High,
    status: TaskStatus.Open,
    createdAt:
      BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "task-003",
    title: "Deploy endpoint detection and response (EDR) on HMI workstations",
    description:
      "Roll out CrowdStrike Falcon on all HMI/engineering workstations. Configure OT-aware exclusion policies.",
    controlId: "SR-3.2",
    standard: Standard.IEC62443,
    priority: TaskPriority.High,
    status: TaskStatus.InProgress,
    createdAt: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
    linkedAssessmentId: "assess-001",
  },
  {
    id: "task-004",
    title: "Conduct asset inventory and classification",
    description:
      "Complete OT asset discovery using Claroty. Classify all BES Cyber Systems per CIP-002 methodology.",
    controlId: "CIP-002-5",
    standard: Standard.NERC_CIP,
    priority: TaskPriority.High,
    status: TaskStatus.Completed,
    createdAt:
      BigInt(Date.now() - 30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "task-005",
    title: "Update cryptographic controls policy to AES-256",
    description:
      "Revise encryption policy to mandate AES-256-GCM for data at rest and TLS 1.3 for data in transit.",
    controlId: "SR-4.1",
    standard: Standard.IEC62443,
    priority: TaskPriority.Medium,
    status: TaskStatus.Open,
    createdAt: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "task-006",
    title: "Configure SIEM alert thresholds for OT anomalies",
    description:
      "Tune Splunk SIEM rules for ICS-specific behavioral anomalies. Integrate Dragos threat intelligence feeds.",
    controlId: "DE.CM-1",
    standard: Standard.NIST_CSF,
    priority: TaskPriority.Medium,
    status: TaskStatus.InProgress,
    createdAt: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
    linkedAssessmentId: "assess-002",
  },
  {
    id: "task-007",
    title: "Conduct quarterly access review for privileged accounts",
    description:
      "Review and certify all privileged service and admin accounts. Revoke dormant accounts exceeding 90 days.",
    controlId: "A.9.2.1",
    standard: Standard.ISO27001,
    priority: TaskPriority.Medium,
    status: TaskStatus.Open,
    createdAt: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "task-008",
    title: "Document incident response procedures for ICS",
    description:
      "Create playbooks for ransomware, data exfiltration, and control system manipulation scenarios.",
    controlId: "RS.RP-1",
    standard: Standard.NIST_CSF,
    priority: TaskPriority.Medium,
    status: TaskStatus.OnHold,
    createdAt:
      BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "task-009",
    title: "Deploy audit log aggregation for control systems",
    description:
      "Configure syslog forwarding from PLCs and HMIs to centralized log management. Set 12-month retention.",
    controlId: "SR-6.1",
    standard: Standard.IEC62443,
    priority: TaskPriority.Low,
    status: TaskStatus.Open,
    createdAt: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "task-010",
    title: "Update vendor access management procedures",
    description:
      "Implement just-in-time vendor access with session recording for all remote vendor connections.",
    controlId: "PR.AC-3",
    standard: Standard.NIST_CSF,
    priority: TaskPriority.Low,
    status: TaskStatus.Completed,
    createdAt:
      BigInt(Date.now() - 25 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
  {
    id: "task-011",
    title: "Schedule physical security audit for control room",
    description:
      "Engage third-party auditor for physical security assessment of primary control room and backup site.",
    controlId: "CIP-006-6",
    standard: Standard.NERC_CIP,
    priority: TaskPriority.Low,
    status: TaskStatus.Open,
    createdAt: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    createdBy: PRINCIPAL_MOCK,
  },
];

// ── Mock Compliance Reports ────────────────────────────────────

export const mockReports: Record<Standard, ComplianceReport> = {
  [Standard.IEC62443]: {
    standard: Standard.IEC62443,
    totalControls: BigInt(10),
    compliantCount: BigInt(5),
    partialCount: BigInt(2),
    nonCompliantCount: BigInt(2),
    notApplicableCount: BigInt(1),
    compliancePercentage: 60,
  },
  [Standard.NIST_CSF]: {
    standard: Standard.NIST_CSF,
    totalControls: BigInt(7),
    compliantCount: BigInt(4),
    partialCount: BigInt(2),
    nonCompliantCount: BigInt(1),
    notApplicableCount: BigInt(0),
    compliancePercentage: 71,
  },
  [Standard.ISO27001]: {
    standard: Standard.ISO27001,
    totalControls: BigInt(6),
    compliantCount: BigInt(3),
    partialCount: BigInt(2),
    nonCompliantCount: BigInt(1),
    notApplicableCount: BigInt(0),
    compliancePercentage: 67,
  },
  [Standard.SOC2]: {
    standard: Standard.SOC2,
    totalControls: BigInt(5),
    compliantCount: BigInt(4),
    partialCount: BigInt(1),
    nonCompliantCount: BigInt(0),
    notApplicableCount: BigInt(0),
    compliancePercentage: 90,
  },
  [Standard.CMMC]: {
    standard: Standard.CMMC,
    totalControls: BigInt(5),
    compliantCount: BigInt(2),
    partialCount: BigInt(1),
    nonCompliantCount: BigInt(2),
    notApplicableCount: BigInt(0),
    compliancePercentage: 50,
  },
  [Standard.NERC_CIP]: {
    standard: Standard.NERC_CIP,
    totalControls: BigInt(6),
    compliantCount: BigInt(4),
    partialCount: BigInt(1),
    nonCompliantCount: BigInt(1),
    notApplicableCount: BigInt(0),
    compliancePercentage: 75,
  },
};

// ── Mock Evidence Coverage Summary ────────────────────────────

export const mockEvidenceCoverage: Array<[Standard, bigint]> = [
  [Standard.IEC62443, BigInt(3)],
  [Standard.NIST_CSF, BigInt(1)],
  [Standard.ISO27001, BigInt(1)],
  [Standard.SOC2, BigInt(1)],
  [Standard.CMMC, BigInt(1)],
  [Standard.NERC_CIP, BigInt(1)],
];

// ── Standard Display Helpers ───────────────────────────────────

export const STANDARD_LABELS: Record<Standard, string> = {
  [Standard.IEC62443]: "IEC 62443",
  [Standard.NIST_CSF]: "NIST CSF",
  [Standard.ISO27001]: "ISO 27001",
  [Standard.SOC2]: "SOC 2",
  [Standard.CMMC]: "CMMC",
  [Standard.NERC_CIP]: "NERC CIP",
};

export const STANDARD_COLORS: Record<Standard, string> = {
  [Standard.IEC62443]: "oklch(0.62 0.22 250)",
  [Standard.NIST_CSF]: "oklch(0.7 0.18 200)",
  [Standard.ISO27001]: "oklch(0.7 0.2 145)",
  [Standard.SOC2]: "oklch(0.75 0.18 55)",
  [Standard.CMMC]: "oklch(0.72 0.2 300)",
  [Standard.NERC_CIP]: "oklch(0.6 0.22 25)",
};

export const FAMILY_LABELS: Record<ControlFamily, string> = {
  [ControlFamily.Access_Control]: "Access Control",
  [ControlFamily.Asset_Management]: "Asset Management",
  [ControlFamily.Communications_Security]: "Communications Security",
  [ControlFamily.Continuous_Monitoring]: "Continuous Monitoring",
  [ControlFamily.Cryptography]: "Cryptography",
  [ControlFamily.Operations_Security]: "Operations Security",
  [ControlFamily.Physical_Security]: "Physical Security",
  [ControlFamily.Security_Assessment]: "Security Assessment",
};
