#!/usr/bin/env node

const { execSync } = require("child_process");

console.log("Running DEVELOPMENT migrations");

execSync("npm run migrate:dev", { stdio: "inherit" });

console.log("Development migrations complete");
process.exit(0);
