// src/components/Navbar.test.tsx
import { render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Wrapper component to provide router context
const NavbarWithRouter = () => (
  <BrowserRouter>
    <Navbar />
  </BrowserRouter>
);

// Limpia los mocks antes de cada prueba
beforeEach(() => {
  jest.clearAllMocks();
});

// --- Pruebas de renderizado ---
describe("Navbar - Renderizado", () => {
  test("renderiza el título principal 'EduLink'", () => {
    render(<NavbarWithRouter />);
    expect(screen.getByText(/EduLink/i)).toBeInTheDocument();
  });

  test("renderiza el botón de cambio de tema", () => {
    render(<NavbarWithRouter />);
    expect(screen.getByLabelText(/Cambiar tema/i)).toBeInTheDocument();
  });
});

