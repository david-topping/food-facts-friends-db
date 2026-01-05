#!/usr/bin/env node

const { execSync } = require("child_process");

console.log("Running PRODUCTION migrations");

execSync("npm run migrate:prod", { stdio: "inherit" });

console.log("Production migrations complete");
process.exit(0);
