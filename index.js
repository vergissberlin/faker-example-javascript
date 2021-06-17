const Cluster = require('cluster')
const Faker = require('faker')
const FS = require('fs')
const Path = require('path')
const OS = require('os')
const CLIProgress = require('cli-progress')
const JSON2CSV = require('json2csv')

/**
 * Workers threads
 *
 * @see https://nodejs.org/api/worker_threads.html
 */
if (Cluster.isMaster) {
	/**
	 * Configure to your needs
	 */
	const THREADS = !isNaN(parseInt(process.env.THREADS)) ? parseInt(process.env.THREADS) : OS.cpus().length
	const TARGET = !isNaN(parseInt(process.env.TARGET)) ? parseInt(process.env.TARGET) : 100000
	const TARGET_PER_THREAD = Math.ceil(TARGET / THREADS)

	console.log(`Generating ${TARGET} fake users on ${THREADS} with every thread generating ${TARGET_PER_THREAD} users...`)

	let generated = 0

	const progressBar = new CLIProgress.SingleBar(
		{
			format: 'Generating Datasets: [' + '{bar}' + '] {percentage}% | {value}/{total} Datasets',
			hideCursor: true,
			clearOnComplete: true,
			stopOnComplete: true
		},
		CLIProgress.Presets.shades_grey
	)

	progressBar.start(TARGET, 0)

	Cluster.on('message', () => {
		generated++
		progressBar.increment()

		if (generated > TARGET) {
			for (const id in Cluster.workers) {
				Cluster.workers[id].send('stop')
			}
		}
	})

	for (let i = 0; i < THREADS; i++) {
		Cluster.fork({FILE: Path.join(__dirname, `data/fakerdata_${i}.csv`), TARGET_PER_THREAD})
	}
} else {
	process.on('message', (m) => {
		if (m === 'stop') {
			process.exit()
		}
	})

	FS.writeFileSync(process.env.FILE, 'name,username,email,phone,website')

	for (let i = 0; i <= parseInt(process.env.TARGET_PER_THREAD); i++) {
		/**
		 * @see https://github.com/marak/Faker.js
		 */
		const {name, username, email, phone, website} = Faker.helpers.createCard()

		FS.appendFileSync(
			process.env.FILE,
			'\n' + JSON2CSV.parse([{name, username, email, phone, website}], {
				header: false
			}) 
		)

		process.send(i)
	}
}
