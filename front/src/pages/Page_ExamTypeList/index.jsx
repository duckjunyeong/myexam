import { SearchBar, UserInfo } from "./styles";
import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import ExamTypeList from "@pages/Page_ExamTypeList/components/ExamTypeList";

import "react-toastify/dist/ReactToastify.css";
import AddExamButton from "./components/AddExamButton";

const Page_ExamTypeList = () => {
  const { data: userData } = useSWR("/api/user", fetcher);

  const examTypeList = useMemo(() => userData?.ExamTypeLists, [userData]);

  if (!examTypeList) {
    return <div> loading... </div>;
  }
  return (
    <>
      <SearchBar>
        <input type="text" placeholder="Search" />
      </SearchBar>
      <UserInfo>
        <div className="notifications"></div>
        <div className="user-name">Exam Type</div>
      </UserInfo>

      <AddExamButton />

      {examTypeList?.length > 0 ? (
        <ExamTypeList examTypeList={examTypeList} />
      ) : (
        <div>no data</div>
      )}
    </>
  );
};

export default Page_ExamTypeList;
