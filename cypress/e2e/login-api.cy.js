describe('Testes em API', () => {
    //caminho feliz
    context('Testes em rotas com usuário autorizado', () => {
        beforeEach(() => {
            cy.loginApi(Cypress.env('email'), Cypress.env('senha'))
        })
    
    
        it('GET via url front para teste em resposta da home', () => {
        cy.request("GET", "/").should((response) => {
            expect(response.status).to.eq(200);
        });

        it('Deve verificar se o token de autenticação é retornado após login via POST na API', () => {
            cy.get('@token').should('exist');
        })
    });
    })
})