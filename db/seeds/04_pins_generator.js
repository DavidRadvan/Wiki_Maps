const faker = require('faker');
const { generateNonUniqueNums, randomNum } = require('../seedHelperFunctions.js');
const { numOfMaps, maxNumPinsPerMap, numOfUsers } = require('../seedVariables.js');

exports.seed = async (knex) => {

  let fakePins = [];
  for (let i = 0; i < numOfMaps; i++) {

    let userIds = generateNonUniqueNums(randomNum(maxNumPinsPerMap), numOfUsers);

    const createPins = (userId) => ({
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      pin_img: faker.image.sports(),
      user_id: userId,
      map_id: i + 1
    });

    for (let j = 0; j < userIds.length; j++) {
      let uniqueId = userIds[j];
      fakePins.push(createPins(uniqueId));
    }
  }
  await knex('pins').insert(fakePins);
};

