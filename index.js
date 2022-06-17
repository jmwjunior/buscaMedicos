const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');
console.log("Bem vindo a busca de telefones da Colih");


async function robo() {
 const browser = await puppeteer.launch({headless: true });
 const page = await browser.newPage();
 const qualPagina = readlineSync.question('Quer consultar no Santa Casa ou no CNES?') || "Santa Casa";
 //const nmEspecialidade = readlineSync.question('Qual especialidade?') || "cancerologia"
    if (qualPagina == "Santa Casa") {
        const nmEspecialidade = readlineSync.question('Qual especialidade?') || "cancerologia"
         const qualquerUrl =`https://www.santacasa.org.br/especialidades-medicas/${nmEspecialidade}`
         await page.goto(qualquerUrl);

         //await page.screenshot({ path: 'example.png' });
         resultado = await page.evaluate(() => {
     
         return document.querySelector("#specialties > div > div > div > div.col-sm-12.col-md-8 > div.row.mt-2 > div > table > tbody").textContent
         // document.querySelector(`#specialties > div > div > div > div.col-sm-12.col-md-8 > div.row.mt-2 > div > table > tbody > tr:nth-child(10) > th:nth-child(2)`).textContent
            });
            const res = resultado.replace(/\s+/g," ");   
            const resu = res.split("CRM");    
            console.log(resu);
        } else {
         const qualquerUrl =`http://cnes.datasus.gov.br/pages/profissionais/consulta.jsp`
         await page.goto(qualquerUrl);
         await page.screenshot({ path: 'example.png' });
         resultado = await page.evaluate(() => {
     
         return document.querySelector("#inlineRadio3") 
         //document.querySelector("#specialties > div > div > div > div.col-sm-12.col-md-8 > div.row.mt-2 > div > table > tbody").textContent
         // document.querySelector(`#specialties > div > div > div > div.col-sm-12.col-md-8 > div.row.mt-2 > div > table > tbody > tr:nth-child(10) > th:nth-child(2)`).textContent
            });

        }

   
    await browser.close();
}
robo()


