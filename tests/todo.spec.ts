import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("visar rubrik och tom lista från början", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: "Att göra-lista" })
  ).toBeVisible();
  await expect(page.getByText("Inga uppgifter än")).toBeVisible();
});

test("lägger till en uppgift", async ({ page }) => {
  await page.getByLabel("Ny uppgift").fill("Köpa kaffe");
  await page.getByRole("button", { name: "Lägg till" }).click();

  await expect(page.getByRole("listitem")).toContainText("Köpa kaffe");
  await expect(page.getByText("Inga uppgifter än")).not.toBeVisible();
});

test("lägger till en uppgift och tar bort den", async ({ page }) => {
  await page.getByLabel("Ny uppgift").fill("Köpa mjölk");
  await page.getByRole("button", { name: "Lägg till" }).click();

  const item = page.getByRole("listitem").filter({ hasText: "Köpa mjölk" });
  await item.getByRole("button", { name: "Ta bort" }).click();

  await expect(item).not.toBeVisible();
  await expect(page.getByText("Inga uppgifter än")).toBeVisible();
});