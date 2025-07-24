const { expect } = require('@playwright/test');
export class LandingPage {

    constructor(page) {
        this.page = page
    }

    async visit () {
        await this.page.goto('http://localhost:3000');
    }

    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera');
    }

    async submitLeadForm(name, email) {
        await this.page.locator('input[name="name"]').fill(name); // Buscar pelo elemento name, caso não tenha o id. Com id seria: page.locator('#name')
        await this.page.getByPlaceholder('Seu email principal').fill(email);

        // Estratégia de escopo, clica no botão que está dentro do modal
        await this.page.getByTestId('modal').getByRole('button', { name: /entrar na fila/ }).click();

    }

    async toastHaveText(message) {
          /*
          //Clicar no modal - truque para pegar o html do modal
          await page.getByText('Agradecemos por compartilhar').click(); 
        
          // page.content() pega o html deste momento
          const content = await page.content(); 
        
          // exibe no console só para pegar o html do modal que some rápido e ver a msg
          console.log(content);
          */
        
        const toast = this.page.locator('.toast')

        await expect(toast).toHaveText(message)
        await expect(toast).toBeHidden({timeout: 5000});
        
    }

    async alertMessage(target) {
        await expect(await this.page.locator('.alert')).toHaveText(target);
    }
}