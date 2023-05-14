import request from "supertest";
import { app } from "../../app.js";
import { Roles } from "../../common/enums.js";
import config from "../../config.js";
import mongoose from "mongoose";

describe("User Controller", () => {
  let server;

  beforeAll(() => {
    server = app.listen(3001);
    mongoose.connect(config.mongoUrl);
  });

  afterAll(async () => {
    const db = mongoose.connection.db;

    await db.dropDatabase();
    await mongoose.connection.close();
    await server.close();
  });

  it("should return 201 and the user created", async () => {
    const response = await request(app)
      .post("/auth/registration")
      .set("content-type", "application/json")
      .send({
        email: "makaron4ik80@gmail.com",
        password: "test123",
        username: "Bohdan",
        avatar: {
          location: "test",
        },
        role: Roles.Candidate,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.any(String));
  });

  it("should return 400 status ", async () => {
    const response = await request(app)
      .post("/auth/registration")
      .set("content-type", "application/json")
      .send({
        email: "makaron4ik80@gmail.com",
        password: "test",
        username: "Bohdan",
        avatar: {
          location: "test2",
        },
        role: Roles.Recruter,
      });

    expect(response.status).toBe(400);
  });

  it("should return 201 and the user is logged in", async () => {
    const response = await request(app)
      .post("/auth/login")
      .set("content-type", "application/json")
      .send({
        email: "makaron4ik80@gmail.com",
        password: "test123",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(String));
  });
});
