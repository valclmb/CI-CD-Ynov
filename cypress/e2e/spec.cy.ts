describe("Home page spec", () => {
  it("deployed react app to local host", () => {
    cy.visit("http://localhost:5173/CI-CD-Ynov/");
    cy.contains("Liste des utilisateurs");
  });

  // it("open modal and create user", () => {
  //   cy.visit("http://localhost:5173/CI-CD-Ynov/");
  //   cy.get("button").contains("Ajouter un utilisateur").click();

  //   cy.get("input[name='firstName']").type("lastName");
  //   cy.get("input[name='lastName']").type("firstName");
  //   cy.get("input[name='email']").type("firstname@mail.com");
  //   cy.get("input[name='birthDate']").type("2001-05-02");
  //   cy.get("input[name='city']").type("City");
  //   cy.get("input[name='zipCode']").type("12345");

  //   cy.get("button").contains("Enregistrer").click();
  //   cy.contains("Utilisateur créé !");
  // });
});
