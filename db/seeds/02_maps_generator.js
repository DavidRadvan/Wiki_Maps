const faker = require('faker');

const { randomNum } = require('../seedHelperFunctions.js');
const { numOfMaps, numOfUsers } = require('../seedVariables.js');

const createFakeMap = () => ({
  contributor_id: randomNum(numOfUsers),
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  thumbnail_img: faker.image.city()
});

exports.seed = async (knex) => {
  let fakeMap = [];
  const desiredFakeMap = numOfMaps;

  for (let i = 0; i < desiredFakeMap; i++) {
    fakeMap.push(createFakeMap());
  }
  await knex('maps').insert(fakeMap);
};
