import { expect, test } from "@playwright/test";

const basePath = "/";

test("has title", async ({ page }) => {
  await page.goto(basePath);

  await expect(page.getByText("Hello World")).toBeVisible();
});
