const workerpool = require('workerpool');
const CLIProgress = require('cli-progress')

// Configuration
const LINES_PER_FILE = !isNaN(parseInt(process.env.LINES_PER_FILE)) ? parseInt(process.env.LINES_PER_FILE) : 10000
const WORKER_TYPE = process.env.WORKER_TYPE || 'process' // 'auto', 'web', 'process' or 'thread'
const FAKE_DATA_TARGET_QUANTATY = !isNaN(parseInt(process.env.TARGET_QUANTATY)) ? parseInt(process.env.TARGET_QUANTATY) : 500000
let fileTargetQuantity = Math.ceil(FAKE_DATA_TARGET_QUANTATY / LINES_PER_FILE)
let fileIndex = 0
let fileQuantaty = 0

// Intro
console.log(`\n🔥\tGenerating \x1b[32m${fileTargetQuantity}\x1b[0m files with \x1b[32m${LINES_PER_FILE}\x1b[0m fake users in each file.`)
console.log(`\tIn total, you get \x1b[32m${FAKE_DATA_TARGET_QUANTATY}\x1b[0m fake users.`)
console.log(`\tTo generate them it uses all of your \x1b[32m${workerpool.cpus}\x1b[0m CPUs.`)
console.log(`\tTo excecute the worker pool it uses the worker type "\x1b[32m${WORKER_TYPE}\x1b[0m".\n`)

// Debugging
/*
const {totalWorkers, busyWorkers, idleWorkers, pendingTasks, activeTasks} = pool.stats()
console.log(`\nTotal workers\t:`, totalWorkers)
console.log(`Idle workers\t:`, idleWorkers)
console.log(`Pending tasks\t:`, pendingTasks)
console.log(`Active tasks\t:`, activeTasks)
console.log(`CPUs available\t: ${workerpool.cpus}\n`)
*/

// For better visualization,start an progress bar
const progressBar = new CLIProgress.SingleBar(
	{
		format: '🤖 Generating datasets: [' + '{bar}' + '] {percentage}% | {value}/{total} files.',
		hideCursor: true,
		clearOnComplete: true,
		stopOnComplete: true
	},
	CLIProgress.Presets.shades_grey
)

// Create a worker pool using an external worker script
const pool = workerpool.pool(__dirname + '/worker.js', {
	workerType: WORKER_TYPE
});

// Start progress bar
progressBar.start(fileTargetQuantity, 0)

// Run registered functions on the worker via exec
function spawnWorker(index) {
	if (fileIndex < fileTargetQuantity) {
		fileIndex++

		pool.exec('fakeIt', [index, LINES_PER_FILE])
			.then(function (result) {
				fileQuantaty++
				progressBar.increment()
				// Spawn new workers as soon a slot is available.
				spawnWorker(fileIndex)
			})
			.catch(function (err) {
				console.error(err)
			})
			.then(function () {
				// Terminate the workers pool when all workers have finised their tasks
				if (fileQuantaty === fileTargetQuantity) {
					pool.terminate();
				}
			})
	}
}

// Spawn the first workers. One for each available core.
for (let threadIndex = 0; threadIndex < workerpool.cpus; threadIndex++) {
	spawnWorker(threadIndex)
}

