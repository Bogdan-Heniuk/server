import request from "supertest"
import { app } from "../../app.js"
import { Roles } from "../../common/enums.js"
import config from "../../config.js"
import mongoose from "mongoose"

describe("Vacancy Controller", () => {
    let server
    let tokenRecruter
    let tokenCandidate
    let createdVacancyId

    beforeAll(async () => {
        server = app.listen(3001)
        mongoose.connect(config.mongoUrl)

        const userResponseRecruter = await request(app)
            .post("/auth/registration")
            .set("content-type", "application/json")
            .send({
                email: "testoManIntegrationRecruterUnit@example.com",
                password: "12345",
                username: "TestomanRecruter",
                avatar: {
                    location: "test",
                },
                role: Roles.Recruter,
            })
        const userResponseCandidate = await request(app)
            .post("/auth/registration")
            .set("content-type", "application/json")
            .send({
                email: "testoManIntegrationCandidateUnit@example.com",
                password: "12345",
                username: "TestomanCandidate",
                avatar: {
                    location: "test",
                },
                role: Roles.Recruter,
            })

        tokenRecruter = userResponseRecruter._body
        tokenCandidate = userResponseCandidate._body
    })

    afterAll(async () => {
        const db = mongoose.connection.db                // удаление из базы не заботает
        await db.dropDatabase()                          // удаление из базы не заботает

        await mongoose.connection.close()
        await server.close()
    })

    it("should create a new vacancy", async () => {
        const vacancyResponse = await request(app)
            .post("/vacancy")
            .set("Authorization", `${tokenRecruter}`)
            .set("content-type", "application/json")
            .send({
                name: "Frontend Developer",
                shortDescription: "Looking for a frontend developer",
                detailedDescription: "detailedDescription",
                salaryRange: {
                    min: 100,
                    max: 200,
                },
                specialty: "Frontend",
                experience: 1
            })
        expect(vacancyResponse.status).toBe(200)
        expect(vacancyResponse.body).toMatchObject({
            name: "Frontend Developer",
            shortDescription: "Looking for a frontend developer",
            detailedDescription: "detailedDescription",
            salaryRange: {
                min: 100,
                max: 200,
            },
            specialty: "Frontend",
            experience: 1
        })

    })

    it("should return 200 status", async () => {
        const response = await request(app)
            .get("/vacancy/byUser")
            .set("Authorization", `${tokenRecruter}`)

        expect(response.status).toBe(200)
        createdVacancyId = response.body[0]._id
    })

    it("should update a vacancy and return status 200", async () => {
        const response = await request(app)
            .put(`/vacancy/${createdVacancyId}`)
            .set("Authorization", `${tokenRecruter}`)
            .set("content-type", "application/json")
            .send({
                name: "Updated Frontend Developer",
                shortDescription: "Updated Looking for a frontend developer",
                detailedDescription: "Updated test description",
            })
        // console.log('response.body::', response)
        expect(response.status).toBe(200);
        expect(response.request._data.name).toBe("Updated Frontend Developer");
        expect(response.request._data.shortDescription).toBe("Updated Looking for a frontend developer");
        expect(response.request._data.detailedDescription).toBe("Updated test description");
    })

    it("should return 200 status for getById", async () => {
        const response = await request(app)
            .get(`/vacancy/${createdVacancyId}`)
        expect(response.status).toBe(200);
    })

    it("should return 200 status for byUser", async () => {
        const response = await request(app)
            .get("/vacancy/byUser")
            .set("Authorization", `${tokenRecruter}`)
    
        expect(response.status).toBe(200)
    })
    


    it("should return 200 status for filter", async () => {
        const response = await request(app)
            .post('/vacancy/filter')
            .set("Authorization", `${tokenCandidate}`)
            .set("content-type", "application/json")
            .send({
                filter: ["specialty"],
            })
        expect(response.status).toBe(200);
    })








})
