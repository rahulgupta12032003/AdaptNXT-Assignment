const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://www.quill.com/hanging-file-folders/cbk/122567.html");

  const productsHandles = await page.$$(".SearchResultsNew");

  var i=1;

  for (const producthandle of productsHandles) {
    let title = "Null";
    let price = "Null";
    let ItemNumber = "Null";
    let ModelNumber = "Null";
    let ProductDescription = "Null";
    let img = "Null";

    try {
      title = await page.evaluate(
        (el) => el.querySelector("#skuName").textContent,
        producthandle
      );
    } catch (error) {}

    try {
      i++;
      price = await page.evaluate(
        (el) => el.querySelector(".priceupdate").textContent,
        producthandle
      );
    } catch (error) {}
    try {
      ItemNumber = await page.evaluate(
        (el) => el.querySelector(".iNumber ").textContent,
        producthandle
      );
    } catch (error) {}

    try {
      ModelNumber = await page.evaluate(
        (el) => el.querySelector(".model-number ").textContent,
        producthandle
      );
    } catch (error) {}

    //   try {
    //     ProductCategory = await page.evaluate(
    //       (el) => el.querySelector(".model-number ").textContent,
    //       producthandle
    //     );
    //   } catch (error) {}

    try {
      ProductDescription = await page.evaluate(
        (el) => el.querySelector(".skuBrowseBullets").textContent,
        producthandle
      );
    } catch (error) {}

    try {
      img = await page.evaluate(
        (el) => el.querySelector("#SkuPageMainImg").getAttribute("src"),
        producthandle
      );
    } catch (error) {}
    if (title !== "Null") {
      fs.appendFile(
        "productsData.csv",
        `{ \n Title : ${title}, \n Price : ${price}, \n ItemNumber : ${ItemNumber}, \n ModelNumber : ${ModelNumber}, \n ProductDescription : ${ProductDescription}, \n Image : ${img} \n}\n\n`,
        function (err) {
          if (err) throw err;
        }
        );
         
    }
  }

  await browser.close();
})();