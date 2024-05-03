// DO NOT CHANGE THIS FILE!

const apiUrl = `${Cypress.env("apiUrl")}`;

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

describe("Transaction Management Backend - Level 2", () => {
  it("Provides a functional healthcheck", () => {
    cy.request({
      failOnStatusCode: false,
      method: "GET",
      url: `${apiUrl}/ping`,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should create a transaction, read it, and fetch the updated account balance", () => {
    const accountId = uuid();
    let transactionId;
    cy.request({
      failOnStatusCode: false,
      method: "POST",
      url: `${apiUrl}/transactions`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        account_id: accountId,
        amount: 7,
      },
    })
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.transaction_id).to.not.be.undefined;
        transactionId = response.body.transaction_id;
        cy.request({
          failOnStatusCode: false,
          method: "GET",
          url: `${apiUrl}/transactions/${transactionId}`,
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.transaction_id).to.eq(transactionId);
          expect(response.body.account_id).to.eq(accountId);
          expect(response.body.amount).to.eq(7);
        });
      })
      .request({
        failOnStatusCode: false,
        method: "GET",
        url: `${apiUrl}/accounts/${accountId}`,
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.account_id).to.eq(accountId);
        expect(response.body.balance).to.eq(7);
      });
  });

  it("should create transactions with negative amounts", () => {
    const accountId = uuid();
    let transactionId;

    cy.request({
      failOnStatusCode: false,
      method: "POST",
      url: `${apiUrl}/transactions`,
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        account_id: accountId,
        amount: 4,
      },
    })
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.transaction_id).to.not.be.undefined;
        transactionId = response.body.transaction_id;
      })
      .request({
        failOnStatusCode: false,
        method: "GET",
        url: `${apiUrl}/accounts/${accountId}`,
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.account_id).to.eq(accountId);
        expect(response.body.balance).to.eq(4);
      })
      .request({
        failOnStatusCode: false,
        method: "POST",
        url: `${apiUrl}/transactions`,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          account_id: accountId,
          amount: -3,
        },
      })
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.transaction_id).to.not.be.undefined;
        transactionId = response.body.transaction_id;
      })
      .request({
        // read account balance
        failOnStatusCode: false,
        method: "GET",
        url: `${apiUrl}/accounts/${accountId}`,
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.account_id).to.eq(accountId);
        expect(response.body.balance).to.eq(1);
      });
  });
});
