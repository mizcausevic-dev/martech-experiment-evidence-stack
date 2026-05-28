import { describe, expect, test } from "vitest";

import { experimentLane, guardrailGaps, releasePosture, summary, verification } from "./martechExperimentEvidenceStackService.js";

describe("martechExperimentEvidenceStackService", () => {
  test("summary exposes the expected operator counts", () => {
    expect(summary().programs).toBe(3);
    expect(summary().packets).toBe(5);
  });

  test("experiment lane keeps four operator lanes", () => {
    expect(experimentLane()).toHaveLength(4);
    expect(experimentLane()[0]?.lane).toContain("Audience");
  });

  test("guardrail gaps include release findings", () => {
    expect(guardrailGaps().some((finding) => finding.code === "missing-launch-readiness")).toBe(true);
  });

  test("release posture stays packet-shaped", () => {
    expect(releasePosture().every((packet) => typeof packet.completenessScore === "number")).toBe(true);
  });

  test("verification stays explicit about synthetic data", () => {
    expect(verification().join(" ")).toContain("synthetic");
  });
});
