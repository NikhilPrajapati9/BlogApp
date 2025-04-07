import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };
  return (
    <div
      onClick={logoutHandler}
      className="inline-block font-medium cursor-pointer px-6 py-2 duration-200 hover:text-[#00684a] hover:bg-blue-200 rounded-full"
    >
      Logout
    </div>
  );
}

export default LogoutBtn;
