import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";

describe("Home page", () => {
    it("renders name and sets document title", () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(screen.getByText("Bellamy Phan")).toBeInTheDocument();
        expect(document.title).toBe("Bellamy Phan | Home");
    });
});