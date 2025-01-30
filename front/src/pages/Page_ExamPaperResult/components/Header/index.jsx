import { Header } from "../../styles";
import { Link } from "react-router";

const ExamResultHeader = () => {
  return (
    <Header>
      <h1>MY_EXAM</h1>
      <Link to={"/main/examTypeList"}> Home </Link>
    </Header>
  );
};

export default ExamResultHeader;
