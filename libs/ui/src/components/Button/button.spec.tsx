import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "./";

describe("Button", () => {
  test("renders", () => {
    render(<Button>TEST BTN</Button>);
    expect(screen.getByText("TEST BTN")).toBeDefined();
  });
});
