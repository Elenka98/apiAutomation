import * as supertest from "supertest";
const request = supertest('http://localhost:8001/api/v1')
import {cookieHomeTour} from "../src/tests/tour/tourHomework.spec";
import {faker} from "@faker-js/faker";

export const errorMessagesTour = {
    status: "fail",
    emptyBody: "Request body cannot be empty",
    missingName: "A tour must have a name",
    missingDuration: "A tour must have duration",
    missingMaxGroupSize: "A tour must have a group size",
    missingDifficulty: "Difficulty is either: easy, medium, difficult",
    invalidDifficulty: "Difficulty is either: easy, medium, difficult",
    invalidRating: "Ratings average must be between 1 and 5",
    highDiscountPrice: "Discount price should be below regular price",
    missingSummary: "A tour must have a summary",
    missingImage: "A tour must have a cover image",
    missingStartLocation: "Invalid location format"
}

export const tourHomeWork = {
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
}

export function emptyRequestBody(): Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/tours')
            .set('Cookie', cookieHomeTour)
            .send({})
            .end((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
    })
}

export function missingName(): Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/tours')
            .set('Cookie', cookieHomeTour)
            .send({
                duration: tourHomeWork.duration,
                description: tourHomeWork.description,
                maxGroupSize: tourHomeWork.maxGroupSize,
                summary: tourHomeWork.summary,
                difficulty: tourHomeWork.difficulty,
                price: tourHomeWork.price,
                rating: tourHomeWork.rating,
                imageCover: tourHomeWork.imageCover,
                ratingsAverage: tourHomeWork.ratingsAverage,
                guides: tourHomeWork.guides,
                startDates: tourHomeWork.startDates,
                startLocation: tourHomeWork.startLocation
            })
            .end((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
    })
}

export function missingDuration(): Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/tours')
            .set('Cookie', cookieHomeTour)
            .send({
                name: tourHomeWork.name,
                description: tourHomeWork.description,
                maxGroupSize: tourHomeWork.maxGroupSize,
                summary: tourHomeWork.summary,
                difficulty: tourHomeWork.difficulty,
                price: tourHomeWork.price,
                rating: tourHomeWork.rating,
                imageCover: tourHomeWork.imageCover,
                ratingsAverage: tourHomeWork.ratingsAverage,
                guides: tourHomeWork.guides,
                startDates: tourHomeWork.startDates,
                startLocation: tourHomeWork.startLocation
            })
            .end((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
    })
}

export function missingMaxSize(): Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/tours')
            .set('Cookie', cookieHomeTour)
            .send({
                name: tourHomeWork.name,
                duration: tourHomeWork.duration,
                description: tourHomeWork.description,
                summary: tourHomeWork.summary,
                difficulty: tourHomeWork.difficulty,
                price: tourHomeWork.price,
                rating: tourHomeWork.rating,
                imageCover: tourHomeWork.imageCover,
                ratingsAverage: tourHomeWork.ratingsAverage,
                guides: tourHomeWork.guides,
                startDates: tourHomeWork.startDates,
                startLocation: tourHomeWork.startLocation
            })
            .end((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
    })
}

export function missingDifficulty(): Promise<any>{
    return new Promise((resolve, reject) => {
        request
            .post('/tours')
            .set('Cookie', cookieHomeTour)
            .send({
                name: tourHomeWork.name,
                duration: tourHomeWork.duration,
                description: tourHomeWork.description,
                maxGroupSize: tourHomeWork.maxGroupSize,
                summary: tourHomeWork.summary,
                price: tourHomeWork.price,
                rating: tourHomeWork.rating,
                imageCover: tourHomeWork.imageCover,
                ratingsAverage: tourHomeWork.ratingsAverage,
                guides: tourHomeWork.guides,
                startDates: tourHomeWork.startDates,
                startLocation: tourHomeWork.startLocation
            })
            .end((err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
    })
}