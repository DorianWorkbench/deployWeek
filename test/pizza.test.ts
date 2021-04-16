import { serverRun } from "../server";
import request from "supertest";
import { Express } from "express";

describe("PIZZA VALIDATION", () => {
  let app: Express;

  beforeAll(async () => {
    app = await serverRun();
  });

  describe("ADDING PIZZA", () => {
    it("Should return status 400 with cost-not-set", async () => {
      const input = {
        description: "Une pizza marrrante",
        pizzaName: "Le test",
      };
      await request(app)
        .post("/pizza")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("cost-not-set");
        });
    });
    it("Should return status 400 with description-not-set", async () => {
      const input = {
        cost: 17,
        pizzaName: "Le test",
      };
      await request(app)
        .post("/pizza")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("description-not-set");
        });
    });

    it("Should return status 400 with description-not-set", async () => {
      const input = {
        cost: 17,
        pizzaName: "Le test",
      };
      await request(app)
        .post("/pizza")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("description-not-set");
        });
    });
    it("Should return status 400 with pizzaName-not-set", async () => {
      const input = {
        cost: 17,
        description: "Une pizza marrrante",
      };
      await request(app)
        .post("/pizza")
        .send(input)
        .expect("Content-Type", /json/)
        .expect(400)
        .then((response) => {
          expect(response.body.success).toBe(false);
          expect(response.body.err).toBe("pizzaName-not-set");
        });
    });
  });
  // describe('REMOVE PIZZA',()=>{
  //     it('Should return status 400 with id-not-set', async ()=>{
  //         const input = {
  //         }
  //         const result = await request(app)
  //             .delete('/pizza')
  //             .send(input)
  //             .expect('Content-Type', /json/)
  //             .expect(400)
  //             .then((response)=>{
  //                 expect(response.body.success).toBe(false)
  //                 expect(response.body.err).toBe('id-not-set')
  //             });
  //         console.log(result);
  //     })
  // })
});
