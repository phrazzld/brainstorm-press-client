const BASE_URL = "http://localhost:3000";

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

    it("shows login prompt when premium post card is clicked and author has LND node connected", () => {
      cy.get(".post-card").contains("Premium").click();
      cy.url().should("include", "/posts/");
      cy.get("#post-container").should("not.exist");
      cy.contains("You have to be logged in to read paywalled posts.");
      cy.get("a").contains("Log in").click();
      cy.url().should("include", "/login");
    });

    it("shows premium content when author does not have an LND node connected");
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

  // Create a user before this test suite
  before(() => {
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
    cy.contains("Logout").click();
    // Should be redirected to homepage after signup
    cy.url().should("eq", `${BASE_URL}/`);
  });

  // Delete the user after this test suite
  after(() => {
    cy.visit(BASE_URL);
    // Login
    cy.contains("Login").click();
    cy.get("#email")
      .type(TEST_USER.email)
      .should("have.value", TEST_USER.email);
    cy.get("#password")
      .type(TEST_USER.password)
      .should("have.value", TEST_USER.password);
    cy.get("button").contains("Log In").click();
    // Go to settings page
    cy.url().should("eq", `${BASE_URL}/`);
    cy.get("#settings-header-button").click();
    // Delete user
    cy.contains("Delete Account").click();
    cy.contains("Are you sure you want to delete your account?");
    cy.get("#delete-account").click();
    // Should get redirected to homepage after deleting account
    cy.url().should("eq", `${BASE_URL}/`);
    // Confirm the user cannot login
    cy.contains("Login").click();
    cy.get("#email")
      .type(TEST_USER.email)
      .should("have.value", TEST_USER.email);
    cy.get("#password")
      .type(TEST_USER.password)
      .should("have.value", TEST_USER.password);
    cy.get("button").contains("Log In").click();
    cy.contains("Invalid credentials");
  });

  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.contains("Login").click();
    // Fill out for
    cy.get("#email")
      .type(TEST_USER.email)
      .should("have.value", TEST_USER.email);
    cy.get("#password")
      .type(TEST_USER.password)
      .should("have.value", TEST_USER.password);
    // Submit form
    cy.get("button").contains("Log In").click();
    // Should be redirected to homepage after login
    cy.url().should("eq", `${BASE_URL}/`);
  });

  it("should show action links in header", () => {
    cy.get("#create-post-header-button").should("exist");
    cy.get("#drafts-header-button").should("exist");
    cy.get("#subs-header-button").should("exist");
    cy.get("#settings-header-button").should("exist");
  });

  it("logout and login via the header should work", () => {
    cy.contains("Logout").click();
    cy.url().should("eq", `${BASE_URL}/`);
    cy.contains("Login").should("exist");
    cy.contains("Logout").should("not.exist");
    cy.get("#create-post-header-button").should("not.exist");
    cy.get("#drafts-header-button").should("not.exist");
    cy.get("#subs-header-button").should("not.exist");
    cy.get("#settings-header-button").should("not.exist");
    cy.contains("Login").click();
    cy.get("#email")
      .type(TEST_USER.email)
      .should("have.value", TEST_USER.email);
    cy.get("#password")
      .type(TEST_USER.password)
      .should("have.value", TEST_USER.password);
    cy.get("button").contains("Log In").click();
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

  describe("settings", () => {
    it("settings page should let you view and edit your user info");

    it("settings page should let you connect and disconnect your LND node");

    it("settings page should let you delete your account");
  });

  describe("LND", () => {
    it("premium posts are paywalled with a Lightning invoice");

    it(
      "paying an invoice lets you access all premium content by that author for a month"
    );
  });
});
