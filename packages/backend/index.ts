import { google } from "@ai-sdk/google";
import { Agent, Memory, VoltAgent } from "@voltagent/core";
import { LibSQLMemoryAdapter } from "@voltagent/libsql";
import { createPinoLogger } from "@voltagent/logger";
import { honoServer } from "@voltagent/server-hono";

const logger = createPinoLogger({
	name: "worklab-agent",
	level: "info",
});

const agent = new Agent({
	name: "worklab-agent",
	instructions:
		"A helpful assistant that answers questions without using tools",
	model: google("gemini-2.5-flash-lite"),
	memory: new Memory({
		storage: new LibSQLMemoryAdapter({
			url: "file:./.voltagent/memory.db",
		}),
	}),
});

new VoltAgent({
	agents: { agent },
	server: honoServer(),
	logger,
});
