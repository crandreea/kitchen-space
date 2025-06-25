import Home from "./pages/Home";
import About from "./pages/About";
import Recipes from "./pages/Recipes";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/Profile";


const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/recipes", element: <Recipes /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/login", element: <Login />},
    { path: "/profile", element: <Profile />}
];

export default routes;
