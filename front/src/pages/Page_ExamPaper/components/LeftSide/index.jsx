import { ProblemSetList, ProblemSetTitle, ProblemSetItem } from "./styles";
import useGetPaperName from "@hooks/GetData/exam/useGetPaperName";
import LoadingIndicator from "@components/LoadingIndicator";

const ProblemInfo = () => {
  const { paperName, headName, subName } = useGetPaperName();

  if (!paperName || !subName) {
    <LoadingIndicator />;
  }

  return (
    <ProblemSetList>
      <ProblemSetItem>
        <ProblemSetTitle>
          {paperName ? headName + " - " + subName : <div>no data</div>}
        </ProblemSetTitle>
      </ProblemSetItem>
    </ProblemSetList>
  );
};

export default ProblemInfo;
