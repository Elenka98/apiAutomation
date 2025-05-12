import {faker} from "@faker-js/faker";
import { cookie } from '../src/tests/tour/create_tour_positive.spec'

import * as supertest from 'supertest';
const request = supertest('http://localhost:8001/api/v1')

export function createTour(): Promise<any> {
  return new Promise((resolve, reject) => {
      request
          .post('/tours')
          .set('Cookie', cookie)
          .send({
              name: "TourForn11",
              duration: 10,
              description: "Could be",
              maxGroupSize: 10,
              summary: "Test tour",
              difficulty: "easy",
              price: 100,
              rating: 4.8,
              imageCover: "tour-3-cover.jpg",
              ratingsAverage: 4.9,
              guides: [],
              startDates: ["2024-04-04"],
              startLocation: {
                  type: "Point",
                  coordinates: [-74.005974, 40.712776], // [longitude, latitude]
              }
          })
          .end((err, res) => {
              if (err) reject(err);
              else resolve(res);
          })
  })
}