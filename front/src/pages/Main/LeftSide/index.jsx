import {
  Sidebar,
  Logo,
  AddFeatureButton,
  StyledLink,
  LogOutButton,
} from "@pages/Main/styles";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import useLogout from "../hooks/useLogout";

const SideBar = () => {
  const { data } = useGetUserInfo();
  const onClickLogout = useLogout();

  return (
    <Sidebar>
      <Logo>
        <img src="https://via.placeholder.com/30" alt="Logo" />
        <span>{data?.nickname}</span>
        <LogOutButton onClick={onClickLogout}>로그아웃</LogOutButton>
      </Logo>
      <AddFeatureButton>
        <StyledLink to={"/main/examTypeList"}>Exam</StyledLink>
      </AddFeatureButton>
      <AddFeatureButton>
        <StyledLink to={"/main/calendar"}>Calendar</StyledLink>
      </AddFeatureButton>
    </Sidebar>
  );
};

export default SideBar;
