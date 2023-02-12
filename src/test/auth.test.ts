import { describe } from "node:test";
import request from "supertest";
import app from "..";
import { expect } from "chai";

let bearerToken: string = "";

describe("POST /v1/api/auth/login", () => {
  it("login", (done) => {
    request(app)
      .post("/v1/api/auth/login")
      .send({
        username: "admin",
        password: "MnMonherdene0529;",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        const { token } = res.body;
        expect(token).to.be.a("string");
        bearerToken = token;
        done();
      });
  });
});

describe("GET /v1/api/auth/profile", () => {
  it("profile", (done) => {
    request(app)
      .get("/v1/api/auth/profile")
      .set("Authorization", `Bearer ${bearerToken}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an("Object");
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("username");
        expect(res.body).to.have.property("name");
        expect(res.body).to.have.property("created_at");
        expect(res.body).to.have.property("updated_at");
        done();
      });
  });
});
