// SPDX-License-Identifier: AGPL-3.0-or-later

import {
  experimentLane,
  guardrailGaps,
  releasePosture,
  summary
} from "../src/services/martechExperimentEvidenceStackService.js";

console.log("martech-experiment-evidence-stack demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(`experiment lanes: ${experimentLane().length}`);
console.log(`guardrail gap findings: ${guardrailGaps().length}`);
console.log(`release packets: ${releasePosture().length}`);
