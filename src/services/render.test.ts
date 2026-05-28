import { describe, expect, test } from "vitest";

import { renderDocs, renderOverview } from "./render.js";

describe("render surfaces", () => {
  test("overview carries the new experiment governance title", () => {
    expect(renderOverview()).toContain("MarTech Experiment Evidence Stack");
    expect(renderOverview()).toContain("/stack-lane");
  });

  test("docs route exposes the CLI and API shape", () => {
    const html = renderDocs();
    expect(html).toContain("martech-evidence-audit");
    expect(html).toContain("/api/evidence-gaps");
  });
});
