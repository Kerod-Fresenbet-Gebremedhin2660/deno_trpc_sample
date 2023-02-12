import { opine } from "https://deno.land/x/opine@2.3.3/mod.ts";
import * as trpc from "npm:@trpc/server@^10.11.0";
import * as trpcExpress from "npm:@trpc/server@^10.11.0/adapters/express";


const app = opine();

const t = trpc.initTRPC.create();

const router = t.router;


// setup tRPC router
const appRouter = router({
    greeting: t.procedure
    .query((_) => {
      return {
        message: "Hello Deno"
      };
    }),
});

const createContext = ({
    req,
    res,
  }: trpcExpress.CreateExpressContextOptions) => ({});

// apply tRPC router as a middleware
app.use("/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

//app.use(opineCors()); // uncomment to use cors

app.listen(5005); // start server

export type AppRouter = typeof appRouter; // tRPC ty