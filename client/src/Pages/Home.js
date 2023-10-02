import { Outlet, useRouteLoaderData } from "react-router-dom";
import SidePanel from "../components/Notes/SidePanel";
import "./Home.css";
import TopHeader from "../components/Header/TopHeader";
import NotAuthModal from "../components/Authentication/NotAuthModal";
import { usernameApi } from "../utils/api";

function Home() {
  const data = useRouteLoaderData("loginData");

  //const ctx = useContext(AuthContext);
  return (
    <>
      {data && data.name ? (
        <>
          <div className="home">
            <SidePanel />
            <div className="home__right">
              <div>
                <TopHeader />
              </div>
              <div className="note-content">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <NotAuthModal />
      )}
    </>
  );
}

export default Home;

export async function userLoader({ request, params }) {
  const response = await fetch(usernameApi, {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    credentials: "include",
    withCredentials: true,
  });
  if (!response.ok) {
    return response;
  }
  console.log(response);
  if (!response.ok) {
    return response;
  }
  const resData = await response.json();

  return resData;
}
