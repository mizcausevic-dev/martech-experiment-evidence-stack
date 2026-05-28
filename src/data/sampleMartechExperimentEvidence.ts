// SPDX-License-Identifier: AGPL-3.0-or-later

import type { MartechExperimentEvidenceExport } from "../types.js";

export const sampleMartechExperimentEvidencePayload: MartechExperimentEvidenceExport = {
  programs: [
    {
      id: "PRG-104",
      experiment: "Pricing-page audience split",
      audience: "Paid SMB traffic routed through the pricing CTA branch",
      platform: "VWO + Snowflake",
      owner: "Growth Engineering",
      status: "AT_RISK",
      workflowHealthy: false,
      hoursToLaunch: 13,
      packet: "pricing-activation packet",
      excerpt: "Audience rules, suppression logic, and downstream revenue proof still disagree across the test stack.",
      nextAction: "Reconcile audience evidence and consent-safe exclusions before the paid branch goes live."
    },
    {
      id: "PRG-211",
      experiment: "Lifecycle welcome-path uplift",
      audience: "Net-new trials entering the lifecycle nurture stream",
      platform: "Klaviyo + GA4",
      owner: "Lifecycle Growth",
      status: "ON_TRACK",
      workflowHealthy: true,
      hoursToLaunch: 20,
      packet: "welcome-lifecycle packet",
      excerpt: "Consent proof, activation sequencing, and measurement ownership are aligned for the current launch window.",
      nextAction: "Keep the lifecycle packet green and archive the next attribution proof set."
    },
    {
      id: "PRG-318",
      experiment: "Winback reactivation branch",
      audience: "Dormant pipeline contacts eligible for reactivation",
      platform: "CDP + Klaviyo + warehouse",
      owner: "MarTech Operations",
      status: "AT_RISK",
      workflowHealthy: false,
      hoursToLaunch: 8,
      packet: "winback-reactivation packet",
      excerpt: "Consent refresh, launch approvals, and revenue-measurement traceability are still split across teams.",
      nextAction: "Repair activation posture before the reactivation branch can move."
    }
  ],
  packets: [
    {
      id: "PKT-801",
      programId: "PRG-104",
      experiment: "Pricing-page audience split",
      audience: "Paid SMB traffic routed through the pricing CTA branch",
      platform: "VWO + Snowflake",
      owner: "Growth Engineering",
      domain: "TARGETING",
      kind: "TargetingEvidence",
      severity: "high",
      status: "OPEN",
      scope: "Audience eligibility proof",
      principal: "pricing-audience-proof",
      message: "Audience evidence still does not reconcile campaign-entry rules with the warehouse eligibility export.",
      openedAt: "2026-05-24T14:00:00Z",
      dueAt: "2026-05-28T17:00:00Z"
    },
    {
      id: "PKT-802",
      programId: "PRG-104",
      experiment: "Pricing-page audience split",
      audience: "Paid SMB traffic routed through the pricing CTA branch",
      platform: "VWO + Snowflake",
      owner: "RevOps Governance",
      domain: "HOLDOUT",
      kind: "HoldoutIntegrity",
      severity: "medium",
      status: "OPEN",
      scope: "Consent-safe exclusions",
      principal: "pricing-consent-suppression",
      message: "Suppression and control-group evidence is still split across audience rules, consent filters, and ramp logic.",
      openedAt: "2026-05-26T13:00:00Z",
      dueAt: "2026-05-29T18:00:00Z"
    },
    {
      id: "PKT-910",
      programId: "PRG-211",
      experiment: "Lifecycle welcome-path uplift",
      audience: "Net-new trials entering the lifecycle nurture stream",
      platform: "Klaviyo + GA4",
      owner: "Lifecycle Growth",
      domain: "MEASUREMENT",
      kind: "MeasurementConfig",
      severity: "low",
      status: "RESOLVED",
      scope: "Primary metric mapping review",
      principal: "welcome-attribution-map",
      message: "Measurement packet approved and archived against the welcome-flow control and treatment sequence.",
      openedAt: "2026-05-20T12:00:00Z",
      dueAt: "2026-05-22T12:00:00Z"
    },
    {
      id: "PKT-1011",
      programId: "PRG-318",
      experiment: "Winback reactivation branch",
      audience: "Dormant pipeline contacts eligible for reactivation",
      platform: "CDP + Klaviyo + warehouse",
      owner: "MarTech Operations",
      domain: "RELEASE",
      kind: "ReleaseReadiness",
      severity: "high",
      status: "OPEN",
      scope: "Activation readiness",
      principal: "winback-activation",
      message: "Activation safeguards are incomplete for the reactivation branch; the flow could ship before rollback and QA evidence are locked.",
      openedAt: "2026-05-23T10:30:00Z",
      dueAt: "2026-05-27T16:00:00Z"
    },
    {
      id: "PKT-1012",
      programId: "PRG-318",
      experiment: "Winback reactivation branch",
      audience: "Dormant pipeline contacts eligible for reactivation",
      platform: "CDP + Klaviyo + warehouse",
      domain: "MEASUREMENT",
      kind: "MeasurementConfig",
      severity: "high",
      status: "OPEN",
      scope: "Revenue measurement chain",
      principal: "winback-revenue-proof",
      message: "The reactivation branch still lacks one owner-safe measurement chain for suppression logic and downstream revenue proof.",
      openedAt: "2026-05-22T15:00:00Z",
      dueAt: "2026-05-27T15:00:00Z"
    }
  ]
};

export const experimentLanePackets = [
  {
    id: "audience-lane",
    lane: "Audience proof lane",
    owner: "Growth Engineering",
    focus: "Eligibility proof, audience splits, and cross-platform routing posture",
    status: "RED",
    note: "Broken audience evidence is the fastest way to turn a test into a bad-segmentation and data-quality problem.",
    nextAction: "Reconcile the audience ledger and close the missing evidence packet."
  },
  {
    id: "consent-lane",
    lane: "Consent and suppression lane",
    owner: "RevOps Governance",
    focus: "Suppression logic, exclusions, and control-group integrity",
    status: "YELLOW",
    note: "Consent posture is partially healthy, but one packet is still open against a sensitive pricing rollout.",
    nextAction: "Collapse duplicate suppression rules into one release-safe evidence packet."
  },
  {
    id: "activation-lane",
    lane: "Activation lane",
    owner: "MarTech Operations",
    focus: "QA readiness, rollback posture, and launch sequencing",
    status: "RED",
    note: "Activation posture is degraded for the reactivation branch because QA and rollback proof are not fully locked.",
    nextAction: "Restore the rollout guardrail before launch."
  },
  {
    id: "measurement-lane",
    lane: "Measurement lane",
    owner: "Analytics + Attribution",
    focus: "Primary metrics, attribution trust, and revenue proof",
    status: "YELLOW",
    note: "Measurement evidence exists, but some exception packets still depend on manual coordination.",
    nextAction: "Assign the remaining high-severity packet and validate the metric path."
  }
];

export const releasePackets = [
  {
    packetId: "REL-17",
    lane: "Pricing-page audience split",
    completenessScore: 56,
    owner: "Growth Engineering",
    status: "RED",
    blocker: "Audience proof and suppression packet are still split across teams.",
    launchWindowHours: 13,
    decisionNote: "Do not launch until the audience and suppression packets are reconciled."
  },
  {
    packetId: "REL-24",
    lane: "Lifecycle welcome-path uplift",
    completenessScore: 90,
    owner: "Lifecycle Growth",
    status: "GREEN",
    blocker: "No active blocker. Final attribution archive still recommended.",
    launchWindowHours: 20,
    decisionNote: "Safe to schedule once the attribution archive is attached."
  },
  {
    packetId: "REL-33",
    lane: "Winback reactivation branch",
    completenessScore: 60,
    owner: "MarTech Operations",
    status: "RED",
    blocker: "Activation safeguards and measurement chain are incomplete for the reactivation branch.",
    launchWindowHours: 8,
    decisionNote: "Hold until QA, rollback posture, and revenue proof are validated."
  },
  {
    packetId: "REL-41",
    lane: "Lifecycle fallback branch",
    completenessScore: 79,
    owner: "RevOps Governance",
    status: "YELLOW",
    blocker: "Fallback exclusion review is still manual for one traffic branch.",
    launchWindowHours: 15,
    decisionNote: "Can clear if the fallback owner and exclusion archive are locked in the next cycle."
  }
];
