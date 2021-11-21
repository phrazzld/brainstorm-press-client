const BASE_URL = "http://localhost:3000";
const ALICE = {
  EMAIL: "alice@test.net",
  PASSWORD: "alice",
  LN: {
    HOST: "127.0.0.1:10001",
    CERT:
      "2d2d2d2d2d424547494e2043455254494649434154452d2d2d2d2d0a4d4949434a6a43434163796741774942416749514f744f7161464a695257733157517934663836585944414b42676771686b6a4f50515144416a41784d5238770a485159445651514b45785a73626d5167595856306232646c626d56795958526c5a43426a5a584a304d51347744415944565151444577566862476c6a5a5441650a467730794d5445774d6a49774d5449784d446861467730794d6a45794d5463774d5449784d4468614d444578487a416442674e5642416f54466d78755a4342680a645852765a3256755a584a686447566b49474e6c636e5178446a414d42674e5642414d544257467361574e6c4d466b77457759484b6f5a497a6a3043415159490a4b6f5a497a6a30444151634451674145464f41416551756a465a466335394b7877483158384759626d5752366a6b6856744679666a6d4273356773574e5249430a63655666336f4450394f4162514f6b37526a786c3766476e36316e487953665872766b4e37614f4278544342776a414f42674e56485138424166384542414d430a41715177457759445652306c42417777436759494b775942425155484177457744775944565230544151482f42415577417745422f7a416442674e56485134450a46675155444e45545172495649446368576a6261784649366f55437566513877617759445652305242475177596f4946595778705932574343577876593246730a6147397a644949465957787059325743446e4276624746794c5734304c57467361574e6c67675231626d6c3467677031626d6c346347466a61325630676764690a64575a6a623235756877522f4141414268784141414141414141414141414141414141414141414268775373464141464d416f4743437147534d343942414d430a413067414d4555434951444b48427175585272366a6165443442306c774667436945534c64576d386b79366141796952364556746d51496762696162706c67540a79592b346c3736447a71574832454d536e635a4c594f77574e44506e7946554d4157303d0a2d2d2d2d2d454e442043455254494649434154452d2d2d2d2d0a",
    MACAROON:
      "0201036c6e640267030a10fd411edacb4d02ecaebc7cb2ba90bccd1201301a0c0a04696e666f1204726561641a170a08696e766f69636573120472656164120577726974651a160a076d657373616765120472656164120577726974651a100a086f6666636861696e120472656164000006202922dcca3b07acbe09572a2aa949b6273de9b0e0d17df43658c98c69f4650a75",
  },
};

const goToSettings = () => {
  cy.get("#profile-header-button").click();
  cy.contains("Settings").click();
};

const disconnectNode = () => {
  goToSettings();
  cy.contains("Disconnect Lightning Node").click();
};

const loginUser = (email: string, password: string) => {
  cy.visit(BASE_URL);
  cy.contains("Login").click();
  cy.get("#email").type(email).should("have.value", email);
  cy.get("#password").type(password).should("have.value", password);
  cy.get("button").contains("Log In").click();
};

before(() => {
  // Cleanup: disconnect Alice's LN node
  loginUser(ALICE.EMAIL, ALICE.PASSWORD);
  disconnectNode();

  // Connect Alice's LN node
  cy.contains("Connect to Lightning").click();
  cy.url().should("include", "/connect-to-lightning");
  cy.get("#host").type(ALICE.LN.HOST).should("have.value", ALICE.LN.HOST);
  cy.get("#tls-hex-cert")
    .click()
    .then(($input) => {
      $input.text(ALICE.LN.CERT);
      $input.val(ALICE.LN.CERT);
      cy.get("#tls-hex-cert").type(" {backspace}");
    })
    .should("have.value", ALICE.LN.CERT);
  cy.get("#macaroon")
    .click()
    .then(($input) => {
      $input.text(ALICE.LN.MACAROON);
      $input.val(ALICE.LN.MACAROON);
      cy.get("#macaroon").type(" {backspace}");
    })
    .should("have.value", ALICE.LN.MACAROON);
  cy.contains(
    "lncli bakemacaroon info:read offchain:read invoices:read invoices:write"
  );
  cy.contains("Cancel");
  cy.contains("Submit").click();
  cy.url().should("include", "/settings");
  cy.contains("Disconnect Lightning Node");
  cy.get("#logout-header-button").click();
});

describe("Unauthenticated", () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
  });

  it("'Brainstorm Press - Home' should be the homepage title", () => {
    cy.title().should("eq", "Home - Brainstorm Press");
  });

  it("shows five posts", () => {
    cy.get("#posts-list-container").children().should("have.length", 5);
  });

  it("clicking the 'Free' toggle should filter for free posts", () => {
    cy.get(".post-card").contains("Premium").should("exist");
    cy.get("#free-posts-search-toggle").click();
    cy.get(".post-card").contains("Premium").should("not.exist");
    cy.get("#posts-list-container").children().should("have.length", 5);
  });

  it("shows posts matching the search term entered in the search bar", () => {
    cy.get("#search-bar").type("treasure").should("have.value", "treasure");
    cy.get("#posts-list-container").children().should("have.length", 1);
    cy.contains("Buried Treasure");
  });

  it("login and signup can be reached", () => {
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.contains("Sign Up").click();
    cy.url().should("include", "/signup");
    cy.contains("Log in").click();
    cy.url().should("include", "/login");
  });

  describe("going to post page", () => {
    it("shows post content when free post card is clicked", () => {
      cy.get(".post-card").contains("Free").click();
      cy.url().should("include", "/posts/");
      cy.get("#post-container").should("exist");
    });

    it("shows login prompt when premium post card is clicked and author has LN node connected", () => {
      cy.get(".post-card").contains("Premium").click();
      cy.url().should("include", "/posts/");
      cy.get("#post-container").should("not.exist");
      cy.contains("You have to be logged in to read paywalled posts.");
      cy.get("a").contains("Log in").click();
      cy.url().should("include", "/login");
    });

    it("shows premium content when author does not have an LN node connected");
  });

  it("should go to user blog when author name is clicked", () => {
    cy.get(".post-card a")
      .first()
      .invoke("text")
      .then((text) => {
        cy.get(".post-card a").first().click();
        cy.url().should("include", `/users/${text}/blog`);
        cy.contains("Subscribe");
      });
  });

  it("should prompt you to log in when you try to subscribe to an author");
});

describe("Authenticated", () => {
  const TEST_USER = {
    username: "cypress-tester",
    email: "cypress@test.net",
    password: "test-password",
  };

  // Clean up state, and create a user before this test suite
  before(() => {
    loginUser(TEST_USER.email, TEST_USER.password);
    // Go to settings page
    cy.url().should("eq", `${BASE_URL}/`);
    goToSettings();
    // Delete user
    cy.contains("Delete Account").click();
    cy.contains("Are you sure you want to delete your account?");
    cy.get("#delete-account").click();
    // Should get redirected to homepage after deleting account
    cy.url().should("eq", `${BASE_URL}/`);
    // Confirm the user cannot login
    loginUser(TEST_USER.email, TEST_USER.password);
    cy.contains("Invalid credentials");

    // Create test user
    cy.visit(BASE_URL);
    cy.contains("Login").click();
    cy.contains("Sign Up").click();
    // Fill out form
    cy.get("#username")
      .type(TEST_USER.username)
      .should("have.value", TEST_USER.username);
    cy.get("#email")
      .type(TEST_USER.email)
      .should("have.value", TEST_USER.email);
    cy.get("#password")
      .type(TEST_USER.password)
      .should("have.value", TEST_USER.password);
    // Submit form
    cy.get("button").contains("Sign Up").click();
    cy.get("#logout-header-button").click();
    // Should be redirected to homepage after signup
    cy.url().should("eq", `${BASE_URL}/`);
  });

  beforeEach(() => {
    loginUser(TEST_USER.email, TEST_USER.password);
    // Should be redirected to homepage after login
    cy.url().should("eq", `${BASE_URL}/`);
  });

  it("should show action links in header", () => {
    cy.get("#create-post-header-button").should("exist");
    cy.get("#subs-header-button").should("exist");
    cy.get("#profile-header-button").should("exist");
    cy.get("#logout-header-button").should("exist");
  });

  it("logout and login via the header should work", () => {
    cy.get("#logout-header-button").click();
    cy.url().should("eq", `${BASE_URL}/`);
    cy.contains("Login").should("exist");
    cy.get("#create-post-header-button").should("not.exist");
    cy.get("#subs-header-button").should("not.exist");
    cy.get("#profile-header-button").should("not.exist");
    cy.get("#logout-header-button").should("not.exist");
    loginUser(TEST_USER.email, TEST_USER.password);
    cy.url().should("eq", `${BASE_URL}/`);
  });

  describe("subscriptions", () => {
    it("subscribes to an author when you click the subscribe button on their blog", () => {
      cy.get(".post-card a")
        .first()
        .invoke("text")
        .then((text) => {
          cy.get(".post-card a").first().click();
          cy.url().should("include", `/users/${text}/blog`);
          cy.contains("Subscribe").click();
          cy.contains("Unsubscribe");
        });
    });

    it(
      "subs page should show a feed of posts from authors you're subscribed to"
    );

    it(
      "unsubscribes to an author when you click the unsubscribe button on their blog"
    );
  });

  describe("managing posts", () => {
    it("creates a new draft post");

    it("drafts page should show a feed of your draft posts");

    it("publishes a draft");

    it("deletes a draft post");

    it("deletes a published post");

    it("edits a draft");

    it("edits a published post");
  });

  it("settings page should let you view and edit your user info");

  describe("LN", () => {
    it("settings page should let you connect and disconnect your LN node");

    it("premium posts are paywalled with a Lightning invoice");

    it(
      "paying an invoice lets you access all premium content by that author for a month"
    );
  });
});
