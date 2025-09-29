import { google } from "@ai-sdk/google";
import {
	Agent,
	InMemoryStorageAdapter,
	Memory,
	VoltAgent,
} from "@voltagent/core";
import { createPinoLogger } from "@voltagent/logger";
import serverlessHono from "@voltagent/serverless-hono";

type Env = {
	GOOGLE_GENERATIVE_AI_API_KEY: string;
	VOLTAGENT_PUBLIC_KEY?: string;
	VOLTAGENT_SECRET_KEY?: string;
};

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
		storage: new InMemoryStorageAdapter({
			storageLimit: 50,
		}),
	}),
});

const voltAgent = new VoltAgent({
	agents: { agent },
	serverless: serverlessHono(),
	logger,
});

export default voltAgent.serverless().toCloudflareWorker();
