// SPDX-License-Identifier: AGPL-3.0-or-later

export type ExperimentStatus = "ON_TRACK" | "AT_RISK";
export type PacketStatus = "OPEN" | "RESOLVED";
export type Severity = "high" | "medium" | "low" | "info";
export type EvidenceKind =
  | "TargetingEvidence"
  | "HoldoutIntegrity"
  | "ReleaseReadiness"
  | "MeasurementConfig"
  | "Approval"
  | string;
export type ExperimentDomain = "TARGETING" | "HOLDOUT" | "RELEASE" | "MEASUREMENT" | "WORKFLOW" | string;

export interface ExperimentProgram {
  id: string;
  experiment: string;
  audience: string;
  platform: string;
  owner: string;
  status: ExperimentStatus;
  workflowHealthy: boolean;
  hoursToLaunch: number;
  packet: string;
  excerpt: string;
  nextAction: string;
}

export interface ExperimentPacket {
  id: string;
  programId: string;
  experiment: string;
  audience: string;
  platform: string;
  owner?: string;
  domain: ExperimentDomain;
  kind: EvidenceKind;
  severity: Severity;
  status: PacketStatus;
  scope: string;
  principal?: string;
  message: string;
  openedAt: string;
  dueAt: string;
}

export interface MartechExperimentEvidenceExport {
  programs: ExperimentProgram[];
  packets: ExperimentPacket[];
}

export type FindingCode =
  | "no-on-track-programs"
  | "stack-governance-gap"
  | "missing-audience-proof"
  | "missing-consent-evidence"
  | "missing-launch-readiness"
  | "missing-measurement-proof"
  | "workflow-gap"
  | "stale-open-packet"
  | "high-severity-unassigned";

export interface Finding {
  code: FindingCode;
  severity: Severity;
  subject: "program" | "packet" | "workflow";
  subjectId: string;
  subjectName?: string;
  owner?: string;
  scope?: string;
  principal?: string;
  message: string;
}

export interface AnalysisOptions {
  now?: string;
  staleDetectionAfterHours?: number;
}

export interface CoverageReport {
  ok: boolean;
  programs: number;
  onTrackPrograms: number;
  packets: number;
  highSeverityPackets: number;
  workflowGaps: number;
  stalePackets: number;
  findingsList: Finding[];
}
