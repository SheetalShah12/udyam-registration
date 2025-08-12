const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log("Opening Udyam Registration Step 1 page...");
  await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", { waitUntil: "networkidle2" });

  // Wait for the form to load (adjust selector as needed)
  await page.waitForSelector("form");

  // Extract input/select/textarea fields with labels
  const fields = await page.evaluate(() => {
    const form = document.querySelector("form");
    if (!form) return [];

    const elements = Array.from(form.querySelectorAll("input, select, textarea"));
    const fieldData = elements.map((el) => {
      const label = el.labels && el.labels.length > 0 ? el.labels[0].innerText.trim() : el.getAttribute("placeholder") || "";
      return {
        tag: el.tagName.toLowerCase(),
        type: el.type || null,
        name: el.name || null,
        label: label,
        required: el.required || false,
      };
    });
    return fieldData;
  });

  console.log("Fields extracted:", fields);

  // Save as JSON schema file
  fs.writeFileSync("udyam_form_schema.json", JSON.stringify(fields, null, 2));
  console.log("✅ Saved JSON schema to udyam_form_schema.json");

  await browser.close();
})();

