import { storage } from "src/utils/storage";
import { useNavigate } from "react-router-dom";
import { useGetBoughSelling } from "./api";
import BellIcon from "src/assets/svgs/bell_icon.svg?react";
import { ROUTER_PATHS } from "src/constants/router-paths";

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
