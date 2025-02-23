import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(60000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // использовать, если хотите видеть GUI
      // slowMo: 250,
      // devtools: true, // показывать инструменты разработчика
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('validates a correct Visa card number', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '4571738192641496'); // Пример номера карты Visa
    await page.click('.submit');
    
    const inputClass = await page.$eval('#card-input', el => el.className);
    expect(inputClass).toContain('valid'); // Проверка, что класс valid добавлен

    const activeCardClass = await page.$eval('.visa', el => el.className);
    expect(activeCardClass).toContain('active-card'); // Проверка, что Visa карта активирована
  });

  test('validates a correct Mastercard number', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '5105105105105100'); // Пример номера карты Mastercard
    await page.click('.submit');
    
    const inputClass = await page.$eval('#card-input', el => el.className);
    expect(inputClass).toContain('valid'); // Проверка, что класс valid добавлен

    const activeCardClass = await page.$eval('.mastercard', el => el.className);
    expect(activeCardClass).toContain('active-card'); // Проверка, что Mastercard активирована
  });

  test('shows error for invalid card number', async () => {
    await page.goto(baseUrl);
    await page.type('#card-input', '1234567812345670'); // Пример недействительного номера
    await page.click('.submit');
    
    const inputClass = await page.$eval('#card-input', el => el.className);
    expect(inputClass).toContain('invalid'); // Проверка, что класс invalid добавлен
    
    const activeCards = await page.$$eval('.card.active-card', els => els.length);
    expect(activeCards).toBe(0); // Проверка, что ни одна карта не активирована
  });
});