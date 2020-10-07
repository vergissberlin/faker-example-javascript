const Cluster = require('cluster')
const Faker = require('faker')
const FS = require('fs')
const Path = require('path')
const OS = require('os')
const CLIProgress = require('cli-progress')
const { Transform } = require('json2csv')

const TARGET_PER_WORKER = 10
const INSTANCES = OS.cpus().length
const DATASET_SIZE = INSTANCES * TARGET_PER_WORKER

if (Cluster.isMaster) {
	const stream = FS.createWriteStream(Path.join(__dirname, 'data/fakerdata.csv'))
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

	const csvTransformer = new Transform({}, { highWaterMark: 16384, encoding: 'utf-8' })

	csvTransformer.pipe(stream)
	progressBar.start(DATASET_SIZE, 0)

	Cluster.on('message', (w, m) => {
		csvTransformer.write(m)
		generated++

		progressBar.increment()

		if (generated > DATASET_SIZE) {
			for (const id in Cluster.workers) {
				Cluster.workers[id].kill()
			}

			stream.close()

			process.exit()
		}
	})

	for (let i = 0; i < INSTANCES; i++) {
		Cluster.fork()
	}
} else {
	for (let i = 0; i < TARGET_PER_WORKER; i++) {
		const { name, username, email, phone, website } = Faker.helpers.createCard()

		process.send(JSON.stringify({ name, username, email, phone, website }))
	}

	process.exit()
}
