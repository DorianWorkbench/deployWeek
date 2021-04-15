import request from "supertest";
import {serverRun} from "../server";
import {Express} from "express"; 


describe('USER TEST',()=>{
    let app:Express;
    beforeAll(async ()=>{app = await serverRun()})

    describe('USER LOGIN', ()=>{
        it("Should return 400 with email-not-set", async ()=>{
            const input = {
                password:"test1324"
            }
            await request(app)
                .post('/user/login')
                .send(input)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response)=>{
                    expect(response.body.success).toBe(false)
                    expect(response.body.err).toBe('email-not-set')
                })
        })
        it("Should return 400 with email-not-valid", async ()=>{
            const input = {
                username:"test1324",
                password:"test1234"
            }
            await request(app)
                .post('/user/login')
                .send(input)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response)=>{
                    expect(response.body.success).toBe(false)
                    expect(response.body.err).toBe('email-not-valid')
                })
        })
        it("Should return 400 with password-not-set", async ()=>{
            const input = {
                username:"test@test.fr"
            }
            await request(app)
                .post('/user/login')
                .send(input)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response)=>{
                    expect(response.body.success).toBe(false)
                    expect(response.body.err).toBe('password-not-set')
                });
        })
    })
    describe('USER SIGN UP', ()=>{
        it("Should return 400 with email-not-set", async ()=>{
            const input = {
                password:"test1324"
            }
            await request(app)
                .post('/user')
                .send(input)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response)=>{
                    expect(response.body.success).toBe(false)
                    expect(response.body.err).toBe('email-not-set')
                })
        })
        it("Should return 400 with email-not-valid", async ()=>{
            const input = {
                username:"test1324",
                password:"test1234"
            }
            await request(app)
                .post('/user')
                .send(input)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response)=>{
                    expect(response.body.success).toBe(false)
                    expect(response.body.err).toBe('email-not-valid')
                })
        })
        
        it("Should return 400 with password-not-set", async ()=>{
            const input = {
                username:"test@test.fr"
            }
            await request(app)
                .post('/user')
                .send(input)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response)=>{
                    expect(response.body.success).toBe(false)
                    expect(response.body.err).toBe('password-not-set')
                });
        })
        it("Should return 400 with password-min-not-reach", async ()=>{
            const input = {
                username:"test@test.fr",
                password:"test"
            }
            await request(app)
                .post('/user')
                .send(input)
                .expect('Content-Type', /json/)
                .expect(400)
                .then((response)=>{
                    expect(response.body.success).toBe(false)
                    expect(response.body.err).toBe('password-min-not-reach')
                });
        })
    })
})