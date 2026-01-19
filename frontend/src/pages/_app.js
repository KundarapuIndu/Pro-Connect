import "@/styles/globals.css";
import { store } from "@/config/redux/store";
import { Provider } from "react-redux";
import DashboardLayout from "@/layout/DashboardLayout";

export default function App({ Component, pageProps, router }) {
  const showDashboardLayout =
    ["/dashboard", "/discover", "/my_connections", "/profile"].includes(router.pathname) || // <-- added /profile
    router.pathname.startsWith("/view_profile");

  return (
    <Provider store={store}>
      {showDashboardLayout ? (
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}
