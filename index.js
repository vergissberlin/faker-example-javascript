import workerpool from 'workerpool'
import CLIProgress from 'cli-progress'

// Configuration
const LINES_PER_FILE = !isNaN(parseInt(process.env.LINES_PER_FILE)) ? parseInt(process.env.LINES_PER_FILE) : 10000
const WORKER_TYPE = ['auto', 'process', 'thread'].includes(process.env.WORKER_TYPE) ? process.env.WORKER_TYPE : 'process' // 'process' or 'thread'
const WORKER_COUNT_MAX = !isNaN(parseInt(process.env.WORKER_COUNT_MAX)) ? parseInt(process.env.WORKER_COUNT_MAX) : workerpool.cpus
const FAKE_DATA_TYPE = ['product', 'user'].includes(process.env.DATA_TYPE) ? process.env.DATA_TYPE : 'product' // 'product' or 'user'
const FAKE_DATA_TARGET_QUANTITY = !isNaN(parseInt(process.env.TARGET_QUANTITY)) ? parseInt(process.env.TARGET_QUANTITY) : 500000
let fileTargetQuantity = Math.ceil(FAKE_DATA_TARGET_QUANTITY / LINES_PER_FILE)
let fileIndex = 0
let fileQuantity = 0

// Intro
console.log(`\n🔥\tGenerating \x1b[32m${fileTargetQuantity}\x1b[0m files with \x1b[32m${LINES_PER_FILE}\x1b[0m fake users in each file.`)
console.log(`\tIn total, you get \x1b[32m${FAKE_DATA_TARGET_QUANTITY}\x1b[0m fake \x1b[32m${FAKE_DATA_TYPE}\x1b[0ms.`)
console.log(`\tTo generate them it uses \x1b[32m${WORKER_COUNT_MAX}\x1b[0m \x1b[32m${WORKER_TYPE}\x1b[0m's.`)
console.log(`\tTo execute the worker pool it uses the worker type "\x1b[32m${WORKER_TYPE}\x1b[0m".\n`)

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
const pool = workerpool.pool('./worker.js', {
	workerType: WORKER_TYPE,
	maxWorkers: WORKER_COUNT_MAX
});

// Start progress bar
progressBar.start(fileTargetQuantity, 0)

// Run registered functions on the worker via exec
async function spawnWorker(index) {
	// Terminate the workers pool when all workers have finised their tasks
	if (fileQuantity === fileTargetQuantity) {
		pool.terminate();
		return;
	}

	if (fileIndex < fileTargetQuantity) {
		fileIndex++

		try {
			await pool.exec('fakeIt', [index, LINES_PER_FILE, FAKE_DATA_TYPE])
			fileQuantity++
			progressBar.increment()
			await spawnWorker(fileIndex)
		} catch(err) {
			console.error(err)
		}
	}
}

// Initals spawn worker(s)
for (let threadIndex = 0; threadIndex <= WORKER_COUNT_MAX; threadIndex++) {
	spawnWorker(threadIndex)
}
