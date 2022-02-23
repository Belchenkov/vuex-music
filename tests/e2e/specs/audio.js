describe('Audio Player', () => {
  it('Plays audio', () => {
    cy.visit('/');
    cy.get('.composition-name:first')
      .click();
    cy.get('#play-button')
      .click();
    cy.wait(5000);
    cy.get('#player-play-button')
      .click();
  });
});
