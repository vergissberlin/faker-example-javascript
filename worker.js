// file myWorker.js
const workerpool = require('workerpool');
const faker = require('faker')
const JSON2CSV = require('json2csv')
const Path = require('path')

/**
 * generate fake da data
 */
function fakeIt(fileIndex, quantity) {
  return new Promise(function (resolve, reject) {
    let fakeDataArray = []
    for (let i = 0; i < quantity; i++) {
      const {name, username, email, phone, website} = faker.helpers.createCard()
      fakeDataArray.push({name, username, email, phone, website})
    }

    const fakeData = JSON2CSV.parse(fakeDataArray)
    let fs = require('fs')
    fs.writeFile(Path.join(__dirname,`data/userdata-${fileIndex}.csv`), fakeData, function (err) {
      if (err) {
        reject(err)
      } else {
        resolve(fileIndex)
      }
    })
  })
}

// create a worker and register functions
workerpool.worker({
  fakeIt: fakeIt
});

