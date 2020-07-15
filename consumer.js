const Queue = require("bull");
const cluster = require("cluster");
const { cpus } = require("os");

const queue = new Queue("testing");
// const queue = new Queue("testing", "redis://0.0.0.0:6379");

async function delay() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
}

// console.log(cpus().length)

if (cluster.isMaster) {
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }
  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  queue.process(async (job, done) => {
    console.log(`Processing job ${job.data.item} ${cluster.worker.id}`);
    await delay();
    // proses generate PDF
    // sampai pada proses menyimpan di temp location

    done(null, `Done, ${job.data.foo} - ${process.pid}`);
  });
}

queue.on("failed", (err) => {
  console.log(err);
});
