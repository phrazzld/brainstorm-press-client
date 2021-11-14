describe("Unauthenticated", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("shows five posts", () => {
    cy.get("#posts-list-container").children().should("have.length", 5);
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

    it("shows login prompt when premium post card is clicked", () => {
      cy.get(".post-card").contains("Premium").click();
      cy.url().should("include", "/posts/");
      cy.get("#post-container").should("not.exist");
      cy.contains("You have to be logged in to read paywalled posts.");
      cy.get("a").contains("Log in").click();
      cy.url().should("include", "/login");
    });
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
});
