// SPDX-License-Identifier: AGPL-3.0-or-later

import { analyze } from "../analyze.js";
import { experimentLanePackets, releasePackets, sampleMartechExperimentEvidencePayload } from "../data/sampleMartechExperimentEvidence.js";
import type { Finding } from "../types.js";

const NOW = "2026-05-31T00:00:00Z";
const report = analyze(sampleMartechExperimentEvidencePayload, {
  now: NOW,
  staleDetectionAfterHours: 72
});

function severityRank(finding: Finding): number {
  return finding.severity === "high" ? 0 : finding.severity === "medium" ? 1 : finding.severity === "low" ? 2 : 3;
}

export function summary() {
  return {
    programs: report.programs,
    onTrackPrograms: report.onTrackPrograms,
    packets: report.packets,
    highSeverityPackets: report.highSeverityPackets,
    workflowGaps: report.workflowGaps,
    stalePackets: report.stalePackets,
    recommendation:
      "Restore missing audience proof, close consent and activation packet gaps, repair stale launch windows, and stabilize Growth Ops ownership before the next rollout window."
  };
}

export function experimentLane() {
  return experimentLanePackets.map((lane) => ({
    ...lane,
    relatedFindings: report.findingsList.filter((finding) => {
      if (lane.id === "audience-lane") return finding.code === "stack-governance-gap" || finding.code === "missing-audience-proof";
      if (lane.id === "consent-lane") return finding.code === "missing-consent-evidence" || finding.code === "stale-open-packet";
      if (lane.id === "activation-lane") return finding.code === "missing-launch-readiness" || finding.code === "workflow-gap";
      if (lane.id === "measurement-lane") return finding.code === "missing-measurement-proof" || finding.code === "high-severity-unassigned";
      return false;
    }).length
  }));
}

export function guardrailGaps() {
  return [...report.findingsList]
    .sort((left, right) => severityRank(left) - severityRank(right))
    .map((finding) => ({
      ...finding,
      owner:
        finding.owner ??
        (finding.code === "missing-audience-proof"
          ? "Growth Engineering"
          : finding.code === "missing-consent-evidence"
            ? "RevOps Governance"
            : finding.code === "missing-launch-readiness"
              ? "MarTech Operations"
              : finding.code === "missing-measurement-proof"
                ? "Analytics + Attribution"
                : "Experimentation Operations")
    }));
}

export function releasePosture() {
  return releasePackets;
}

export function verification() {
  return [
    "The dashboard is backed by a real offline cross-stack MarTech analyzer and CLI, not static copy alone.",
    "Experiment, packet, and review snapshots are synthetic sample data only; no live customer, tenant, or identity records are published.",
    "The control plane keeps audience proof, suppression drift, activation readiness, and measurement posture visible for growth and audit stakeholders.",
    "This surface demonstrates experiment governance and launch-safe sequencing, not a generic MarTech keyword page.",
    "It complements workforce, security, and data surfaces with a reusable evidence-routing primitive."
  ];
}

export const validation = verification;

export function payload() {
  return {
    summary: summary(),
    experimentLane: experimentLane(),
    guardrailGaps: guardrailGaps(),
    releasePosture: releasePosture(),
    verification: verification(),
    sample: sampleMartechExperimentEvidencePayload
  };
}
