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
  // ── IEC 62443 ──────────────────────────────────────────────
  // SR-1: Identification and Authentication Control
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
    id: "SR-1.4",
    description: "Identifier management",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.5",
    description: "Authenticator management",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.6",
    description: "Wireless access management",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.7",
    description: "Strength of password-based authentication",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.8",
    description: "Public key infrastructure (PKI) certificates",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.9",
    description: "Strength of public key authentication",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.10",
    description: "Authenticator feedback",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.11",
    description: "Unsuccessful login attempts",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.12",
    description: "System use notification",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-1.13",
    description: "Access via untrusted networks",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  // SR-2: Use Control
  {
    id: "SR-2.1",
    description: "Authorization enforcement",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-2.2",
    description: "Wireless use control",
    standard: Standard.IEC62443,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SR-2.3",
    description: "Use control for portable and mobile devices",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-2.4",
    description: "Mobile code",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  // SR-3: System Integrity
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
    id: "SR-3.3",
    description: "Security functionality verification",
    standard: Standard.IEC62443,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "SR-3.4",
    description: "Software and information integrity",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-3.5",
    description: "Input validation",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-3.6",
    description: "Deterministic output",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-3.7",
    description: "Error handling",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-3.8",
    description: "Session integrity",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  // SR-4: Data Confidentiality
  {
    id: "SR-4.1",
    description: "Information confidentiality",
    standard: Standard.IEC62443,
    family: ControlFamily.Cryptography,
  },
  {
    id: "SR-4.2",
    description: "Information persistence",
    standard: Standard.IEC62443,
    family: ControlFamily.Asset_Management,
  },
  // SR-5: Restricted Data Flow
  {
    id: "SR-5.1",
    description: "Network segmentation",
    standard: Standard.IEC62443,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SR-5.2",
    description: "Zone boundary protection",
    standard: Standard.IEC62443,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SR-5.3",
    description: "General-purpose person-to-person communication restrictions",
    standard: Standard.IEC62443,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SR-5.4",
    description: "Application partitioning",
    standard: Standard.IEC62443,
    family: ControlFamily.Communications_Security,
  },
  // SR-6: Timely Response to Events
  {
    id: "SR-6.1",
    description: "Audit log accessibility",
    standard: Standard.IEC62443,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "SR-6.2",
    description: "Continuous monitoring",
    standard: Standard.IEC62443,
    family: ControlFamily.Continuous_Monitoring,
  },
  // SR-7: Resource Availability
  {
    id: "SR-7.1",
    description: "Denial of service protection",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-7.2",
    description: "Resource management",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-7.3",
    description: "Control system backup",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-7.4",
    description: "Control system recovery and reconstitution",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-7.5",
    description: "Emergency power",
    standard: Standard.IEC62443,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "SR-7.6",
    description: "Network and security configuration settings",
    standard: Standard.IEC62443,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SR-7.7",
    description: "Least functionality",
    standard: Standard.IEC62443,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SR-7.8",
    description: "Control system component inventory",
    standard: Standard.IEC62443,
    family: ControlFamily.Asset_Management,
  },

  // ── NIST CSF ──────────────────────────────────────────────
  // Identify — Asset Management
  {
    id: "ID.AM-1",
    description:
      "Physical devices and systems within the organization are inventoried",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "ID.AM-2",
    description:
      "Software platforms and applications within the organization are inventoried",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "ID.AM-3",
    description: "Organizational communication and data flows are mapped",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "ID.AM-4",
    description: "External information systems are catalogued",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "ID.AM-5",
    description:
      "Resources are prioritized based on their classification, criticality, and business value",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "ID.AM-6",
    description:
      "Cybersecurity roles and responsibilities for the entire workforce and third-party stakeholders are established",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  // Identify — Business Environment
  {
    id: "ID.BE-1",
    description:
      "The organization's role in the supply chain is identified and communicated",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "ID.BE-2",
    description:
      "The organization's place in critical infrastructure and its industry sector is identified",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "ID.BE-3",
    description:
      "Priorities for organizational mission, objectives, and activities are established",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "ID.BE-4",
    description:
      "Dependencies and critical functions for delivery of critical services are established",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "ID.BE-5",
    description:
      "Resilience requirements for critical services are established",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  // Identify — Governance
  {
    id: "ID.GV-1",
    description:
      "Organizational cybersecurity policy is established and communicated",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.GV-2",
    description:
      "Cybersecurity roles and responsibilities are coordinated and aligned with internal roles and external partners",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.GV-3",
    description:
      "Legal and regulatory requirements regarding cybersecurity are understood and managed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.GV-4",
    description:
      "Governance and risk management processes address cybersecurity risks",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Identify — Risk Assessment
  {
    id: "ID.RA-1",
    description: "Asset vulnerabilities are identified and documented",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.RA-2",
    description:
      "Cyber threat intelligence is received from information sharing forums and sources",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.RA-3",
    description:
      "Threats, both internal and external, are identified and documented",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.RA-4",
    description: "Potential business impacts and likelihoods are identified",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.RA-5",
    description:
      "Threats, vulnerabilities, likelihoods, and impacts are used to determine risk",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "ID.RA-6",
    description: "Risk responses are identified and prioritized",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Protect — Access Control
  {
    id: "PR.AC-1",
    description:
      "Identities and credentials are issued, managed, verified, revoked, and audited",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  {
    id: "PR.AC-2",
    description: "Physical access to assets is managed and protected",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "PR.AC-3",
    description: "Remote access is managed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  {
    id: "PR.AC-4",
    description:
      "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  {
    id: "PR.AC-5",
    description:
      "Network integrity is protected, incorporating network segregation where appropriate",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "PR.AC-6",
    description:
      "Identities are proofed and bound to credentials and asserted in interactions",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  {
    id: "PR.AC-7",
    description:
      "Users, devices, and other assets are authenticated commensurate with the risk",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  // Protect — Awareness and Training
  {
    id: "PR.AT-1",
    description: "All users are informed and trained",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.AT-2",
    description: "Privileged users understand their roles and responsibilities",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.AT-3",
    description:
      "Third-party stakeholders understand their roles and responsibilities",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.AT-4",
    description:
      "Senior executives understand their roles and responsibilities",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.AT-5",
    description:
      "Physical and cybersecurity personnel understand their roles and responsibilities",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  // Protect — Data Security
  {
    id: "PR.DS-1",
    description: "Data-at-rest is protected",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Cryptography,
  },
  {
    id: "PR.DS-2",
    description: "Data-in-transit is protected",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Cryptography,
  },
  {
    id: "PR.DS-3",
    description:
      "Assets are formally managed throughout removal, transfers, and disposition",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "PR.DS-4",
    description: "Adequate capacity to ensure availability is maintained",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.DS-5",
    description: "Protections against data leaks are implemented",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Cryptography,
  },
  {
    id: "PR.DS-6",
    description:
      "Integrity checking mechanisms are used to verify software, firmware, and information integrity",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.DS-7",
    description:
      "The development and testing environment(s) are separate from the production environment",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  // Protect — Information Protection
  {
    id: "PR.IP-1",
    description:
      "A baseline configuration of IT/OT systems is created and maintained",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.IP-2",
    description:
      "A System Development Life Cycle to manage systems is implemented",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.IP-3",
    description: "Configuration change control processes are in place",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.IP-4",
    description: "Backups of information are conducted, maintained, and tested",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.IP-5",
    description:
      "Policy and regulations regarding the physical operating environment are met",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "PR.IP-6",
    description: "Data is destroyed according to policy",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "PR.IP-7",
    description: "Protection processes are improved",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "PR.IP-8",
    description: "Effectiveness of protection technologies is shared",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "PR.IP-9",
    description: "Response plans and recovery plans are in place and managed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "PR.IP-10",
    description: "Response and recovery plans are tested",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "PR.IP-11",
    description: "Cybersecurity is included in human resources practices",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.IP-12",
    description: "A vulnerability management plan is developed and implemented",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Protect — Maintenance
  {
    id: "PR.MA-1",
    description:
      "Maintenance and repair of organizational assets is performed and logged",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PR.MA-2",
    description:
      "Remote maintenance of organizational assets is approved, logged, and performed in a manner that prevents unauthorized access",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  // Protect — Protective Technology
  {
    id: "PR.PT-1",
    description:
      "Audit/log records are determined, documented, implemented, and reviewed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "PR.PT-2",
    description:
      "Removable media is protected and its use restricted according to policy",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "PR.PT-3",
    description:
      "The principle of least functionality is incorporated by configuring systems to provide only essential capabilities",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Access_Control,
  },
  {
    id: "PR.PT-4",
    description: "Communications and control networks are protected",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "PR.PT-5",
    description:
      "Mechanisms (e.g., failsafe, load balancing, hot swap) are implemented to achieve resilience requirements",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Operations_Security,
  },
  // Detect — Anomalies
  {
    id: "DE.AE-1",
    description:
      "A baseline of network operations and expected data flows is established",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.AE-2",
    description:
      "Detected events are analyzed to understand attack targets and methods",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.AE-3",
    description:
      "Event data are collected and correlated from multiple sources",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.AE-4",
    description: "Impact of events is determined",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.AE-5",
    description: "Incident alert thresholds are established",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  // Detect — Continuous Monitoring
  {
    id: "DE.CM-1",
    description:
      "The network is monitored to detect potential cybersecurity events",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.CM-2",
    description:
      "The physical environment is monitored to detect potential cybersecurity events",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "DE.CM-3",
    description:
      "Personnel activity is monitored to detect potential cybersecurity events",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.CM-4",
    description: "Malicious code is detected",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.CM-5",
    description: "Unauthorized mobile code is detected",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.CM-6",
    description:
      "External service provider activity is monitored to detect potential cybersecurity events",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.CM-7",
    description:
      "Monitoring for unauthorized personnel, connections, devices, and software is performed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "DE.CM-8",
    description: "Vulnerability scans are performed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Detect — Detection Processes
  {
    id: "DE.DP-1",
    description:
      "Roles and responsibilities for detection are well defined to ensure accountability",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "DE.DP-2",
    description: "Detection activities comply with all applicable requirements",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "DE.DP-3",
    description: "Detection processes are tested",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "DE.DP-4",
    description: "Event detection information is communicated",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "DE.DP-5",
    description: "Detection processes are continuously improved",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Respond — Response Planning
  {
    id: "RS.RP-1",
    description: "Response plan is executed during or after an incident",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Respond — Communications
  {
    id: "RS.CO-1",
    description:
      "Personnel know their roles and order of operations when a response is needed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RS.CO-2",
    description: "Incidents are reported consistent with established criteria",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RS.CO-3",
    description: "Information is shared consistent with response plans",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RS.CO-4",
    description:
      "Coordination with stakeholders occurs consistent with response plans",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RS.CO-5",
    description:
      "Voluntary information sharing occurs with external stakeholders to achieve broader cybersecurity situational awareness",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Respond — Analysis
  {
    id: "RS.AN-1",
    description: "Notifications from detection systems are investigated",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RS.AN-2",
    description: "The impact of the incident is understood",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RS.AN-3",
    description: "Forensics are performed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RS.AN-4",
    description: "Incidents are categorized consistent with response plans",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Recover — Recovery Planning
  {
    id: "RC.RP-1",
    description:
      "Recovery plan is executed during or after a cybersecurity incident",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Recover — Improvements
  {
    id: "RC.IM-1",
    description: "Recovery plans incorporate lessons learned",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RC.IM-2",
    description: "Recovery strategies are updated",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  // Recover — Communications
  {
    id: "RC.CO-1",
    description: "Public relations are managed",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RC.CO-2",
    description: "Reputation is repaired after an incident",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RC.CO-3",
    description:
      "Recovery activities are communicated to internal and external stakeholders",
    standard: Standard.NIST_CSF,
    family: ControlFamily.Security_Assessment,
  },

  // ── ISO 27001 ──────────────────────────────────────────────
  // A.5 Information security policies
  {
    id: "A.5.1.1",
    description: "Policies for information security",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.5.1.2",
    description: "Review of the policies for information security",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  // A.6 Organization of information security
  {
    id: "A.6.1.1",
    description: "Information security roles and responsibilities",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.6.1.2",
    description: "Segregation of duties",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.6.1.3",
    description: "Contact with authorities",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.6.1.4",
    description: "Contact with special interest groups",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.6.1.5",
    description: "Information security in project management",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.6.2.1",
    description: "Mobile device policy",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.6.2.2",
    description: "Teleworking",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  // A.7 Human resource security
  {
    id: "A.7.1.1",
    description: "Screening",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.7.1.2",
    description: "Terms and conditions of employment",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.7.2.1",
    description: "Management responsibilities",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.7.2.2",
    description: "Information security awareness, education and training",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.7.2.3",
    description: "Disciplinary process",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.7.3.1",
    description: "Termination or change of employment responsibilities",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  // A.8 Asset management
  {
    id: "A.8.1.1",
    description: "Inventory of assets",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.1.2",
    description: "Ownership of assets",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.1.3",
    description: "Acceptable use of assets",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.1.4",
    description: "Return of assets",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.2.1",
    description: "Classification of information",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.2.2",
    description: "Labelling of information",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.2.3",
    description: "Handling of assets",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.3.1",
    description: "Management of removable media",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.3.2",
    description: "Disposal of media",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.8.3.3",
    description: "Physical media transfer",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  // A.9 Access control
  {
    id: "A.9.1.1",
    description: "Access control policy",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.1.2",
    description: "Access to networks and network services",
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
    id: "A.9.2.2",
    description: "User access provisioning",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.2.3",
    description: "Management of privileged access rights",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.2.4",
    description: "Management of secret authentication information of users",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.2.5",
    description: "Review of user access rights",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.2.6",
    description: "Removal or adjustment of access rights",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.3.1",
    description: "Use of secret authentication information",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.4.1",
    description: "Information access restriction",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.4.2",
    description: "Secure log-on procedures",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.4.3",
    description: "Password management system",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.4.4",
    description: "Use of privileged utility programs",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  {
    id: "A.9.4.5",
    description: "Access control to program source code",
    standard: Standard.ISO27001,
    family: ControlFamily.Access_Control,
  },
  // A.10 Cryptography
  {
    id: "A.10.1.1",
    description: "Policy on the use of cryptographic controls",
    standard: Standard.ISO27001,
    family: ControlFamily.Cryptography,
  },
  {
    id: "A.10.1.2",
    description: "Key management",
    standard: Standard.ISO27001,
    family: ControlFamily.Cryptography,
  },
  // A.11 Physical and environmental security
  {
    id: "A.11.1.1",
    description: "Physical security perimeter",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.1.2",
    description: "Physical entry controls",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.1.3",
    description: "Securing offices, rooms, and facilities",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.1.4",
    description: "Protecting against external and environmental threats",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.1.5",
    description: "Working in secure areas",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.1.6",
    description: "Delivery and loading areas",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.2.1",
    description: "Equipment siting and protection",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.2.2",
    description: "Supporting utilities",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.2.3",
    description: "Cabling security",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.2.4",
    description: "Equipment maintenance",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.2.5",
    description: "Removal of assets",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.11.2.6",
    description: "Security of equipment and assets off-premises",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.2.7",
    description: "Secure disposal or reuse of equipment",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.11.2.8",
    description: "Unattended user equipment",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "A.11.2.9",
    description: "Clear desk and clear screen policy",
    standard: Standard.ISO27001,
    family: ControlFamily.Physical_Security,
  },
  // A.12 Operations security
  {
    id: "A.12.1.1",
    description: "Documented operating procedures",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.1.2",
    description: "Change management",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.1.3",
    description: "Capacity management",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.1.4",
    description:
      "Separation of development, testing, and operational environments",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.2.1",
    description: "Controls against malware",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.3.1",
    description: "Information backup",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.4.1",
    description: "Event logging",
    standard: Standard.ISO27001,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "A.12.4.2",
    description: "Protection of log information",
    standard: Standard.ISO27001,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "A.12.4.3",
    description: "Administrator and operator logs",
    standard: Standard.ISO27001,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "A.12.4.4",
    description: "Clock synchronisation",
    standard: Standard.ISO27001,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "A.12.5.1",
    description: "Installation of software on operational systems",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.6.1",
    description: "Management of technical vulnerabilities",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.12.6.2",
    description: "Restrictions on software installation",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.12.7.1",
    description: "Information systems audit controls",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  // A.13 Communications security
  {
    id: "A.13.1.1",
    description: "Network controls",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.13.1.2",
    description: "Security of network services",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.13.1.3",
    description: "Segregation in networks",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.13.2.1",
    description: "Information transfer policies and procedures",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.13.2.2",
    description: "Agreements on information transfer",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.13.2.3",
    description: "Electronic messaging",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.13.2.4",
    description: "Confidentiality or nondisclosure agreements",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  // A.14 System acquisition, development, and maintenance
  {
    id: "A.14.1.1",
    description: "Information security requirements analysis and specification",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.14.1.2",
    description: "Securing application services on public networks",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.14.1.3",
    description: "Protecting application services transactions",
    standard: Standard.ISO27001,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "A.14.2.1",
    description: "Secure development policy",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.14.2.2",
    description: "System change control procedures",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.14.2.3",
    description:
      "Technical review of applications after operating platform changes",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.14.2.4",
    description: "Restrictions on changes to software packages",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.14.2.5",
    description: "Secure system engineering principles",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.14.2.6",
    description: "Secure development environment",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.14.2.7",
    description: "Outsourced development",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.14.2.8",
    description: "System security testing",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.14.2.9",
    description: "System acceptance testing",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.14.3.1",
    description: "Protection of test data",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  // A.15 Supplier relationships
  {
    id: "A.15.1.1",
    description: "Information security policy for supplier relationships",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.15.1.2",
    description: "Addressing security within supplier agreements",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.15.1.3",
    description: "Information and communication technology supply chain",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.15.2.1",
    description: "Monitoring and review of supplier services",
    standard: Standard.ISO27001,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "A.15.2.2",
    description: "Managing changes to supplier services",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  // A.16 Information security incident management
  {
    id: "A.16.1.1",
    description: "Responsibilities and procedures for incident management",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.16.1.2",
    description: "Reporting information security events",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.16.1.3",
    description: "Reporting information security weaknesses",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.16.1.4",
    description: "Assessment of and decision on information security events",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.16.1.5",
    description: "Response to information security incidents",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.16.1.6",
    description: "Learning from information security incidents",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.16.1.7",
    description: "Collection of evidence",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  // A.17 Business continuity
  {
    id: "A.17.1.1",
    description: "Planning information security continuity",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.17.1.2",
    description: "Implementing information security continuity",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.17.1.3",
    description: "Verify, review and evaluate information security continuity",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A.17.2.1",
    description: "Availability of information processing facilities",
    standard: Standard.ISO27001,
    family: ControlFamily.Operations_Security,
  },
  // A.18 Compliance
  {
    id: "A.18.1.1",
    description:
      "Identification of applicable legislation and contractual requirements",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.18.1.2",
    description: "Intellectual property rights",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.18.1.3",
    description: "Protection of records",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.18.1.4",
    description:
      "Privacy and protection of personally identifiable information",
    standard: Standard.ISO27001,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "A.18.1.5",
    description: "Regulation of cryptographic controls",
    standard: Standard.ISO27001,
    family: ControlFamily.Cryptography,
  },
  {
    id: "A.18.2.1",
    description: "Independent review of information security",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.18.2.2",
    description: "Compliance with security policies and standards",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "A.18.2.3",
    description: "Technical compliance review",
    standard: Standard.ISO27001,
    family: ControlFamily.Security_Assessment,
  },

  // ── SOC 2 ──────────────────────────────────────────────────
  // CC1 — Control Environment
  {
    id: "CC1.1",
    description:
      "COSO Principle 1: Demonstrates Commitment to Integrity and Ethical Values",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC1.2",
    description:
      "COSO Principle 2: Board of Directors Demonstrates Independence from Management",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC1.3",
    description:
      "COSO Principle 3: Management Establishes Structures, Reporting Lines, and Authorities",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CC1.4",
    description: "COSO Principle 4: Demonstrates Commitment to Competence",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CC1.5",
    description: "COSO Principle 5: Enforces Accountability",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  // CC2 — Communication and Information
  {
    id: "CC2.1",
    description: "COSO Principle 13: Uses Relevant Information",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC2.2",
    description: "COSO Principle 14: Communicates Internally",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC2.3",
    description: "COSO Principle 15: Communicates Externally",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  // CC3 — Risk Assessment
  {
    id: "CC3.1",
    description: "COSO Principle 6: Specifies Suitable Objectives",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC3.2",
    description: "COSO Principle 7: Identifies and Analyzes Risk",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC3.3",
    description: "COSO Principle 8: Assesses Fraud Risk",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC3.4",
    description: "COSO Principle 9: Identifies and Analyzes Significant Change",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  // CC4 — Monitoring Activities
  {
    id: "CC4.1",
    description:
      "COSO Principle 16: Conducts Ongoing and/or Separate Evaluations",
    standard: Standard.SOC2,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "CC4.2",
    description: "COSO Principle 17: Evaluates and Communicates Deficiencies",
    standard: Standard.SOC2,
    family: ControlFamily.Continuous_Monitoring,
  },
  // CC5 — Control Activities
  {
    id: "CC5.1",
    description: "COSO Principle 10: Selects and Develops Control Activities",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CC5.2",
    description:
      "COSO Principle 11: Selects and Develops General Controls over Technology",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CC5.3",
    description: "COSO Principle 12: Deploys Through Policies and Procedures",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  // CC6 — Logical and Physical Access Controls
  {
    id: "CC6.1",
    description:
      "Logical and physical access controls to meet the entity's objectives",
    standard: Standard.SOC2,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CC6.2",
    description:
      "New internal and external users are registered and authorized",
    standard: Standard.SOC2,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CC6.3",
    description:
      "Internal and external users' access is removed upon change or termination",
    standard: Standard.SOC2,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CC6.4",
    description:
      "Physical access to facilities and protected information assets is restricted",
    standard: Standard.SOC2,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CC6.5",
    description:
      "Logical and physical protections over physical assets are maintained",
    standard: Standard.SOC2,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CC6.6",
    description:
      "Logical access security measures against threats from sources outside its system boundaries",
    standard: Standard.SOC2,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CC6.7",
    description:
      "Transmission, movement, and removal of information is restricted",
    standard: Standard.SOC2,
    family: ControlFamily.Cryptography,
  },
  {
    id: "CC6.8",
    description:
      "Controls to prevent or detect and act upon the introduction of unauthorized or malicious software",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  // CC7 — System Operations
  {
    id: "CC7.1",
    description: "Vulnerability management procedures are in place",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC7.2",
    description: "System monitoring for anomalies and unusual actions",
    standard: Standard.SOC2,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "CC7.3",
    description:
      "Identified security incidents are evaluated to determine response",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC7.4",
    description:
      "Identified security incidents are responded to through defined incident management procedures",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC7.5",
    description:
      "Identified security incidents are recovered from and root cause analysis is performed",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  // CC8 — Change Management
  {
    id: "CC8.1",
    description:
      "Changes to infrastructure, data, software, and procedures are authorized, designed, developed, configured, documented, tested, approved, and implemented to meet entity objectives",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  // CC9 — Risk Mitigation
  {
    id: "CC9.1",
    description:
      "Risk mitigation activities are identified and the effectiveness of the program is evaluated",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CC9.2",
    description:
      "The entity assesses and manages risks associated with vendors and business partners",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  // A-series — Additional Criteria
  {
    id: "A1.1",
    description:
      "Availability: Current processing capacity and usage are maintained, monitored, and evaluated",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A1.2",
    description:
      "Availability: Environmental protections, software, data backup processes, and recovery infrastructure are authorized",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "A1.3",
    description:
      "Availability: Recovery plan procedures supporting system recovery are tested to meet entity objectives",
    standard: Standard.SOC2,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "C1.1",
    description:
      "Confidentiality: Confidential information is protected during the system input, processing, and output phases",
    standard: Standard.SOC2,
    family: ControlFamily.Cryptography,
  },
  {
    id: "C1.2",
    description:
      "Confidentiality: Confidential information is protected in accordance with entity objectives",
    standard: Standard.SOC2,
    family: ControlFamily.Cryptography,
  },
  {
    id: "PI1.1",
    description:
      "Processing Integrity: Procedures exist to ensure completeness, accuracy, timeliness, and authorization",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PI1.2",
    description:
      "Processing Integrity: System processing is complete, accurate, timely, and authorized",
    standard: Standard.SOC2,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "P1.1",
    description: "Privacy: Privacy notice is provided to data subjects",
    standard: Standard.SOC2,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "P2.1",
    description: "Privacy: Choice and consent are provided to data subjects",
    standard: Standard.SOC2,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "P3.1",
    description:
      "Privacy: Personal information is collected for the purposes identified in the notice",
    standard: Standard.SOC2,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "P4.1",
    description:
      "Privacy: Personal information is used, retained, and disposed of only as described in the privacy notice",
    standard: Standard.SOC2,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "P5.1",
    description:
      "Privacy: Access is provided to individuals to review their personal information",
    standard: Standard.SOC2,
    family: ControlFamily.Access_Control,
  },
  {
    id: "P6.1",
    description:
      "Privacy: Personal information is disclosed only to parties with whom the entity has agreed to disclose",
    standard: Standard.SOC2,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "P7.1",
    description:
      "Privacy: Personal information is collected and maintained accurately and completely",
    standard: Standard.SOC2,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "P8.1",
    description:
      "Privacy: The entity monitors compliance with its privacy policies and procedures",
    standard: Standard.SOC2,
    family: ControlFamily.Continuous_Monitoring,
  },

  // ── CMMC ──────────────────────────────────────────────────
  // Level 1 — Access Control
  {
    id: "AC.L1-3.1.1",
    description:
      "Limit information system access to authorized users, processes acting on behalf of authorized users, and devices (including other information systems)",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L1-3.1.2",
    description:
      "Limit information system access to the types of transactions and functions that authorized users are permitted to execute",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L1-3.1.20",
    description:
      "Verify and control/limit connections to external information systems",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L1-3.1.22",
    description:
      "Control CUI posted or processed on publicly accessible information systems",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  // Level 2 — Access Control
  {
    id: "AC.L2-3.1.3",
    description:
      "Control the flow of CUI in accordance with approved authorizations",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.4",
    description:
      "Separate the duties of individuals to reduce the risk of malevolent activity",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.5",
    description:
      "Employ the principle of least privilege, including for specific security functions and privileged accounts",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.6",
    description:
      "Use non-privileged accounts when accessing non-security functions",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.7",
    description:
      "Prevent non-privileged users from executing privileged functions and capture the execution of such functions in audit logs",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.8",
    description: "Limit unsuccessful logon attempts",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.9",
    description:
      "Provide privacy and security notices consistent with CUI rules",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.10",
    description:
      "Use session lock with pattern-hiding displays after a period of inactivity",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.11",
    description: "Terminate sessions after a defined condition",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.12",
    description: "Monitor and control remote access sessions",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.13",
    description:
      "Employ cryptographic mechanisms to protect the confidentiality of remote access sessions",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  {
    id: "AC.L2-3.1.14",
    description: "Route remote access via managed access control points",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.15",
    description:
      "Authorize remote execution of privileged commands and access to security-relevant information via remote access only for documented operational needs",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.16",
    description: "Authorize wireless access prior to allowing such connections",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "AC.L2-3.1.17",
    description: "Protect wireless access using authentication and encryption",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "AC.L2-3.1.18",
    description: "Control connection of mobile devices",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "AC.L2-3.1.19",
    description: "Encrypt CUI on mobile devices and mobile computing platforms",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  {
    id: "AC.L2-3.1.21",
    description: "Limit use of portable storage devices on external systems",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  // Audit and Accountability
  {
    id: "AU.L2-3.3.1",
    description:
      "Create and retain system audit logs and records to enable the monitoring, analysis, investigation, and reporting of unlawful or unauthorized system activity",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.2",
    description:
      "Ensure that the actions of individual system users can be uniquely traced to those users so they can be held accountable for their actions",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.3",
    description: "Review and update logged events",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.4",
    description: "Alert in the event of an audit logging process failure",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.5",
    description:
      "Correlate audit record review, analysis, and reporting processes for investigation and response to indications of unlawful, unauthorized, suspicious, or unusual activity",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.6",
    description:
      "Provide audit record reduction and report generation to support on-demand analysis and reporting",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.7",
    description:
      "Provide a system capability that compares and synchronizes internal system clocks with an authoritative source to generate time stamps for audit records",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.8",
    description:
      "Protect audit information and audit tools from unauthorized access, modification, and deletion",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "AU.L2-3.3.9",
    description:
      "Limit management of audit logging to a subset of privileged users",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  // Configuration Management
  {
    id: "CM.L2-3.4.1",
    description:
      "Establish and maintain baseline configurations and inventories of organizational systems (including hardware, software, firmware, and documentation) throughout the respective system development life cycles",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CM.L2-3.4.2",
    description:
      "Establish and enforce security configuration settings for information technology products employed in organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CM.L2-3.4.3",
    description:
      "Track, review, approve, and log changes to organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CM.L2-3.4.4",
    description:
      "Analyze the security impact of changes prior to implementation",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CM.L2-3.4.5",
    description:
      "Define, document, approve, and enforce physical and logical access restrictions associated with changes to organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CM.L2-3.4.6",
    description:
      "Employ the principle of least functionality by configuring organizational systems to provide only essential capabilities",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CM.L2-3.4.7",
    description:
      "Restrict, disable, or prevent the use of nonessential programs, functions, ports, protocols, and services",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CM.L2-3.4.8",
    description:
      "Apply deny-by-exception policy to prevent use of unauthorized software",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CM.L2-3.4.9",
    description: "Control and monitor user-installed software",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  // Identification and Authentication
  {
    id: "IA.L1-3.5.1",
    description:
      "Identify information system users, processes acting on behalf of users, and devices",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L1-3.5.2",
    description:
      "Authenticate (or verify) the identities of those users, processes, or devices, as a prerequisite to allowing access",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.3",
    description:
      "Use multifactor authentication for local and network access to privileged accounts and for network access to non-privileged accounts",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.4",
    description:
      "Employ replay-resistant authentication mechanisms for network access to privileged and non-privileged accounts",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.5",
    description: "Employ identifier management and password management",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.6",
    description: "Disable identifiers after a defined inactivity period",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.7",
    description: "Enforce minimum password complexity and change requirements",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.8",
    description:
      "Prohibit password reuse for a specified number of generations",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.9",
    description:
      "Allow temporary password use for system logons with immediate change requirement",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "IA.L2-3.5.10",
    description:
      "Store and transmit only cryptographically-protected passwords",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  {
    id: "IA.L2-3.5.11",
    description: "Obscure feedback of authentication information",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  // Incident Response
  {
    id: "IR.L2-3.6.1",
    description:
      "Establish an operational incident-handling capability for organizational systems that includes preparation, detection, analysis, containment, recovery, and user response activities",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "IR.L2-3.6.2",
    description:
      "Track, document, and report incidents to designated officials and/or authorities",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "IR.L2-3.6.3",
    description: "Test the organizational incident response capability",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  // Maintenance
  {
    id: "MA.L2-3.7.1",
    description: "Perform maintenance on organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "MA.L2-3.7.2",
    description:
      "Provide controls on the tools, techniques, mechanisms, and personnel that conduct system maintenance",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "MA.L2-3.7.3",
    description: "Ensure equipment removed for maintenance is sanitized",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "MA.L2-3.7.4",
    description:
      "Check media containing diagnostic and test programs for malicious code before use",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "MA.L2-3.7.5",
    description: "Require MFA for remote maintenance sessions",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "MA.L2-3.7.6",
    description:
      "Supervise the maintenance activities of maintenance personnel without required access authorization",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  // Media Protection
  {
    id: "MP.L1-3.8.1",
    description:
      "Protect (i.e., physically control and securely store) system media containing CUI, both paper and digital",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "MP.L1-3.8.2",
    description: "Limit access to CUI on system media to authorized users",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "MP.L1-3.8.3",
    description: "Sanitize or destroy system media before disposal or reuse",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "MP.L2-3.8.4",
    description:
      "Mark media with necessary CUI markings and distribution limitations",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "MP.L2-3.8.5",
    description:
      "Control access to media containing CUI and maintain accountability for media during transport",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "MP.L2-3.8.6",
    description:
      "Implement cryptographic mechanisms to protect CUI during transport unless otherwise protected",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  {
    id: "MP.L2-3.8.7",
    description: "Control the use of removable media on system components",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "MP.L2-3.8.8",
    description:
      "Prohibit the use of portable storage without identifiable owner",
    standard: Standard.CMMC,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "MP.L2-3.8.9",
    description:
      "Protect the confidentiality of backup CUI at storage locations",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  // Personnel Security
  {
    id: "PS.L2-3.9.1",
    description:
      "Screen individuals prior to authorizing access to organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "PS.L2-3.9.2",
    description:
      "Ensure that CUI is protected during and after personnel actions such as terminations and transfers",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  // Physical Protection
  {
    id: "PE.L1-3.10.1",
    description:
      "Limit physical access to organizational information systems, equipment, and operating environments to authorized individuals",
    standard: Standard.CMMC,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "PE.L1-3.10.2",
    description:
      "Protect and monitor the physical facility and support infrastructure for organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "PE.L1-3.10.3",
    description: "Escort visitors and monitor visitor activity",
    standard: Standard.CMMC,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "PE.L1-3.10.4",
    description: "Maintain audit logs of physical access",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "PE.L1-3.10.5",
    description: "Control and manage physical access devices",
    standard: Standard.CMMC,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "PE.L2-3.10.6",
    description:
      "Enforce safeguarding measures for CUI at alternate work sites",
    standard: Standard.CMMC,
    family: ControlFamily.Physical_Security,
  },
  // Risk Assessment
  {
    id: "RA.L2-3.11.1",
    description:
      "Periodically assess the risk to organizational operations, assets, and individuals",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RA.L2-3.11.2",
    description:
      "Scan for vulnerabilities in organizational systems and applications periodically and when new vulnerabilities are identified",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "RA.L2-3.11.3",
    description:
      "Remediate vulnerabilities in accordance with risk assessments",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  // Security Assessment
  {
    id: "CA.L2-3.12.1",
    description:
      "Periodically assess the security controls in organizational systems to determine if the controls are effective",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CA.L2-3.12.2",
    description:
      "Develop and implement plans of action designed to correct deficiencies",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CA.L2-3.12.3",
    description:
      "Monitor information system security controls on an ongoing basis",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "CA.L2-3.12.4",
    description:
      "Develop, document, and periodically update system security plans",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  // System and Communications
  {
    id: "SC.L1-3.13.1",
    description:
      "Monitor, control, and protect organizational communications at the external boundaries",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L1-3.13.5",
    description:
      "Implement subnetworks for publicly accessible system components",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.2",
    description:
      "Employ architectural designs, software development techniques, and systems engineering principles that promote information security",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SC.L2-3.13.3",
    description:
      "Separate user functionality from system management functionality",
    standard: Standard.CMMC,
    family: ControlFamily.Access_Control,
  },
  {
    id: "SC.L2-3.13.4",
    description:
      "Prevent unauthorized and unintended information transfer via shared system resources",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.6",
    description:
      "Deny network communications traffic by default; allow network communications traffic by exception",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.7",
    description:
      "Prevent remote devices from simultaneously using non-remote connections with the system",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.8",
    description:
      "Implement cryptographic mechanisms to prevent unauthorized disclosure of CUI during transmission",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  {
    id: "SC.L2-3.13.9",
    description:
      "Terminate network connections after a defined period of inactivity",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.10",
    description:
      "Establish and manage cryptographic keys for cryptography employed in organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  {
    id: "SC.L2-3.13.11",
    description:
      "Employ FIPS-validated cryptography when used to protect the confidentiality of CUI",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  {
    id: "SC.L2-3.13.12",
    description:
      "Prohibit remote activation of collaborative computing devices and provide indication of use to present users",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.13",
    description: "Control and monitor the use of mobile code",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SC.L2-3.13.14",
    description: "Control and monitor the use of VoIP technologies",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.15",
    description: "Protect the authenticity of communications sessions",
    standard: Standard.CMMC,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "SC.L2-3.13.16",
    description: "Protect CUI at rest",
    standard: Standard.CMMC,
    family: ControlFamily.Cryptography,
  },
  // System Integrity
  {
    id: "SI.L1-3.14.1",
    description:
      "Identify, report, and correct information and information system flaws in a timely manner",
    standard: Standard.CMMC,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "SI.L1-3.14.2",
    description:
      "Provide protection from malicious code at appropriate locations within organizational information systems",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SI.L1-3.14.3",
    description:
      "Monitor system security alerts and advisories and take action in response",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "SI.L2-3.14.4",
    description:
      "Update malicious code protection mechanisms when new releases are available",
    standard: Standard.CMMC,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "SI.L2-3.14.5",
    description:
      "Perform periodic scans of organizational systems and real-time scans of files",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "SI.L2-3.14.6",
    description:
      "Monitor organizational systems, including inbound and outbound communications traffic, to detect attacks",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "SI.L2-3.14.7",
    description: "Identify unauthorized use of organizational systems",
    standard: Standard.CMMC,
    family: ControlFamily.Continuous_Monitoring,
  },

  // ── NERC CIP ──────────────────────────────────────────────
  {
    id: "CIP-002-5.1",
    description:
      "BES Cyber System Categorization — Identify and categorize BES Cyber Systems and their associated BES Cyber Assets",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "CIP-002-5.1a",
    description:
      "BES Cyber System Categorization — Identify and categorize Protected Cyber Assets and Electronic Access Control or Monitoring Systems",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "CIP-003-8.R1",
    description: "Security Management Controls — Cyber security policy",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CIP-003-8.R2",
    description:
      "Security Management Controls — Leadership and governance for low impact BES Cyber Systems",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-003-8.R3",
    description: "Security Management Controls — Delegation of authority",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-003-8.R4",
    description: "Security Management Controls — Physical I/O port controls",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-003-8.R5",
    description:
      "Security Management Controls — Transient Cyber Assets and Removable Media",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "CIP-004-6.R1",
    description: "Personnel and Training — Security awareness program",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-004-6.R2",
    description: "Personnel and Training — Cyber security training program",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-004-6.R3",
    description: "Personnel and Training — Personnel risk assessment program",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-004-6.R4",
    description: "Personnel and Training — Access management program",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CIP-004-6.R5",
    description: "Personnel and Training — Access revocation",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CIP-005-6.R1",
    description:
      "Electronic Security Perimeters — Electronic Security Perimeter",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Communications_Security,
  },
  {
    id: "CIP-005-6.R2",
    description: "Electronic Security Perimeters — Remote access management",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CIP-006-6.R1",
    description:
      "Physical Security of BES Cyber Systems — Physical security plan",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-006-6.R2",
    description:
      "Physical Security of BES Cyber Systems — Protection of Physical Access Control Systems",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-006-6.R3",
    description:
      "Physical Security of BES Cyber Systems — Visitor control program",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-007-6.R1",
    description: "Systems Security Management — Ports and services",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-007-6.R2",
    description: "Systems Security Management — Security patch management",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-007-6.R3",
    description: "Systems Security Management — Malicious code prevention",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-007-6.R4",
    description: "Systems Security Management — Security event monitoring",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "CIP-007-6.R5",
    description: "Systems Security Management — System access controls",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Access_Control,
  },
  {
    id: "CIP-008-6.R1",
    description:
      "Incident Reporting and Response Planning — Incident response plan",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CIP-008-6.R2",
    description:
      "Incident Reporting and Response Planning — Incident response plan implementation and testing",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CIP-008-6.R3",
    description:
      "Incident Reporting and Response Planning — Incident response plan review, update, and communication",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CIP-009-6.R1",
    description:
      "Recovery Plans for BES Cyber Systems — Recovery plan specification",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-009-6.R2",
    description:
      "Recovery Plans for BES Cyber Systems — Recovery plan implementation and testing",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-009-6.R3",
    description:
      "Recovery Plans for BES Cyber Systems — Recovery plan review, update, and communication",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-010-3.R1",
    description:
      "Configuration Change Management and Vulnerability Assessments — Configuration change management",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-010-3.R2",
    description:
      "Configuration Change Management and Vulnerability Assessments — Configuration monitoring",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Continuous_Monitoring,
  },
  {
    id: "CIP-010-3.R3",
    description:
      "Configuration Change Management and Vulnerability Assessments — Vulnerability management",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Security_Assessment,
  },
  {
    id: "CIP-010-3.R4",
    description:
      "Configuration Change Management and Vulnerability Assessments — Transient Cyber Assets and Removable Media",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "CIP-011-2.R1",
    description: "Information Protection — Information protection program",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "CIP-011-2.R2",
    description: "Information Protection — BES Cyber Asset reuse and disposal",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Asset_Management,
  },
  {
    id: "CIP-013-1.R1",
    description:
      "Supply Chain Risk Management — Supply chain cybersecurity risk management plan",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-013-1.R2",
    description:
      "Supply Chain Risk Management — Implement supply chain risk management plan",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-013-1.R3",
    description:
      "Supply Chain Risk Management — Review and update supply chain risk management plan",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Operations_Security,
  },
  {
    id: "CIP-014-2.R1",
    description:
      "Physical Security — Transmission stations and substations risk assessment",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-014-2.R2",
    description:
      "Physical Security — Unaffiliated third party verification of risk assessment",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-014-2.R3",
    description:
      "Physical Security — Notify owners/operators of identified substations",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-014-2.R4",
    description: "Physical Security — Evaluate and respond to notifications",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-014-2.R5",
    description:
      "Physical Security — Develop and implement a physical security plan",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
  {
    id: "CIP-014-2.R6",
    description:
      "Physical Security — Third-party review of physical security plan",
    standard: Standard.NERC_CIP,
    family: ControlFamily.Physical_Security,
  },
];

// ── Mock Crosswalk Mappings ────────────────────────────────────

type M = CrosswalkMapping;
const mk = (sId: string, sSt: Standard, tId: string, tSt: Standard): M => ({
  sourceControlId: sId,
  sourceStandard: sSt,
  targetControlId: tId,
  targetStandard: tSt,
});

export const mockCrosswalkMappings: CrosswalkMapping[] = [
  // ════════════════════════════════════════════════
  // IEC 62443 → NIST CSF
  // ════════════════════════════════════════════════
  mk("SR-1.1", Standard.IEC62443, "PR.AC-1", Standard.NIST_CSF),
  mk("SR-1.1", Standard.IEC62443, "PR.AC-7", Standard.NIST_CSF),
  mk("SR-1.2", Standard.IEC62443, "PR.AC-1", Standard.NIST_CSF),
  mk("SR-1.2", Standard.IEC62443, "PR.AC-6", Standard.NIST_CSF),
  mk("SR-1.3", Standard.IEC62443, "PR.AC-1", Standard.NIST_CSF),
  mk("SR-1.4", Standard.IEC62443, "PR.AC-1", Standard.NIST_CSF),
  mk("SR-1.5", Standard.IEC62443, "PR.AC-1", Standard.NIST_CSF),
  mk("SR-1.6", Standard.IEC62443, "PR.AC-3", Standard.NIST_CSF),
  mk("SR-1.7", Standard.IEC62443, "PR.AC-1", Standard.NIST_CSF),
  mk("SR-1.8", Standard.IEC62443, "PR.AC-7", Standard.NIST_CSF),
  mk("SR-1.9", Standard.IEC62443, "PR.AC-7", Standard.NIST_CSF),
  mk("SR-1.11", Standard.IEC62443, "PR.AC-7", Standard.NIST_CSF),
  mk("SR-1.13", Standard.IEC62443, "PR.AC-3", Standard.NIST_CSF),
  mk("SR-2.1", Standard.IEC62443, "PR.AC-4", Standard.NIST_CSF),
  mk("SR-2.1", Standard.IEC62443, "PR.AC-3", Standard.NIST_CSF),
  mk("SR-2.3", Standard.IEC62443, "PR.AC-4", Standard.NIST_CSF),
  mk("SR-2.4", Standard.IEC62443, "DE.CM-5", Standard.NIST_CSF),
  mk("SR-3.1", Standard.IEC62443, "PR.DS-2", Standard.NIST_CSF),
  mk("SR-3.1", Standard.IEC62443, "DE.CM-1", Standard.NIST_CSF),
  mk("SR-3.2", Standard.IEC62443, "DE.CM-4", Standard.NIST_CSF),
  mk("SR-3.2", Standard.IEC62443, "PR.IP-12", Standard.NIST_CSF),
  mk("SR-3.3", Standard.IEC62443, "DE.DP-3", Standard.NIST_CSF),
  mk("SR-3.4", Standard.IEC62443, "PR.DS-6", Standard.NIST_CSF),
  mk("SR-3.5", Standard.IEC62443, "PR.DS-6", Standard.NIST_CSF),
  mk("SR-4.1", Standard.IEC62443, "PR.DS-1", Standard.NIST_CSF),
  mk("SR-4.1", Standard.IEC62443, "PR.DS-5", Standard.NIST_CSF),
  mk("SR-4.2", Standard.IEC62443, "PR.IP-6", Standard.NIST_CSF),
  mk("SR-5.1", Standard.IEC62443, "PR.AC-5", Standard.NIST_CSF),
  mk("SR-5.2", Standard.IEC62443, "PR.AC-5", Standard.NIST_CSF),
  mk("SR-5.4", Standard.IEC62443, "PR.AC-5", Standard.NIST_CSF),
  mk("SR-6.1", Standard.IEC62443, "PR.PT-1", Standard.NIST_CSF),
  mk("SR-6.1", Standard.IEC62443, "DE.CM-1", Standard.NIST_CSF),
  mk("SR-6.2", Standard.IEC62443, "DE.CM-3", Standard.NIST_CSF),
  mk("SR-7.1", Standard.IEC62443, "PR.DS-4", Standard.NIST_CSF),
  mk("SR-7.2", Standard.IEC62443, "PR.DS-4", Standard.NIST_CSF),
  mk("SR-7.3", Standard.IEC62443, "PR.IP-4", Standard.NIST_CSF),
  mk("SR-7.4", Standard.IEC62443, "RC.RP-1", Standard.NIST_CSF),
  mk("SR-7.6", Standard.IEC62443, "PR.IP-1", Standard.NIST_CSF),
  mk("SR-7.7", Standard.IEC62443, "PR.PT-3", Standard.NIST_CSF),
  mk("SR-7.8", Standard.IEC62443, "ID.AM-1", Standard.NIST_CSF),

  // ════════════════════════════════════════════════
  // IEC 62443 → ISO 27001
  // ════════════════════════════════════════════════
  mk("SR-1.1", Standard.IEC62443, "A.9.1.1", Standard.ISO27001),
  mk("SR-1.1", Standard.IEC62443, "A.9.4.2", Standard.ISO27001),
  mk("SR-1.2", Standard.IEC62443, "A.9.4.2", Standard.ISO27001),
  mk("SR-1.3", Standard.IEC62443, "A.9.2.1", Standard.ISO27001),
  mk("SR-1.3", Standard.IEC62443, "A.9.2.2", Standard.ISO27001),
  mk("SR-1.4", Standard.IEC62443, "A.9.2.4", Standard.ISO27001),
  mk("SR-1.5", Standard.IEC62443, "A.9.2.4", Standard.ISO27001),
  mk("SR-1.7", Standard.IEC62443, "A.9.4.3", Standard.ISO27001),
  mk("SR-1.8", Standard.IEC62443, "A.9.4.3", Standard.ISO27001),
  mk("SR-1.11", Standard.IEC62443, "A.9.4.2", Standard.ISO27001),
  mk("SR-1.13", Standard.IEC62443, "A.6.2.2", Standard.ISO27001),
  mk("SR-2.1", Standard.IEC62443, "A.9.1.2", Standard.ISO27001),
  mk("SR-2.1", Standard.IEC62443, "A.9.4.1", Standard.ISO27001),
  mk("SR-2.3", Standard.IEC62443, "A.6.2.1", Standard.ISO27001),
  mk("SR-3.1", Standard.IEC62443, "A.13.1.1", Standard.ISO27001),
  mk("SR-3.1", Standard.IEC62443, "A.13.2.1", Standard.ISO27001),
  mk("SR-3.2", Standard.IEC62443, "A.12.2.1", Standard.ISO27001),
  mk("SR-3.3", Standard.IEC62443, "A.14.2.8", Standard.ISO27001),
  mk("SR-3.4", Standard.IEC62443, "A.12.5.1", Standard.ISO27001),
  mk("SR-4.1", Standard.IEC62443, "A.10.1.1", Standard.ISO27001),
  mk("SR-4.2", Standard.IEC62443, "A.11.2.7", Standard.ISO27001),
  mk("SR-5.1", Standard.IEC62443, "A.13.1.3", Standard.ISO27001),
  mk("SR-5.2", Standard.IEC62443, "A.13.1.3", Standard.ISO27001),
  mk("SR-5.3", Standard.IEC62443, "A.13.1.3", Standard.ISO27001),
  mk("SR-6.1", Standard.IEC62443, "A.12.4.1", Standard.ISO27001),
  mk("SR-6.1", Standard.IEC62443, "A.12.4.2", Standard.ISO27001),
  mk("SR-6.2", Standard.IEC62443, "A.12.4.1", Standard.ISO27001),
  mk("SR-7.1", Standard.IEC62443, "A.12.1.3", Standard.ISO27001),
  mk("SR-7.3", Standard.IEC62443, "A.12.3.1", Standard.ISO27001),
  mk("SR-7.4", Standard.IEC62443, "A.17.1.2", Standard.ISO27001),
  mk("SR-7.7", Standard.IEC62443, "A.9.4.4", Standard.ISO27001),
  mk("SR-7.8", Standard.IEC62443, "A.8.1.1", Standard.ISO27001),

  // ════════════════════════════════════════════════
  // IEC 62443 → SOC 2
  // ════════════════════════════════════════════════
  mk("SR-1.1", Standard.IEC62443, "CC6.1", Standard.SOC2),
  mk("SR-1.1", Standard.IEC62443, "CC6.6", Standard.SOC2),
  mk("SR-1.2", Standard.IEC62443, "CC6.1", Standard.SOC2),
  mk("SR-1.3", Standard.IEC62443, "CC6.2", Standard.SOC2),
  mk("SR-1.3", Standard.IEC62443, "CC6.3", Standard.SOC2),
  mk("SR-1.7", Standard.IEC62443, "CC6.1", Standard.SOC2),
  mk("SR-2.1", Standard.IEC62443, "CC6.1", Standard.SOC2),
  mk("SR-2.1", Standard.IEC62443, "CC6.3", Standard.SOC2),
  mk("SR-3.2", Standard.IEC62443, "CC6.8", Standard.SOC2),
  mk("SR-3.2", Standard.IEC62443, "CC7.1", Standard.SOC2),
  mk("SR-3.4", Standard.IEC62443, "CC7.1", Standard.SOC2),
  mk("SR-4.1", Standard.IEC62443, "C1.1", Standard.SOC2),
  mk("SR-4.1", Standard.IEC62443, "CC6.7", Standard.SOC2),
  mk("SR-5.1", Standard.IEC62443, "CC6.6", Standard.SOC2),
  mk("SR-5.2", Standard.IEC62443, "CC6.6", Standard.SOC2),
  mk("SR-6.1", Standard.IEC62443, "CC7.2", Standard.SOC2),
  mk("SR-6.2", Standard.IEC62443, "CC7.2", Standard.SOC2),
  mk("SR-7.1", Standard.IEC62443, "A1.1", Standard.SOC2),
  mk("SR-7.3", Standard.IEC62443, "A1.2", Standard.SOC2),
  mk("SR-7.4", Standard.IEC62443, "A1.3", Standard.SOC2),
  mk("SR-7.6", Standard.IEC62443, "CC8.1", Standard.SOC2),
  mk("SR-7.8", Standard.IEC62443, "CC5.2", Standard.SOC2),

  // ════════════════════════════════════════════════
  // IEC 62443 → CMMC
  // ════════════════════════════════════════════════
  mk("SR-1.1", Standard.IEC62443, "AC.L1-3.1.1", Standard.CMMC),
  mk("SR-1.1", Standard.IEC62443, "IA.L1-3.5.2", Standard.CMMC),
  mk("SR-1.2", Standard.IEC62443, "IA.L1-3.5.1", Standard.CMMC),
  mk("SR-1.3", Standard.IEC62443, "IA.L2-3.5.5", Standard.CMMC),
  mk("SR-1.4", Standard.IEC62443, "IA.L2-3.5.6", Standard.CMMC),
  mk("SR-1.5", Standard.IEC62443, "IA.L2-3.5.7", Standard.CMMC),
  mk("SR-1.6", Standard.IEC62443, "AC.L2-3.1.16", Standard.CMMC),
  mk("SR-1.7", Standard.IEC62443, "IA.L2-3.5.7", Standard.CMMC),
  mk("SR-1.11", Standard.IEC62443, "AC.L2-3.1.8", Standard.CMMC),
  mk("SR-1.13", Standard.IEC62443, "AC.L2-3.1.12", Standard.CMMC),
  mk("SR-2.1", Standard.IEC62443, "AC.L1-3.1.2", Standard.CMMC),
  mk("SR-2.1", Standard.IEC62443, "AC.L2-3.1.5", Standard.CMMC),
  mk("SR-2.3", Standard.IEC62443, "AC.L2-3.1.18", Standard.CMMC),
  mk("SR-3.1", Standard.IEC62443, "SC.L1-3.13.1", Standard.CMMC),
  mk("SR-3.2", Standard.IEC62443, "SI.L1-3.14.2", Standard.CMMC),
  mk("SR-3.3", Standard.IEC62443, "CA.L2-3.12.1", Standard.CMMC),
  mk("SR-3.4", Standard.IEC62443, "SI.L1-3.14.1", Standard.CMMC),
  mk("SR-4.1", Standard.IEC62443, "SC.L2-3.13.8", Standard.CMMC),
  mk("SR-4.1", Standard.IEC62443, "SC.L2-3.13.16", Standard.CMMC),
  mk("SR-4.2", Standard.IEC62443, "MP.L1-3.8.3", Standard.CMMC),
  mk("SR-5.1", Standard.IEC62443, "SC.L1-3.13.5", Standard.CMMC),
  mk("SR-5.2", Standard.IEC62443, "SC.L2-3.13.4", Standard.CMMC),
  mk("SR-5.4", Standard.IEC62443, "SC.L2-3.13.3", Standard.CMMC),
  mk("SR-6.1", Standard.IEC62443, "AU.L2-3.3.1", Standard.CMMC),
  mk("SR-6.2", Standard.IEC62443, "SI.L2-3.14.6", Standard.CMMC),
  mk("SR-7.1", Standard.IEC62443, "SC.L1-3.13.1", Standard.CMMC),
  mk("SR-7.3", Standard.IEC62443, "MP.L2-3.8.9", Standard.CMMC),
  mk("SR-7.6", Standard.IEC62443, "CM.L2-3.4.1", Standard.CMMC),
  mk("SR-7.7", Standard.IEC62443, "CM.L2-3.4.6", Standard.CMMC),
  mk("SR-7.8", Standard.IEC62443, "CM.L2-3.4.1", Standard.CMMC),

  // ════════════════════════════════════════════════
  // IEC 62443 → NERC CIP
  // ════════════════════════════════════════════════
  mk("SR-1.1", Standard.IEC62443, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("SR-1.3", Standard.IEC62443, "CIP-004-6.R4", Standard.NERC_CIP),
  mk("SR-1.3", Standard.IEC62443, "CIP-004-6.R5", Standard.NERC_CIP),
  mk("SR-1.6", Standard.IEC62443, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("SR-1.13", Standard.IEC62443, "CIP-005-6.R2", Standard.NERC_CIP),
  mk("SR-2.1", Standard.IEC62443, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("SR-3.2", Standard.IEC62443, "CIP-007-6.R3", Standard.NERC_CIP),
  mk("SR-3.4", Standard.IEC62443, "CIP-007-6.R2", Standard.NERC_CIP),
  mk("SR-4.1", Standard.IEC62443, "CIP-011-2.R1", Standard.NERC_CIP),
  mk("SR-5.1", Standard.IEC62443, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("SR-5.2", Standard.IEC62443, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("SR-6.1", Standard.IEC62443, "CIP-007-6.R4", Standard.NERC_CIP),
  mk("SR-6.2", Standard.IEC62443, "CIP-010-3.R2", Standard.NERC_CIP),
  mk("SR-7.1", Standard.IEC62443, "CIP-007-6.R1", Standard.NERC_CIP),
  mk("SR-7.3", Standard.IEC62443, "CIP-009-6.R1", Standard.NERC_CIP),
  mk("SR-7.4", Standard.IEC62443, "CIP-009-6.R2", Standard.NERC_CIP),
  mk("SR-7.6", Standard.IEC62443, "CIP-010-3.R1", Standard.NERC_CIP),
  mk("SR-7.8", Standard.IEC62443, "CIP-002-5.1", Standard.NERC_CIP),

  // ════════════════════════════════════════════════
  // NIST CSF → ISO 27001
  // ════════════════════════════════════════════════
  mk("ID.AM-1", Standard.NIST_CSF, "A.8.1.1", Standard.ISO27001),
  mk("ID.AM-2", Standard.NIST_CSF, "A.8.1.1", Standard.ISO27001),
  mk("ID.AM-3", Standard.NIST_CSF, "A.8.1.1", Standard.ISO27001),
  mk("ID.AM-5", Standard.NIST_CSF, "A.8.2.1", Standard.ISO27001),
  mk("ID.AM-6", Standard.NIST_CSF, "A.6.1.1", Standard.ISO27001),
  mk("ID.GV-1", Standard.NIST_CSF, "A.5.1.1", Standard.ISO27001),
  mk("ID.GV-2", Standard.NIST_CSF, "A.6.1.1", Standard.ISO27001),
  mk("ID.GV-3", Standard.NIST_CSF, "A.18.1.1", Standard.ISO27001),
  mk("ID.RA-1", Standard.NIST_CSF, "A.12.6.1", Standard.ISO27001),
  mk("ID.RA-3", Standard.NIST_CSF, "A.12.6.1", Standard.ISO27001),
  mk("PR.AC-1", Standard.NIST_CSF, "A.9.1.1", Standard.ISO27001),
  mk("PR.AC-1", Standard.NIST_CSF, "A.9.2.1", Standard.ISO27001),
  mk("PR.AC-2", Standard.NIST_CSF, "A.11.1.2", Standard.ISO27001),
  mk("PR.AC-3", Standard.NIST_CSF, "A.6.2.2", Standard.ISO27001),
  mk("PR.AC-4", Standard.NIST_CSF, "A.9.2.3", Standard.ISO27001),
  mk("PR.AC-5", Standard.NIST_CSF, "A.13.1.3", Standard.ISO27001),
  mk("PR.AC-6", Standard.NIST_CSF, "A.9.4.2", Standard.ISO27001),
  mk("PR.AC-7", Standard.NIST_CSF, "A.9.4.2", Standard.ISO27001),
  mk("PR.AT-1", Standard.NIST_CSF, "A.7.2.2", Standard.ISO27001),
  mk("PR.DS-1", Standard.NIST_CSF, "A.10.1.1", Standard.ISO27001),
  mk("PR.DS-2", Standard.NIST_CSF, "A.13.2.1", Standard.ISO27001),
  mk("PR.DS-5", Standard.NIST_CSF, "A.13.1.1", Standard.ISO27001),
  mk("PR.DS-6", Standard.NIST_CSF, "A.14.2.4", Standard.ISO27001),
  mk("PR.IP-1", Standard.NIST_CSF, "A.12.1.1", Standard.ISO27001),
  mk("PR.IP-3", Standard.NIST_CSF, "A.12.1.2", Standard.ISO27001),
  mk("PR.IP-4", Standard.NIST_CSF, "A.12.3.1", Standard.ISO27001),
  mk("PR.IP-9", Standard.NIST_CSF, "A.17.1.1", Standard.ISO27001),
  mk("PR.IP-10", Standard.NIST_CSF, "A.17.1.3", Standard.ISO27001),
  mk("PR.IP-12", Standard.NIST_CSF, "A.12.6.1", Standard.ISO27001),
  mk("PR.PT-1", Standard.NIST_CSF, "A.12.4.1", Standard.ISO27001),
  mk("PR.PT-4", Standard.NIST_CSF, "A.13.1.1", Standard.ISO27001),
  mk("DE.AE-1", Standard.NIST_CSF, "A.12.4.1", Standard.ISO27001),
  mk("DE.CM-1", Standard.NIST_CSF, "A.12.4.1", Standard.ISO27001),
  mk("DE.CM-4", Standard.NIST_CSF, "A.12.2.1", Standard.ISO27001),
  mk("DE.CM-7", Standard.NIST_CSF, "A.12.4.3", Standard.ISO27001),
  mk("DE.CM-8", Standard.NIST_CSF, "A.12.6.1", Standard.ISO27001),
  mk("RS.RP-1", Standard.NIST_CSF, "A.16.1.5", Standard.ISO27001),
  mk("RS.CO-2", Standard.NIST_CSF, "A.16.1.2", Standard.ISO27001),
  mk("RS.AN-1", Standard.NIST_CSF, "A.16.1.4", Standard.ISO27001),
  mk("RS.AN-3", Standard.NIST_CSF, "A.16.1.7", Standard.ISO27001),
  mk("RC.RP-1", Standard.NIST_CSF, "A.17.1.2", Standard.ISO27001),
  mk("RC.IM-1", Standard.NIST_CSF, "A.16.1.6", Standard.ISO27001),

  // ════════════════════════════════════════════════
  // NIST CSF → SOC 2
  // ════════════════════════════════════════════════
  mk("ID.AM-1", Standard.NIST_CSF, "CC5.2", Standard.SOC2),
  mk("ID.GV-1", Standard.NIST_CSF, "CC1.1", Standard.SOC2),
  mk("ID.GV-4", Standard.NIST_CSF, "CC3.2", Standard.SOC2),
  mk("ID.RA-1", Standard.NIST_CSF, "CC3.2", Standard.SOC2),
  mk("ID.RA-5", Standard.NIST_CSF, "CC3.3", Standard.SOC2),
  mk("PR.AC-1", Standard.NIST_CSF, "CC6.1", Standard.SOC2),
  mk("PR.AC-1", Standard.NIST_CSF, "CC6.2", Standard.SOC2),
  mk("PR.AC-2", Standard.NIST_CSF, "CC6.4", Standard.SOC2),
  mk("PR.AC-3", Standard.NIST_CSF, "CC6.6", Standard.SOC2),
  mk("PR.AC-4", Standard.NIST_CSF, "CC6.3", Standard.SOC2),
  mk("PR.AC-7", Standard.NIST_CSF, "CC6.1", Standard.SOC2),
  mk("PR.DS-1", Standard.NIST_CSF, "C1.1", Standard.SOC2),
  mk("PR.DS-2", Standard.NIST_CSF, "CC6.7", Standard.SOC2),
  mk("PR.DS-4", Standard.NIST_CSF, "A1.1", Standard.SOC2),
  mk("PR.IP-1", Standard.NIST_CSF, "CC5.2", Standard.SOC2),
  mk("PR.IP-3", Standard.NIST_CSF, "CC8.1", Standard.SOC2),
  mk("PR.IP-4", Standard.NIST_CSF, "A1.2", Standard.SOC2),
  mk("PR.IP-12", Standard.NIST_CSF, "CC7.1", Standard.SOC2),
  mk("DE.AE-3", Standard.NIST_CSF, "CC4.1", Standard.SOC2),
  mk("DE.CM-1", Standard.NIST_CSF, "CC7.2", Standard.SOC2),
  mk("DE.CM-4", Standard.NIST_CSF, "CC6.8", Standard.SOC2),
  mk("DE.CM-7", Standard.NIST_CSF, "CC7.2", Standard.SOC2),
  mk("DE.CM-8", Standard.NIST_CSF, "CC7.1", Standard.SOC2),
  mk("RS.RP-1", Standard.NIST_CSF, "CC7.4", Standard.SOC2),
  mk("RS.AN-1", Standard.NIST_CSF, "CC7.3", Standard.SOC2),
  mk("RC.RP-1", Standard.NIST_CSF, "CC7.5", Standard.SOC2),
  mk("RC.IM-1", Standard.NIST_CSF, "A1.3", Standard.SOC2),

  // ════════════════════════════════════════════════
  // NIST CSF → CMMC
  // ════════════════════════════════════════════════
  mk("ID.AM-1", Standard.NIST_CSF, "CM.L2-3.4.1", Standard.CMMC),
  mk("ID.AM-2", Standard.NIST_CSF, "CM.L2-3.4.1", Standard.CMMC),
  mk("ID.RA-1", Standard.NIST_CSF, "RA.L2-3.11.2", Standard.CMMC),
  mk("ID.RA-5", Standard.NIST_CSF, "RA.L2-3.11.1", Standard.CMMC),
  mk("ID.GV-1", Standard.NIST_CSF, "CA.L2-3.12.4", Standard.CMMC),
  mk("PR.AC-1", Standard.NIST_CSF, "AC.L1-3.1.1", Standard.CMMC),
  mk("PR.AC-3", Standard.NIST_CSF, "AC.L2-3.1.12", Standard.CMMC),
  mk("PR.AC-4", Standard.NIST_CSF, "AC.L2-3.1.5", Standard.CMMC),
  mk("PR.AC-5", Standard.NIST_CSF, "SC.L1-3.13.5", Standard.CMMC),
  mk("PR.AC-7", Standard.NIST_CSF, "IA.L2-3.5.3", Standard.CMMC),
  mk("PR.DS-1", Standard.NIST_CSF, "SC.L2-3.13.16", Standard.CMMC),
  mk("PR.DS-2", Standard.NIST_CSF, "SC.L2-3.13.8", Standard.CMMC),
  mk("PR.IP-1", Standard.NIST_CSF, "CM.L2-3.4.1", Standard.CMMC),
  mk("PR.IP-3", Standard.NIST_CSF, "CM.L2-3.4.3", Standard.CMMC),
  mk("PR.IP-4", Standard.NIST_CSF, "MP.L2-3.8.9", Standard.CMMC),
  mk("PR.IP-12", Standard.NIST_CSF, "RA.L2-3.11.3", Standard.CMMC),
  mk("PR.PT-1", Standard.NIST_CSF, "AU.L2-3.3.1", Standard.CMMC),
  mk("DE.CM-1", Standard.NIST_CSF, "SI.L2-3.14.6", Standard.CMMC),
  mk("DE.CM-4", Standard.NIST_CSF, "SI.L1-3.14.2", Standard.CMMC),
  mk("DE.CM-7", Standard.NIST_CSF, "SI.L2-3.14.7", Standard.CMMC),
  mk("RS.RP-1", Standard.NIST_CSF, "IR.L2-3.6.1", Standard.CMMC),
  mk("RS.CO-2", Standard.NIST_CSF, "IR.L2-3.6.2", Standard.CMMC),
  mk("RC.RP-1", Standard.NIST_CSF, "IR.L2-3.6.1", Standard.CMMC),

  // ════════════════════════════════════════════════
  // NIST CSF → NERC CIP
  // ════════════════════════════════════════════════
  mk("ID.AM-1", Standard.NIST_CSF, "CIP-002-5.1", Standard.NERC_CIP),
  mk("ID.AM-2", Standard.NIST_CSF, "CIP-002-5.1", Standard.NERC_CIP),
  mk("ID.GV-1", Standard.NIST_CSF, "CIP-003-8.R1", Standard.NERC_CIP),
  mk("ID.RA-1", Standard.NIST_CSF, "CIP-010-3.R3", Standard.NERC_CIP),
  mk("PR.AC-1", Standard.NIST_CSF, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("PR.AC-2", Standard.NIST_CSF, "CIP-006-6.R1", Standard.NERC_CIP),
  mk("PR.AC-3", Standard.NIST_CSF, "CIP-005-6.R2", Standard.NERC_CIP),
  mk("PR.AC-5", Standard.NIST_CSF, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("PR.AT-1", Standard.NIST_CSF, "CIP-004-6.R2", Standard.NERC_CIP),
  mk("PR.IP-1", Standard.NIST_CSF, "CIP-010-3.R1", Standard.NERC_CIP),
  mk("PR.IP-3", Standard.NIST_CSF, "CIP-010-3.R1", Standard.NERC_CIP),
  mk("PR.IP-4", Standard.NIST_CSF, "CIP-009-6.R1", Standard.NERC_CIP),
  mk("DE.CM-1", Standard.NIST_CSF, "CIP-007-6.R4", Standard.NERC_CIP),
  mk("DE.CM-4", Standard.NIST_CSF, "CIP-007-6.R3", Standard.NERC_CIP),
  mk("DE.CM-7", Standard.NIST_CSF, "CIP-010-3.R2", Standard.NERC_CIP),
  mk("RS.RP-1", Standard.NIST_CSF, "CIP-008-6.R1", Standard.NERC_CIP),
  mk("RS.CO-2", Standard.NIST_CSF, "CIP-008-6.R1", Standard.NERC_CIP),
  mk("RC.RP-1", Standard.NIST_CSF, "CIP-009-6.R2", Standard.NERC_CIP),

  // ════════════════════════════════════════════════
  // ISO 27001 → SOC 2
  // ════════════════════════════════════════════════
  mk("A.5.1.1", Standard.ISO27001, "CC1.1", Standard.SOC2),
  mk("A.5.1.2", Standard.ISO27001, "CC1.2", Standard.SOC2),
  mk("A.6.1.1", Standard.ISO27001, "CC1.3", Standard.SOC2),
  mk("A.6.1.2", Standard.ISO27001, "CC6.3", Standard.SOC2),
  mk("A.8.1.1", Standard.ISO27001, "CC5.2", Standard.SOC2),
  mk("A.8.2.1", Standard.ISO27001, "CC3.1", Standard.SOC2),
  mk("A.9.1.1", Standard.ISO27001, "CC6.1", Standard.SOC2),
  mk("A.9.2.1", Standard.ISO27001, "CC6.2", Standard.SOC2),
  mk("A.9.2.3", Standard.ISO27001, "CC6.3", Standard.SOC2),
  mk("A.9.2.5", Standard.ISO27001, "CC4.1", Standard.SOC2),
  mk("A.9.4.1", Standard.ISO27001, "CC6.1", Standard.SOC2),
  mk("A.10.1.1", Standard.ISO27001, "C1.1", Standard.SOC2),
  mk("A.10.1.2", Standard.ISO27001, "C1.2", Standard.SOC2),
  mk("A.11.1.1", Standard.ISO27001, "CC6.4", Standard.SOC2),
  mk("A.11.1.2", Standard.ISO27001, "CC6.4", Standard.SOC2),
  mk("A.12.1.2", Standard.ISO27001, "CC8.1", Standard.SOC2),
  mk("A.12.2.1", Standard.ISO27001, "CC6.8", Standard.SOC2),
  mk("A.12.4.1", Standard.ISO27001, "CC7.2", Standard.SOC2),
  mk("A.12.6.1", Standard.ISO27001, "CC7.1", Standard.SOC2),
  mk("A.13.1.3", Standard.ISO27001, "CC6.6", Standard.SOC2),
  mk("A.16.1.1", Standard.ISO27001, "CC7.3", Standard.SOC2),
  mk("A.16.1.5", Standard.ISO27001, "CC7.4", Standard.SOC2),
  mk("A.17.1.1", Standard.ISO27001, "A1.2", Standard.SOC2),
  mk("A.17.1.3", Standard.ISO27001, "A1.3", Standard.SOC2),
  mk("A.18.2.1", Standard.ISO27001, "CC4.1", Standard.SOC2),

  // ════════════════════════════════════════════════
  // ISO 27001 → CMMC
  // ════════════════════════════════════════════════
  mk("A.5.1.1", Standard.ISO27001, "CA.L2-3.12.4", Standard.CMMC),
  mk("A.8.1.1", Standard.ISO27001, "CM.L2-3.4.1", Standard.CMMC),
  mk("A.8.3.2", Standard.ISO27001, "MP.L1-3.8.3", Standard.CMMC),
  mk("A.9.1.1", Standard.ISO27001, "AC.L1-3.1.1", Standard.CMMC),
  mk("A.9.2.1", Standard.ISO27001, "IA.L1-3.5.1", Standard.CMMC),
  mk("A.9.2.3", Standard.ISO27001, "AC.L2-3.1.5", Standard.CMMC),
  mk("A.9.4.3", Standard.ISO27001, "IA.L2-3.5.7", Standard.CMMC),
  mk("A.10.1.1", Standard.ISO27001, "SC.L2-3.13.8", Standard.CMMC),
  mk("A.12.1.2", Standard.ISO27001, "CM.L2-3.4.3", Standard.CMMC),
  mk("A.12.2.1", Standard.ISO27001, "SI.L1-3.14.2", Standard.CMMC),
  mk("A.12.4.1", Standard.ISO27001, "AU.L2-3.3.1", Standard.CMMC),
  mk("A.12.6.1", Standard.ISO27001, "RA.L2-3.11.2", Standard.CMMC),
  mk("A.13.1.1", Standard.ISO27001, "SC.L1-3.13.1", Standard.CMMC),
  mk("A.13.1.3", Standard.ISO27001, "SC.L1-3.13.5", Standard.CMMC),
  mk("A.16.1.1", Standard.ISO27001, "IR.L2-3.6.1", Standard.CMMC),
  mk("A.16.1.2", Standard.ISO27001, "IR.L2-3.6.2", Standard.CMMC),
  mk("A.17.1.1", Standard.ISO27001, "IR.L2-3.6.1", Standard.CMMC),
  mk("A.18.2.2", Standard.ISO27001, "CA.L2-3.12.1", Standard.CMMC),

  // ════════════════════════════════════════════════
  // ISO 27001 → NERC CIP
  // ════════════════════════════════════════════════
  mk("A.5.1.1", Standard.ISO27001, "CIP-003-8.R1", Standard.NERC_CIP),
  mk("A.8.1.1", Standard.ISO27001, "CIP-002-5.1", Standard.NERC_CIP),
  mk("A.9.2.1", Standard.ISO27001, "CIP-004-6.R4", Standard.NERC_CIP),
  mk("A.9.2.6", Standard.ISO27001, "CIP-004-6.R5", Standard.NERC_CIP),
  mk("A.9.4.2", Standard.ISO27001, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("A.10.1.1", Standard.ISO27001, "CIP-011-2.R1", Standard.NERC_CIP),
  mk("A.11.1.1", Standard.ISO27001, "CIP-006-6.R1", Standard.NERC_CIP),
  mk("A.12.2.1", Standard.ISO27001, "CIP-007-6.R3", Standard.NERC_CIP),
  mk("A.12.4.1", Standard.ISO27001, "CIP-007-6.R4", Standard.NERC_CIP),
  mk("A.12.6.1", Standard.ISO27001, "CIP-010-3.R3", Standard.NERC_CIP),
  mk("A.13.1.1", Standard.ISO27001, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("A.14.2.2", Standard.ISO27001, "CIP-010-3.R1", Standard.NERC_CIP),
  mk("A.16.1.1", Standard.ISO27001, "CIP-008-6.R1", Standard.NERC_CIP),
  mk("A.17.1.1", Standard.ISO27001, "CIP-009-6.R1", Standard.NERC_CIP),
  mk("A.7.2.2", Standard.ISO27001, "CIP-004-6.R2", Standard.NERC_CIP),

  // ════════════════════════════════════════════════
  // SOC 2 → CMMC
  // ════════════════════════════════════════════════
  mk("CC1.1", Standard.SOC2, "CA.L2-3.12.4", Standard.CMMC),
  mk("CC3.2", Standard.SOC2, "RA.L2-3.11.1", Standard.CMMC),
  mk("CC4.1", Standard.SOC2, "CA.L2-3.12.3", Standard.CMMC),
  mk("CC6.1", Standard.SOC2, "AC.L1-3.1.1", Standard.CMMC),
  mk("CC6.2", Standard.SOC2, "IA.L1-3.5.1", Standard.CMMC),
  mk("CC6.3", Standard.SOC2, "AC.L2-3.1.3", Standard.CMMC),
  mk("CC6.6", Standard.SOC2, "SC.L1-3.13.1", Standard.CMMC),
  mk("CC6.7", Standard.SOC2, "SC.L2-3.13.8", Standard.CMMC),
  mk("CC6.8", Standard.SOC2, "SI.L1-3.14.2", Standard.CMMC),
  mk("CC7.1", Standard.SOC2, "RA.L2-3.11.2", Standard.CMMC),
  mk("CC7.2", Standard.SOC2, "SI.L2-3.14.6", Standard.CMMC),
  mk("CC7.3", Standard.SOC2, "IR.L2-3.6.1", Standard.CMMC),
  mk("CC7.4", Standard.SOC2, "IR.L2-3.6.1", Standard.CMMC),
  mk("CC8.1", Standard.SOC2, "CM.L2-3.4.3", Standard.CMMC),
  mk("CC9.2", Standard.SOC2, "CA.L2-3.12.1", Standard.CMMC),
  mk("A1.1", Standard.SOC2, "SC.L1-3.13.1", Standard.CMMC),
  mk("A1.2", Standard.SOC2, "MP.L2-3.8.9", Standard.CMMC),
  mk("C1.1", Standard.SOC2, "SC.L2-3.13.16", Standard.CMMC),

  // ════════════════════════════════════════════════
  // SOC 2 → NERC CIP
  // ════════════════════════════════════════════════
  mk("CC1.1", Standard.SOC2, "CIP-003-8.R1", Standard.NERC_CIP),
  mk("CC3.2", Standard.SOC2, "CIP-010-3.R3", Standard.NERC_CIP),
  mk("CC4.1", Standard.SOC2, "CIP-010-3.R2", Standard.NERC_CIP),
  mk("CC6.1", Standard.SOC2, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("CC6.2", Standard.SOC2, "CIP-004-6.R4", Standard.NERC_CIP),
  mk("CC6.4", Standard.SOC2, "CIP-006-6.R1", Standard.NERC_CIP),
  mk("CC6.6", Standard.SOC2, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("CC6.8", Standard.SOC2, "CIP-007-6.R3", Standard.NERC_CIP),
  mk("CC7.2", Standard.SOC2, "CIP-007-6.R4", Standard.NERC_CIP),
  mk("CC7.3", Standard.SOC2, "CIP-008-6.R1", Standard.NERC_CIP),
  mk("CC8.1", Standard.SOC2, "CIP-010-3.R1", Standard.NERC_CIP),
  mk("A1.2", Standard.SOC2, "CIP-009-6.R1", Standard.NERC_CIP),
  mk("A1.3", Standard.SOC2, "CIP-009-6.R2", Standard.NERC_CIP),

  // ════════════════════════════════════════════════
  // CMMC → NERC CIP
  // ════════════════════════════════════════════════
  mk("AC.L1-3.1.1", Standard.CMMC, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("AC.L1-3.1.2", Standard.CMMC, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("AC.L2-3.1.5", Standard.CMMC, "CIP-004-6.R4", Standard.NERC_CIP),
  mk("AC.L2-3.1.12", Standard.CMMC, "CIP-005-6.R2", Standard.NERC_CIP),
  mk("AC.L2-3.1.16", Standard.CMMC, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("AU.L2-3.3.1", Standard.CMMC, "CIP-007-6.R4", Standard.NERC_CIP),
  mk("CA.L2-3.12.1", Standard.CMMC, "CIP-010-3.R3", Standard.NERC_CIP),
  mk("CA.L2-3.12.3", Standard.CMMC, "CIP-010-3.R2", Standard.NERC_CIP),
  mk("CA.L2-3.12.4", Standard.CMMC, "CIP-003-8.R1", Standard.NERC_CIP),
  mk("CM.L2-3.4.1", Standard.CMMC, "CIP-010-3.R1", Standard.NERC_CIP),
  mk("CM.L2-3.4.1", Standard.CMMC, "CIP-002-5.1", Standard.NERC_CIP),
  mk("CM.L2-3.4.3", Standard.CMMC, "CIP-010-3.R1", Standard.NERC_CIP),
  mk("CM.L2-3.4.7", Standard.CMMC, "CIP-007-6.R1", Standard.NERC_CIP),
  mk("IA.L1-3.5.1", Standard.CMMC, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("IA.L2-3.5.3", Standard.CMMC, "CIP-007-6.R5", Standard.NERC_CIP),
  mk("IR.L2-3.6.1", Standard.CMMC, "CIP-008-6.R1", Standard.NERC_CIP),
  mk("IR.L2-3.6.2", Standard.CMMC, "CIP-008-6.R2", Standard.NERC_CIP),
  mk("MP.L1-3.8.1", Standard.CMMC, "CIP-011-2.R1", Standard.NERC_CIP),
  mk("MP.L1-3.8.3", Standard.CMMC, "CIP-011-2.R2", Standard.NERC_CIP),
  mk("PE.L1-3.10.1", Standard.CMMC, "CIP-006-6.R1", Standard.NERC_CIP),
  mk("PE.L1-3.10.4", Standard.CMMC, "CIP-006-6.R3", Standard.NERC_CIP),
  mk("PS.L2-3.9.1", Standard.CMMC, "CIP-004-6.R3", Standard.NERC_CIP),
  mk("RA.L2-3.11.2", Standard.CMMC, "CIP-010-3.R3", Standard.NERC_CIP),
  mk("SC.L1-3.13.1", Standard.CMMC, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("SC.L1-3.13.5", Standard.CMMC, "CIP-005-6.R1", Standard.NERC_CIP),
  mk("SC.L2-3.13.8", Standard.CMMC, "CIP-011-2.R1", Standard.NERC_CIP),
  mk("SI.L1-3.14.2", Standard.CMMC, "CIP-007-6.R3", Standard.NERC_CIP),
  mk("SI.L2-3.14.5", Standard.CMMC, "CIP-007-6.R3", Standard.NERC_CIP),
  mk("SI.L2-3.14.6", Standard.CMMC, "CIP-007-6.R4", Standard.NERC_CIP),
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
    totalControls: BigInt(42),
    compliantCount: BigInt(22),
    partialCount: BigInt(10),
    nonCompliantCount: BigInt(8),
    notApplicableCount: BigInt(2),
    compliancePercentage: 60,
  },
  [Standard.NIST_CSF]: {
    standard: Standard.NIST_CSF,
    totalControls: BigInt(58),
    compliantCount: BigInt(38),
    partialCount: BigInt(12),
    nonCompliantCount: BigInt(7),
    notApplicableCount: BigInt(1),
    compliancePercentage: 72,
  },
  [Standard.ISO27001]: {
    standard: Standard.ISO27001,
    totalControls: BigInt(114),
    compliantCount: BigInt(72),
    partialCount: BigInt(24),
    nonCompliantCount: BigInt(16),
    notApplicableCount: BigInt(2),
    compliancePercentage: 67,
  },
  [Standard.SOC2]: {
    standard: Standard.SOC2,
    totalControls: BigInt(33),
    compliantCount: BigInt(28),
    partialCount: BigInt(4),
    nonCompliantCount: BigInt(1),
    notApplicableCount: BigInt(0),
    compliancePercentage: 88,
  },
  [Standard.CMMC]: {
    standard: Standard.CMMC,
    totalControls: BigInt(110),
    compliantCount: BigInt(52),
    partialCount: BigInt(28),
    nonCompliantCount: BigInt(26),
    notApplicableCount: BigInt(4),
    compliancePercentage: 51,
  },
  [Standard.NERC_CIP]: {
    standard: Standard.NERC_CIP,
    totalControls: BigInt(38),
    compliantCount: BigInt(28),
    partialCount: BigInt(7),
    nonCompliantCount: BigInt(3),
    notApplicableCount: BigInt(0),
    compliancePercentage: 76,
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
