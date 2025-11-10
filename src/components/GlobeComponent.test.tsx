import { render, screen, fireEvent } from "@testing-library/react";
import GlobeComponent from "../components/GlobeComponent";

// Mock del componente react-globe.gl
jest.mock("react-globe.gl", () => {
  return ({ onPointClick }: any) => (
    <div>
      <div
        data-testid="globe"
        onClick={() =>
          onPointClick &&
          onPointClick({
            lat: 4.570868,
            lng: -74.297333,
            region: "Colombia",
            info: "Capital: Bogotá | Población: 52M | Continente: América del Sur",
          })
        }
      >
        Globo simulado
      </div>

      {/* Dos regiones simuladas para los tests de cambio */}
      <button
        data-testid="pais1"
        onClick={() =>
          onPointClick &&
          onPointClick({
            lat: 4.570868,
            lng: -74.297333,
            region: "Colombia",
            info: "Capital: Bogotá | Población: 52M | Continente: América del Sur",
          })
        }
      >
        Colombia
      </button>

      <button
        data-testid="pais2"
        onClick={() =>
          onPointClick &&
          onPointClick({
            lat: 35.8617,
            lng: 104.1954,
            region: "China",
            info: "Capital: Pekín | Población: 1.412B | Continente: Asia",
          })
        }
      >
        China
      </button>
    </div>
  );
});

describe("GlobeComponent", () => {
  test("se renderiza correctamente", () => {
    render(<GlobeComponent />);
    expect(screen.getByTestId("globe")).toBeInTheDocument();
  });

  test("no muestra información al inicio", () => {
    render(<GlobeComponent />);
    expect(screen.queryByText(/Región seleccionada:/i)).not.toBeInTheDocument();
  });

  test("muestra cuadro de información al hacer clic en un país", () => {
    render(<GlobeComponent />);
    fireEvent.click(screen.getByTestId("globe"));

    expect(screen.getByText("Colombia", { selector: "strong" })).toBeInTheDocument();
    expect(screen.getByText(/Región seleccionada:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Capital: Bogotá \| Población: 52M \| Continente: América del Sur/i)
    ).toBeInTheDocument();
  });

  test("actualiza información cuando se hace clic en diferentes regiones", () => {
    render(<GlobeComponent />);

    fireEvent.click(screen.getByTestId("pais1"));
    expect(screen.getByText("Colombia", { selector: "strong" })).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("pais2"));
    expect(screen.getByText("China", { selector: "strong" })).toBeInTheDocument();
    expect(
      screen.getByText(/Capital: Pekín \| Población: 1.412B \| Continente: Asia/i)
    ).toBeInTheDocument();
  });

  test("snapshot del componente base", () => {
    const { asFragment } = render(<GlobeComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});
