// SPDX-License-Identifier: AGPL-3.0-or-later

import { mkdir, writeFile } from "node:fs/promises";

import {
  experimentLane,
  guardrailGaps,
  payload,
  releasePosture,
  summary,
  verification
} from "../src/services/martechExperimentEvidenceStackService.js";
import {
  renderDocs,
  renderExperimentLane,
  renderGuardrailGaps,
  renderOverview,
  renderReleasePosture,
  renderValidation
} from "../src/services/render.js";

async function writePage(route: string, html: string) {
  const directory = route === "/" ? "site" : `site${route}`;
  await mkdir(directory, { recursive: true });
  await writeFile(`${directory}/index.html`, html, "utf8");
}

async function writeJson(name: string, value: unknown) {
  await mkdir("site/api", { recursive: true });
  await writeFile(`site/api/${name}.json`, JSON.stringify(value, null, 2), "utf8");
}

await writePage("/", renderOverview());
await writePage("/stack-lane", renderExperimentLane());
await writePage("/evidence-gaps", renderGuardrailGaps());
await writePage("/activation-posture", renderReleasePosture());
await writePage("/verification", renderValidation());
await writePage("/docs", renderDocs());

await writeJson("summary", summary());
await writeJson("stack-lane", experimentLane());
await writeJson("evidence-gaps", guardrailGaps());
await writeJson("activation-posture", releasePosture());
await writeJson("verification", verification());
await writeJson("sample", payload());
