import { Routes, Route } from "react-router-dom";
import "./index.scss";
import { useEffect, lazy, Suspense } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";
import Spinner from "./components/spinner/spinner.component";

const HomePage = lazy(() => import("./routes/home/home-page.component"));
const AuthenticationForms = lazy(() =>
  import("./routes/authentication/authentication-forms.component")
);
const HomeNavigation = lazy(() =>
  import("./routes/navigation/home-navigation.component")
);
const Shop = lazy(() => import("./routes/shop/shop-component"));
const Checkout = lazy(() => import("./routes/checkout/checkout.component"));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<HomeNavigation />}>
          <Route index element={<HomePage />}></Route>
          <Route path="shop/*" element={<Shop />}></Route>
          <Route path="auth" element={<AuthenticationForms />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
