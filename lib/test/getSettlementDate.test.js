const request = require("supertest")("http://127.0.0.1:3000/api");
const expect = require("chai").expect;


describe("GET /settlementDate with WeekendDays", function () {
  it("returns true if its a business day", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        initialDate: 20230323,
        delay: 2
      })
    console.log(response);
    expect(response.status).to.eql(200);
    expect(response.body).to.not.be.empty;
    expect(response.body).to.have.property('initialQuery');
    expect(response.body.initialQuery).to.include.keys("initialDate", "delay");
    expect(response.body).to.have.property('results');
    expect(response.body.results).to.include.keys("businessDate", "holidayDays", "totalDays", "weekendDays");
    expect(response.body.initialQuery.initialDate).to.eql('20230323');
    expect(response.body.initialQuery.delay).to.eql('2');
    expect(response.body.results.holidayDays).to.eql(0);
    expect(response.body.results.totalDays).to.not.equal(0);
    expect(response.body.results.weekendDays).to.not.equal(0);
  });
});

describe("GET /settlementDate with holidayDays", function () {
  it("returns true if its a business day", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        initialDate: 20230529,
        delay: 3
      })
    expect(response.status).to.eql(200);
    console.log(response);
    expect(response.body).to.not.be.empty;
    expect(response.body).to.have.property('initialQuery');
    expect(response.body.initialQuery).to.include.keys("initialDate", "delay");
    expect(response.body).to.have.property('results');
    expect(response.body.results).to.include.keys("businessDate", "holidayDays", "totalDays", "weekendDays");
    expect(response.body.results.holidayDays).to.not.equal(0);
    expect(response.body.results.totalDays).to.not.equal(0);
    expect(response.body.results.weekendDays).to.eql(0);
  });
});

describe("GET /settlementDate with holidayDays and weekendDays", function () {
  it("returns true if its a business day", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        initialDate: 20221122,
        delay: 3
      })
    expect(response.status).to.eql(200);
    console.log(response);
    expect(response.body).to.not.be.empty;
    expect(response.body.initialQuery).to.include.keys("initialDate", "delay");
    expect(response.body.results).to.include.keys("businessDate", "holidayDays", "totalDays", "weekendDays");
    expect(response.body.results.holidayDays).to.not.equal(0);
    expect(response.body.results.totalDays).to.not.equal(0);
    expect(response.body.results.weekendDays).to.not.equal(0);
  });
});

describe("GET /settlementDate error for not passing delay", function () {
  it("returns false for not passing delay", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        initialDate: 20220715
      })
    expect(response.status).to.eql(500);
    expect(response.body).to.be.empty;
  });
});


describe("GET /settlementDate error for not passing initialDate", function () {
  it("returns  false for not passing initialDate", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        delay: 6
      })
    console.log(response);
    expect(response.body.results.businessDate).to.have.eqls(null);
  });
});


describe("GET /settlementDate error for passing invalid initialDate", function () {
  it("returns false for passing invalid initialDate", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        initialDate: 20231538,
        delay: 6
      })
    console.log(response);
    expect(response.body.results.businessDate).to.have.eqls(null);

  });
});


describe("GET /settlementDate error for passing invalid delay", function () {
  it("returns false for passing invalid delay", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        initialDate: 20230323,
        delay: -6
      })
    console.log(response);
    expect(response.body.results.businessDate).to.have.eqls(null);
  });
});


describe("GET /settlementDate error for passing invalid delay and invalid initaldate", function () {
  it("returns false for passing invalid delay and invalid initaldate", async function () {
    const response = await request
      .get("/v1/settlementDate")
      .query({
        initialDate: 20231538,
        delay: -1
      })
    console.log(response);
    expect(response.body.results.businessDate).to.have.eqls(null);
  });
});