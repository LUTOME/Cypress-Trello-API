import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.APIKEY;
const apiToken = process.env.APITOKEN;

if(!apiKey||!apiToken) {
	throw new Error('Missing auth variables')
};


export default defineConfig({
	// CYPRESS CLOUD : Aquí se configura el project id para ejecutar pruebas en https://cloud.cypress.io
	projectId: '',
	// 1280×720 is considered to be the most suitable screen resolution for the desktop website version:
	viewportWidth: 1280,
	viewportHeight: 720,
	downloadsFolder: 'cypress/downloads',
	videosFolder: 'cypress/videos',
	screenshotsFolder: 'cypress/screenshots',
	screenshotOnRunFailure: true,
	scrollBehavior: 'center',
	// Number of times to retry a failed test. If a number is set, tests will retry in both runMode and openMode:
	retries: process.env.CI ? 2 : 0,
	// Whether Cypress will record a video of the test run when running on headless:
	video: Boolean(process.env.CI),
	// Whether Cypress will watch and restart tests on test file changes:
	watchForFileChanges: false,
	// En Caso de hacer testing en SUT con seguridad web:
	chromeWebSecurity: false,
	// multi-reporters: one report.xml + mochawesome.json per file.
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'cypress.reporter.chrome.json',
	},
	// E2E Testing runner
	e2e: {
		baseUrl: 'https://demoqa.com',
		// Glob pattern to determine what test files to load:
		specPattern: [ 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}' ],
		excludeSpecPattern: [ 'cypress/e2e/**/*.example.cy.js' ],
		experimentalRunAllSpecs: true,
		// Use Cypress plugins:
		setupNodeEvents(on, config) {
			// This is required for the preprocessor to be able to generate JSON reports after each run, and more,
			on('file:preprocessor', createBundler());
			// Make sure to return the config object as it might have been modified by the plugin.
			return config;
		},
	},
	env: {

	},
});
