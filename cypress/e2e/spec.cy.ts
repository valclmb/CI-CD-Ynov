// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
describe("Home page spec", () => {
  it("deployed react app to local host", () => {
    cy.visit("http://localhost:5173/CI-CD-Ynov/");
    cy.contains("Liste des utilisateurs");
  });

  it("open modal and create user", () => {
    // Définir les données de test
    const userData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      birthDate: "2001-05-02",
      city: "City",
      zipCode: "12345",
    };

    // Stocker les utilisateurs existants
    const users = [];

    // Intercepter la requête POST et ajouter les données au tableau d'utilisateurs
    cy.intercept("POST", "/users*", (req) => {
      expect(req.body).to.include(userData);
      // Ajouter les nouvelles données au tableau des utilisateurs
      users.push(req.body);
      req.reply({
        statusCode: 201,
        body: {
          success: true,
          message: "User created",
        },
      });
    }).as("postUser");

    // Intercepter la requête GET et renvoyer les utilisateurs mis à jour
    cy.intercept("GET", "/users*", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          users: users, // Renvoie les utilisateurs incluant ceux ajoutés avec POST
        },
      });
    }).as("getUsers");

    cy.visit("http://localhost:5173/CI-CD-Ynov/");
    cy.get("button").contains("Ajouter un utilisateur").click();

    // Utiliser les variables pour les valeurs de test
    cy.get("input[name='firstName']").type(userData.firstName);
    cy.get("input[name='lastName']").type(userData.lastName);
    cy.get("input[name='email']").type(userData.email);
    cy.get("input[name='birthDate']").type(userData.birthDate);
    cy.get("input[name='city']").type(userData.city);
    cy.get("input[name='zipCode']").type(userData.zipCode);

    cy.get("button").contains("Enregistrer").click();

    // Attendre que la requête POST soit terminée
    cy.wait("@postUser");

    // Attendre que la requête GET soit effectuée et vérifier les données affichées
    cy.wait("@getUsers");

    // Vérifier que les données sont affichées correctement
    cy.contains(userData.lastName.toUpperCase());
    cy.contains(userData.firstName);
    cy.contains(userData.email);
    cy.contains(userData.birthDate);
    cy.contains(userData.city);
    cy.contains(userData.zipCode);
  });
});
