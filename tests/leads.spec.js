// @ts-check
//import { test, expect } from '@playwright/test';
const { test, expect } = require('@playwright/test');
import { LandingPage } from './pages/LandingPage.js';

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const landingPage = new LandingPage(page);
  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!';

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('qualquer coisa', 'qualquer@email.com');
  await landingPage.toastHaveText(message);

});

test('não deve cadastrar com e-mail incorreto', async ({ page }) => {

  const landingPage = new LandingPage(page);
  const message = 'Email incorreto';

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('qualquer coisa', 'incorreto.email.com');
  await landingPage.alertMessage(message);

});

test('não deve cadastrar quando não informa nome', async ({ page }) => {

  const landingPage = new LandingPage(page);
  const message = 'Campo obrigatório';

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', 'qualquer@email.com');
  await landingPage.alertMessage(message);

});

test('não deve cadastrar quando não informa e-mail', async ({ page }) => {

  const landingPage = new LandingPage(page);
  const message = 'Campo obrigatório';

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('qualquer coisa', '');
  await landingPage.alertMessage(message);

});

test('não deve cadastrar quando nenhum campo é informado', async ({ page }) => {

  const landingPage = new LandingPage(page);
  const message = 'Campo obrigatório';

  await landingPage.visit();
  await landingPage.openLeadModal();
  await landingPage.submitLeadForm('', '');
  await landingPage.alertMessage([message, message]);

});

