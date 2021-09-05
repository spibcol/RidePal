'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Bike} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({name: 'Sepp Kuss', stravaId: 1}),
    User.create({name: 'Lance Armstrong', stravaId: 2})
  ])

  const bikes = await Promise.all([
    Bike.create({name: 'Trek OCLV', miles: 540, userId: 1}),
    Bike.create({name: 'Cervelo S5', miles: 2345, userId: 2})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${bikes.length} bikes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
