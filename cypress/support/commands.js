Cypress.Commands.add('login', (email, senha) => {
    const userEmail = email || Cypress.env('email')
    const userSenha = senha || Cypress.env('senha')
    
    if (!userEmail || !userSenha) {
        throw new Error('Email e senha são obrigatórios. Verifique os parâmetros ou cypress.env.json')
    }
    
    cy.session([userEmail, userSenha], () => {
        cy.visit('/login')
        
        // Aguardar a página carregar completamente
        cy.get('[data-test="inputLoginEmail"]').should('be.visible').clear().type(userEmail)
        cy.get('[data-test="inputLoginSenha"]').should('be.visible').clear().type(userSenha, { log: false })
        
        // Garantir que o botão está visível e habilitado antes de clicar
        cy.get('[data-test="botaoTeste"]')
          .should('be.visible')
          .and('not.be.disabled')
          .click()
        
        // Aguardar o redirecionamento com timeout maior
        cy.location('pathname', { timeout: 10000 }).should('eq', '/dashboard')
        
        // Verificar se realmente chegou no dashboard
        cy.url().should('include', '/dashboard')
    })
})

Cypress.Commands.add('cadastraEspecialista', (nome, email, senha, especialidade, crm, imagem, cep, rua, numero, complemento, estado) => {
    cy.visit('/dashboard')
    cy.contains('Cadastrar especialista').should('be.visible').click()
    cy.get('[data-test="inputEspecialistaNome"]').type(nome)
    cy.get('[data-test="inputEspecialistaEmail"]').type(email)
    cy.get('[data-test="inputEspecialistaSenha"]').type(senha)
    cy.get('[data-test="inputEspecialistaSenhaVerificada"]').type(senha)
    cy.get('[data-test="inputEspecialistaEspecialidade"]').type(especialidade)
    cy.get('[data-test="inputEspecialistaCRM"]').type(crm)
    cy.get('[data-test="inputEspecialistaImagem"]').type(imagem)
    cy.get('[data-test="inputEspecialistaCEP"]').type(cep)
    cy.get('[data-test="inputEspecialistaRua"]').type(rua)
    cy.get('[data-test="inputEspecialistaNumero"]').type(numero)
    cy.get('[data-test="inputEspecialistaComplemento"]').type(complemento)
    cy.get('[data-test="inputEspecialistaEstado"]').type(estado)
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })