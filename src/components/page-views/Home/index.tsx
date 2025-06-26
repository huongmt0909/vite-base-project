import { storage } from "../../../utils/storage";
import { ROUTER_PATHS } from "../../../constants/router-paths";
import { useNavigate } from "react-router-dom";
import { useGetBoughSelling } from "./api";
import BellIcon from "../../../assets/svgs/bell_icon.svg?react";

const HomePageView = () => {
  const navigate = useNavigate();

  const { data: boughtSelling } = useGetBoughSelling();

  const handleLogout = () => {
    storage.removeHeaders();
    navigate(ROUTER_PATHS.login);
  };
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <div>{JSON.stringify(boughtSelling)}</div>
      <BellIcon />
    </div>
  );
};

export default HomePageView;
