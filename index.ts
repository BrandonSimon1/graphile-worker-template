import { run } from "graphile-worker"

async function main() {
  // Run a worker to execute jobs:
  const { 
      PGUSER,
      PGPASSWORD,
      PGHOST,
      PGDATABASE
  } = process.env

  const runner = await run({
    connectionString: `postgres://${PGUSER}@${PGPASSWORD}:${PGPASSWORD}@${PGHOST}:5432/${PGDATABASE}`,
    concurrency: 5,
    // Install signal handlers for graceful shutdown on SIGINT, SIGTERM, etc
    noHandleSignals: false,
    pollInterval: 1000,
    // you can set the taskList or taskDirectory but not both
    taskList: {
      async hello() {
        console.log('hello')
      } 
    },
    // or:
    //   taskDirectory: `${__dirname}/tasks`,
  })
  await runner.promise
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});