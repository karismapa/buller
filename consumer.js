const Queue = require("bull");
const cluster = require("cluster");
const { cpus } = require("os");

// set queue name as "testing"
const queue = new Queue("testing");

// if you want to use custom redis address or port, use this format instead
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
    
    // di sini proses generate PDF (atau create invoice satuan, atau lain2)

    done(null, `Done, ${job.data.foo} - ${process.pid}`);
  });
}

queue.on("failed", (err) => {
  console.log(err);
});
