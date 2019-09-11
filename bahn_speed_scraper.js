const puppeteer = require("puppeteer");
const moment = require("moment");
const Papa = require("papaparse");
var fs = require("fs");

var table = "#grdRetraction";
//liebe
dataarray = [];

async function run() {
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();


  await page.goto(
    "https://iceportal.de/"
  );
  for (let a = 0; a < 121; a++) {

    await page.waitForSelector('.traininfo-speed > .traininfo-speed-value > .icontextbox > .icontextbox-text > .traininfo-speed-speed')

    let time = moment().format("hh:mm:ss");

    let speed = await page.$$eval('.traininfo-speed > .traininfo-speed-value > .icontextbox > .icontextbox-text > .traininfo-speed-speed', e => e[0].innerText);


    let timeandspeed = (a) + "," + (time) + "," + (speed)
    console.log(timeandspeed)
    await page.waitFor(30 * 1000);
    rowentry = {
      time: time,
      speed: speed
    };
    dataarray.push(rowentry)
  }
  browser.close();
  var testcsv = await Papa.unparse(dataarray);
  fs.writeFile(
    "/Users/halukamaier-borst/Documents/bahn_test.csv",
    testcsv,
    function (err) {}
  );




}

run();