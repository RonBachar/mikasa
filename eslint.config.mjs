import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Third-party skills checked out under .claude/ are not ours to lint.
    // They were contributing 34 of the 36 errors in a full run, which is
    // enough noise to hide a real one in our own code.
    ".claude/**",
  ]),
]);

export default eslintConfig;
