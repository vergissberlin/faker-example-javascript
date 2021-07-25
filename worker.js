import workerpool from 'workerpool'
import JSON2CSV from 'json2csv'
import fs from 'fs'
import {factorizeGenerator} from './types/factory.js'

/**
 * Generate fake data with a worker
 */
function fakeIt(fileIndex, quantity, type) {
  let fakeDataArray = []
  const generator = factorizeGenerator(type)

  for (let i = 0; i < quantity; i++) {
    fakeDataArray.push(generator())
  }

  const fakeData = JSON2CSV.parse(fakeDataArray)
  fs.writeFileSync(`./data/${type}-${fileIndex}.csv`, fakeData)
}

// create a worker and register functions
workerpool.worker({
  fakeIt
});
