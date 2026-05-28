import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { analyze } from "../src/analyze.js";
import { toMarkdown, toSummary } from "../src/format.js";
import type { MartechExperimentEvidenceExport } from "../src/types.js";

const here = fileURLToPath(new URL(".", import.meta.url));
const fixture = (name: string): MartechExperimentEvidenceExport =>
  JSON.parse(readFileSync(`${here}/../fixtures/${name}`, "utf8")) as MartechExperimentEvidenceExport;

const NOW = "2026-05-30T00:00:00Z";

describe("analyze", () => {
  it("counts experiments and packets", () => {
    const report = analyze(fixture("martech-experiment-evidence.json"), { now: NOW });
    expect(report.programs).toBe(3);
    expect(report.onTrackPrograms).toBe(1);
    expect(report.packets).toBe(5);
  });

  it("flags missing on-track experiments as high", () => {
    const report = analyze({ programs: [], packets: [] }, { now: NOW });
    expect(report.findingsList.find((finding) => finding.code === "no-on-track-programs")?.severity).toBe("high");
  });

  it("flags experiment governance gaps", () => {
    const report = analyze(fixture("martech-experiment-evidence.json"), { now: NOW });
    expect(report.findingsList.find((finding) => finding.code === "stack-governance-gap")?.scope).toBe("Snowflake");
  });

  it("flags targeting, holdout, release, measurement, and workflow gaps", () => {
    const report = analyze(fixture("martech-experiment-evidence.json"), { now: NOW });
    expect(report.findingsList.find((finding) => finding.code === "missing-audience-proof")).toBeDefined();
    expect(report.findingsList.find((finding) => finding.code === "missing-consent-evidence")).toBeDefined();
    expect(report.findingsList.find((finding) => finding.code === "missing-launch-readiness")).toBeDefined();
    expect(report.findingsList.find((finding) => finding.code === "missing-measurement-proof")).toBeDefined();
    expect(report.findingsList.find((finding) => finding.code === "workflow-gap")).toBeDefined();
  });

  it("flags stale open packets", () => {
    const report = analyze(fixture("martech-experiment-evidence.json"), { now: NOW, staleDetectionAfterHours: 24 });
    expect(report.findingsList.find((finding) => finding.code === "stale-open-packet")).toBeDefined();
  });

  it("ok=true on a clean fixture", () => {
    const report = analyze(fixture("martech-experiment-evidence-clean.json"), { now: NOW });
    expect(report.ok).toBe(true);
    expect(report.findingsList.filter((finding) => finding.severity === "high")).toEqual([]);
  });
});

describe("formatters", () => {
  it("toMarkdown ranks high findings first", () => {
    const markdown = toMarkdown(analyze(fixture("martech-experiment-evidence.json"), { now: NOW }));
    expect(markdown).toContain("❌");
    expect(markdown.indexOf("🔴")).toBeLessThan(markdown.indexOf("🟠"));
  });

  it("toSummary emits a one-liner", () => {
    const summary = toSummary(analyze(fixture("martech-experiment-evidence.json"), { now: NOW }));
    expect(summary).toMatch(/programs/);
    expect(summary).toMatch(/packets/);
  });
});
