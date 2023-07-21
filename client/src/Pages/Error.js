import { NavLink } from "react-router-dom";
import './Error.css';

const ErrorPage = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div>
          <h2>404</h2>
          <h3>UH OH! You're lost.</h3>
          <p>
            The page you are looking for does not exist. How you got here is a
            mystery. But you can click the button below to go back to the
            homepage.
          </p>

          <NavLink to="/">
            <button>Go Back to Home</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
