
beforeEach(() => {
	Cypress.on('uncaught:exception', () => false); // returning false here prevents Cypress from failing the test
	cy.intercept({ resourceType: /^(xhr|fetch)$/ }, { statusCode: 200, body: { data: 'fake data' } });
	cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
});

Cypress.Commands.add('react', (dataReactToolbox: string, options?: { hasText: string }) => {
	const selector = `[data-react-toolbox=${dataReactToolbox}]`;
	if (options?.hasText) {
		cy.contains(selector, options.hasText);
	} else {
		cy.get(selector);
	}
});
