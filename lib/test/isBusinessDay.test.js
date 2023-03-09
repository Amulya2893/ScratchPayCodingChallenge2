const request = require("supertest")("http://127.0.0.1:3000/api");
const expect = require("chai").expect;

describe("GET /isBusinessDay for a business day", function () {
  it("returns true for business day", async function () {
    const response = await request
      .get("/v1/isBusinessDay")
      .query({
        date: '2023-07-14'
      })
    expect(response.status).to.eql(200);
    expect(response.body).to.have.property('ok');
    expect(response.body).to.have.property('results');
    expect(response.body.ok).to.be.true;
    expect(response.body.results).to.be.true;

  });
});
describe("GET /isBusinessDay for US holiday", function () {
  it("returns false for US holiday", async function () {
    const response = await request
      .get("/v1/isBusinessDay")
      .query({
        date: '2023-07-04'
      })
    expect(response.status).to.eql(200);
    expect(response.body.ok).to.be.true;
    expect(response.body.results).to.be.false;

  });
});
describe("GET /isBusinessDay for weekend", function () {
  it("returns false for weekend", async function () {
    const response = await request
      .get("/v1/isBusinessDay")
      .query({
        date: '2023-04-01'
      })
    expect(response.status).to.eql(200);
    expect(response.body.ok).to.be.true;
    expect(response.body.results).to.be.false;

  });
});
describe("GET /isBusinessDay error when date is not sent", function () {
  it("returns error when date is not passed", async function () {
    const response = await request
      .get("/v1/isBusinessDay")
    expect(response.status).to.eql(200);
    expect(response.body.ok).to.be.false;
    expect(response.body).to.have.property('ok');
    expect(response.body).to.have.property('errorMessage');
    expect(response.body.errorMessage).to.eql("A valid date is required");

  });
});
describe("GET /isBusinessDay error when invalid date is sent", function () {
  it("returns error when invalid date is passed", async function () {
    const response = await request
      .get("/v1/isBusinessDay")
    expect(response.status).to.eql(200);
    expect(response.body.ok).to.be.false;
    expect(response.body.results).to.be.false;
  });
});