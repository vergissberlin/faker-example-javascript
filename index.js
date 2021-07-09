const workerpool = require('workerpool');
const CLIProgress = require('cli-progress')

// Configuration
const LINES_PER_FILE = 1000
const TIME_START = process.hrtime();
let FAKE_DATA_TARGET_QUANTATY = 500000
let fileTargetQuantity = Math.ceil(FAKE_DATA_TARGET_QUANTATY / LINES_PER_FILE)
let fileIndex = 0
let fileQuantaty = 0

// Intro
console.log(`\n🔥\tGenerating ${fileTargetQuantity} files with ${LINES_PER_FILE} fake users in each file.`)
console.log(`\tIn total, you get ${FAKE_DATA_TARGET_QUANTATY} fake users.`)
console.log(`\tTo generate them it uses all of your ${workerpool.cpus} CPUs.\n`)

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
	workerType: 'auto'
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
					const TIME_STOP = process.hrtime(TIME_START)
					console.log(`Created fake users\t:`, FAKE_DATA_TARGET_QUANTATY)
					console.log(`Time taken to execute\t: ${(TIME_STOP[0] * 1e9 + TIME_STOP[1]) / 1e9} seconds`)
					pool.terminate();
				}
			})
	}
}

// Spawn the first workers. One for each available core.
for (let threadIndex = 0; threadIndex < workerpool.cpus; threadIndex++) {
	spawnWorker(threadIndex)
}

