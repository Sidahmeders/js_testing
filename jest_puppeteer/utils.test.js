const {generateText, checkAndGenerate} = require('./util');
const puppeteer = require('puppeteer');

// test generateText  *(UNIT TEST)*
test('shoud Output name && age', () => {
    const text = generateText("Max", 29);
    const text2 = generateText('Anna', '14');
    expect(text).toBe('Max (29 years old)');
    expect(text2).toBe('Anna (14 years old)');
});

test('shoud Output no data', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

// test checkAndGenerate *(INTEGRETATION TEST)*
test('shoud return a vild text output', () => {
    const text = checkAndGenerate("Max", 29);
    expect(text).toBe('Max (29 years old)');
});

//  *(END_TO_END_TEST->(E2E))*
test('click around and create a text elemnt with class', async () => {
    const browser = await puppeteer.launch({
        headless: true,
        // slowMo: 80,
        args: ['~~wondows-size=1920,1000']
    });
    const page = await browser.newPage()
    // the URL of the app you're testing!!!
    await page.goto(
        'file:///home/sidozoldik/Desktop/jest_puppeteer/index.html'
    );
    await page.click('input#name')
    await page.type('input#name', 'Anna')
    await page.click('input#age')
    await page.type('input#age', '28')
    await page.click('#btnAddUser')
    const AnnaText = await page.$eval('.user-item', el => el.textContent)
    expect(AnnaText).toBe('Anna (28 years old)')
});
