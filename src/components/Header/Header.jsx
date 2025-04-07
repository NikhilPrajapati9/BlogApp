import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../appwrite/auth";
import LogoutBtn from "./LogoutBtn";
import Container from "../container/Container";
import Logo from "../Logo";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  console.log("headerauthstaur =>", authStatus);
  

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {

    }
  ];

  return (
    <header className="py-3 mt-2 mshadow-md bg-[#030712] text-white rounded-2xl" >
      <Container>
        <nav className="flex items-center">
          <div className="mr-4 text-2xl font-bold">
            <Link to="/">
              <Logo width="70px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block font-medium cursor-pointer px-6 py-2 duration-200 hover:bg-green-200  hover:text-[#00684a] rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authService && (
              <li>
                <LogoutBtn />
              </li>
            ) }
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
