# Compliance Mapper

## Current State
New project. No existing backend or frontend code.

## Requested Changes (Diff)

### Add
- Full enterprise cybersecurity compliance platform
- IEC 62443 crosswalk and standards mapping (NIST CSF, ISO 27001, SOC 2, CMMC, NERC CIP)
- Gap assessment module with scoring and risk levels
- Implementation wizard with step-by-step guidance
- Evidence management (upload tracking, status, expiry)
- Compliance reporting with summary dashboards
- Role-based access (admin, auditor, viewer)
- Sample/demo data preloaded for all modules

### Modify
N/A

### Remove
N/A

## Implementation Plan

### Backend (Motoko)
- Standards library: store compliance standards (IEC 62443, NIST CSF, ISO 27001, SOC 2, CMMC, NERC CIP) with control families and individual controls
- Crosswalk mappings: map IEC 62443 requirements to equivalent controls in other standards
- Assessments: create/manage gap assessments per standard, track control status (compliant, partial, non-compliant, not-applicable)
- Evidence records: track evidence items linked to controls (name, type, status, expiry date, notes)
- Implementation tasks: wizard-style tasks linked to controls with completion tracking
- Reports: aggregate assessment scores, generate compliance summaries
- User roles: admin, auditor, viewer

### Frontend
- Dark-blue cyber-themed SaaS layout with sidebar navigation
- Dashboard: compliance score gauges, gap summary charts, recent activity
- Standards Crosswalk: interactive matrix showing IEC 62443 to other standards mappings
- Gap Assessment: per-standard control list with status selectors and risk scoring
- Implementation Wizard: step-by-step task list with progress tracking
- Evidence Manager: table of evidence items with status badges and expiry alerts
- Reports: printable compliance report view with charts
- Sample data seeded for all sections so the app looks fully functional
