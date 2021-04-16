import request from "supertest";
import { serverRun } from "../server";
import { Express } from "express";
import mongoose from "mongoose";
import { mongod } from "../src/bdd/connect";

describe("USER TEST", () => {
  let app: Express;

  beforeAll(async () => {
    app = await serverRun();
  });
  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  describe("USER LOGIN", () => {
    // it("Should return 200", async ()=>{
    //     const input = {
    //         username:"peyrache.dorian@gmail.com",
    //         password:"zerlkdfndkd122"
    //     }
    //    await request(app)
    //         .post('/user')
    //         .send(input)
    //         // .expect('Content-Type', /json/)
    //         // .expect(201)
    //         .then((response)=>{
    //             expect(response.body.success).toBe(true);
    //         })
    //     await request(app)
    //         .post('/user/login')
    //         .send(input)
    //         // .expect('Content-Type', /json/)
    //         // .expect(200)
    //         .expect((response)=>{
    //             console.log(response.body);
    //             expect(response.body.success).toBe(true)
    //         })
    // })
    it("Should return 400 with email-not-set", async () => {
      const input = {
        password: "test1324",
      };
      await request(app)
        .post("/user/login")
        .send(input)
        // .expect('Content-Type', /json/)
        // .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("email-not-set");
        });
    });
    it("Should return 400 with email-not-valid", async () => {
      const input = {
        username: "test1324",
        password: "test1234",
      };
      await request(app)
        .post("/user/login")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("email-not-valid");
        });
    });
    it("Should return 400 with password-not-set", async () => {
      const input = {
        username: "test@test.fr",
      };
      await request(app)
        .post("/user/login")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("password-not-set");
        });
    });
  });
  describe("USER SIGN UP", () => {
    // it("should return 200", async ()=>{
    //     const input = {
    //         username:"peyrache.dorian@gmail.com",
    //         password:"zerlkdfndkd122"
    //     }
    //     await request(app)
    //         .post('/user')
    //         .send(input)
    //         .expect('Content-Type', /json/)
    //         .expect(201)
    //         .then((response)=>{
    //             expect(response.body.success).toBe(true)
    //         })
    // })
    it("Should return 400 with email-not-set", async () => {
      const input = {
        password: "test1324",
      };
      await request(app)
        .post("/user")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("email-not-set");
        });
    });
    it("Should return 400 with email-not-valid", async () => {
      const input = {
        username: "test1324",
        password: "test1234",
      };
      await request(app)
        .post("/user")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("email-not-valid");
        });
    });

    it("Should return 400 with password-not-set", async () => {
      const input = {
        username: "test@test.fr",
      };
      await request(app)
        .post("/user")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("password-not-set");
        });
    });
    it("Should return 400 with password-min-not-reach", async () => {
      const input = {
        username: "test@test.fr",
        password: "test",
      };
      await request(app)
        .post("/user")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("password-min-not-reach");
        });
    });

    // it("should return 200", async ()=>{
    //     const input = {
    //         username:"peyrache.dorian@gmail.com",
    //         password:"zerlkdfndkd122"
    //     }
    //     await request(app)
    //         .post('/user')
    //         .send(input)
    //         .expect('Content-Type', /json/)
    //         .expect(201)
    //         .then((response)=>{
    //             expect(response.body.success).toBe(true)
    //         })
    // })
  });
});
