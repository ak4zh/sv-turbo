#!/usr/bin/env node

(
    async () => {
        const response = await fetch("http://localhost:80/health");
        if (!response.ok) {
        throw new Error(`Healthcheck failed: ${response.status}`);
        } else {
        console.info("\x1b[32m", "Healthcheck passed", "\x1b[0m");
        }
    })().catch((error) => {
        console.error(error.message);
        process.exit(1);
    }
);