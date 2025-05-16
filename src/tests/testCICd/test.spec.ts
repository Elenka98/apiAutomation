import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com/");

describe("POSTS", () => {
    it("get request", async () => {
        const res = await request.get("/posts");
        console.log(res);
        console.log(res.body[0].id, "id");
        console.log(res.body);
        expect(res.statusCode).toBe(200);
        expect(res.body[0].id).toBe(1);
        //expect(res.body).toEqual(1)
    });
    it("POST request", async () => {
        const data = {
            title: "My first post request",
            body: "This is my first post request",
            userId: 1001,
        };
        const res = await request.post("/posts").send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual("My first post request");
    });
    it("PATCH request with title version 1", async () => {
        const data = {
            title: "My first post request",
        };
        const getRes = await request.get("/posts/1");
        const beforeTitle = getRes.body.title;
        console.log(beforeTitle, "==============beforeTitle===============");
        const res = await request.patch("/posts/1").send(data);
        console.log(res.body.title, "+++++++++++++++res.body.title+++++++++++");
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toBe(data.title);
        expect(res.body.title).not.toBe(beforeTitle);
    });
    it("PATCH request with title version 2", async () => {
        const data = {
            title: "My first post request",
        };
        // taking data from database as initial value
        const getRes = await request.get("/posts/1");
        const beforeTitle = getRes.body.title;
        //updating the current data to new value
        await request
            .patch("/posts/1")
            .send(data)
            .then((response) => {
                console.log("=====================", response.body);
                expect(response.statusCode).toEqual(200);
                expect(response.body.title).toBe(data.title);
                expect(response.body.title).not.toBe(beforeTitle);
            });
    });
    it("PATCH request with title version 3", (done) => {
        const data = {
            title: "My first post request",
        };
        let beforeTitle = null;//undefined === null , null === object
        // taking data from database as initial value
        request.get("/posts/1").end((err, res) => {
            if (err) return done(err);
            beforeTitle = res.body.title;
            console.log(beforeTitle, "beforeTitle==================");
        });
        //updating the current data to new value
        request
            .patch("/posts/1")
            .send(data)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                console.log(res.body, "================++++++++++++=====");
                expect(res.body.title).toBe(data.title);
                expect(res.body.title).not.toBe(beforeTitle);
                done();
            });
    });
    it("DELETE request", async () => {
        const res = await request.delete("/posts/1");
        console.log(res.body, "----------------body--------------------");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({});
    });
});