import logo from '../assets/investment-calculator-logo.png';

export default function Header() {
    return (
      <header className="text-center my-5">
          
          <img
            src={logo}
            alt="Logo showing a money bag"
            className="d-block mx-auto mb-3"
            style={{
                width: "5rem",
                height: "5rem",
                objectFit: "contain"
            }}
          />
          
          <h1 className="fs-3">Investment Calculator</h1>
      
      </header>
    );
}