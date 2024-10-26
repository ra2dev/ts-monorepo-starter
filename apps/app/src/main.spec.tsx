import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("renders", () => {
    render(<App />);
    expect(screen.getByText("Hello World")).toBeDefined();
  });
});
