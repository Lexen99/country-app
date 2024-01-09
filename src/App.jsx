import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { DarkModeTheme } from './components/DarkModeTheme'

// Pages
import HomePage, { countriesLoader } from "./pages/HomePage";
import CountryPage, { countryDeteailsLoader } from "./pages/CountryPage";

const routesFromElements = createRoutesFromElements(


  <Route path="/">
    <Route index element={<HomePage />} loader={countriesLoader} />
    <Route
      path=":name"
      element={<CountryPage />}
      loader={countryDeteailsLoader}
    />
  </Route>
);

const router = createBrowserRouter(routesFromElements);

function App() {

  return (
    <DarkModeTheme>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </DarkModeTheme>
  );
}

export default App;
