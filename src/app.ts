// SPDX-License-Identifier: AGPL-3.0-or-later

import express from "express";
import { fileURLToPath } from "node:url";

import {
  experimentLane,
  guardrailGaps,
  payload,
  releasePosture,
  summary,
  verification
} from "./services/martechExperimentEvidenceStackService.js";
import {
  renderDocs,
  renderExperimentLane,
  renderGuardrailGaps,
  renderOverview,
  renderReleasePosture,
  renderValidation,
} from "./services/render.js";

const app = express();
const port = Number(process.env.PORT ?? 5524);
const host = process.env.HOST || "0.0.0.0";

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/stack-lane", (_req, res) => res.type("html").send(renderExperimentLane()));
app.get("/evidence-gaps", (_req, res) => res.type("html").send(renderGuardrailGaps()));
app.get("/activation-posture", (_req, res) => res.type("html").send(renderReleasePosture()));
app.get("/verification", (_req, res) => res.type("html").send(renderValidation()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/stack-lane", (_req, res) => res.json(experimentLane()));
app.get("/api/evidence-gaps", (_req, res) => res.json(guardrailGaps()));
app.get("/api/activation-posture", (_req, res) => res.json(releasePosture()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

const currentFile = fileURLToPath(import.meta.url);
const invokedDirectly = process.argv[1] !== undefined && currentFile === process.argv[1];

if (invokedDirectly) {
  app.listen(port, host, () => {
    console.log(`MarTech Experiment Evidence Stack listening on http://${host}:${port}`);
  });
}

export default app;
