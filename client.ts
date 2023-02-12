import type { AppRouter } from "./server.ts";
import {createTRPCProxyClient, httpBatchLink} from "npm:@trpc/client@^10.11.0";
const client = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:5005/trpc',
      }),
    ],
  });

try {
  const query = await client.greeting.query();
  console.log(JSON.stringify(query));
} catch (e) {
  console.error(e);
}
