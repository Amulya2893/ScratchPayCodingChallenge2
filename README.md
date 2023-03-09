# Business Day Checker
Returns the number of business days it will take for a payment to be allocated into an account.

## Run Locally

```
npm install
npm start
```

## API

The entire API is accessible under `/api/v1` and the following endpoints are available:

- `GET /api/v1/settlementDate`
- `GET /api/v1/isBusinessDay`


## Tests
The tests are written in Mocha Chai with supertest framework and are located under `lib/test`
In order to run the tests locally we use command
``` npx mocha <relativepath of test>``` 

Example: ``` npx mocha lib/test/settlementDate.test.js```

## Observations
Tests fail due to inconcsistent error messages when invalid data is sent

