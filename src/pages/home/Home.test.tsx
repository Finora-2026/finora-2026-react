import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home.tsx";

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
    
    it("renders bottom documentation box", () => {
        render(
          <MemoryRouter>
              <Home />
          </MemoryRouter>
        );
        
        expect(screen.getByText("Documentation")).toBeInTheDocument();
    });
    
    it("renders bottom connect-with-bellamy box", () => {
        render(
          <MemoryRouter>
              <Home />
          </MemoryRouter>
        );
        
        expect(screen.getByText("Connect with Bellamy")).toBeInTheDocument();
    });
});