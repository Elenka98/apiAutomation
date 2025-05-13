import {faker} from "@faker-js/faker";
import { cookie } from '../src/tests/tour/create_tour_positive.spec'

import * as supertest from 'supertest';
const request = supertest('http://localhost:8001/api/v1')

// export function createRandomTour(){
//     return {
//         name: faker.lorem.words(4),
//         duration: faker.number.int({ min: 1, max: 14 }),
//         description: faker.lorem.sentence(),
//         maxGroupSize: faker.number.int({ min: 5, max: 30 }),
//         summary: faker.lorem.sentence(),
//         difficulty: "easy",
//         price: faker.number.int({ min: 75, max: 1200 }),
//         rating: faker.number.float({ min: 0, max: 5 }),
//         imageCover: "tour-3-cover.jpg",
//         ratingsAverage: faker.number.float({ min: 0, max: 5 }),
//         guides: [],
//         startDates: [faker.date.future()],
//         startLocation: {
//             type: "Point",
//             coordinates: [faker.location.longitude(), faker.location.latitude()], // [longitude, latitude]
//         }
//     }
// }

export function createNewTour(): Promise<any> {
  return new Promise((resolve, reject) => {
      request
          .post('/tours')
          .set('Cookie', cookie)
          .send({
              name: faker.lorem.words(4),
              duration: faker.number.int({ min: 1, max: 14 }),
              description: faker.lorem.sentence(),
              maxGroupSize: faker.number.int({ min: 5, max: 30 }),
              summary: faker.lorem.sentence(),
              difficulty: "easy",
              price: faker.number.int({ min: 75, max: 1200 }),
              rating: faker.number.float({ min: 0, max: 5 }),
              imageCover: "tour-3-cover.jpg",
              ratingsAverage: faker.number.float({ min: 0, max: 5 }),
              guides: [],
              startDates: [faker.date.future()],
              startLocation: {
                  type: "Point",
                  coordinates: [faker.location.longitude(), faker.location.latitude()], // [longitude, latitude]
              }
          })
          .end((err, res) => {
              if (err) reject(err);
              else resolve(res);
          })
  })
}