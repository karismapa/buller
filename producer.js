const Queue = require("bull");

// set queue name as testing
const queue = new Queue("testing");

// if you want to use custom redis address or port, use this format instead
// const queue = new Queue("testing", "redis://0.0.0.0:6479");

// query data yang dibutuhkan untuk create invoice

for (let i = 1; i < 10; i++) {
  queue.add({ foo: `hello ${i}`, item: i });
}

queue.on("progress", (job) => {
  
})

queue.on("global:completed", (job, result) => {
  console.log(result);
  // zip semua file yang ada di temporary folder
  // kembalikan link url
});
