import { ListInputContainer, ListInput, Option, ActionButton } from "./styels";
import useOnClickAddDailyTimeType from "@pages/Page_TimeTable/hooks/useOnClickAddDailyTimeType";

const TypeAdder = () => {
  const { timeTypeList, onChangeListInput, onClickAddDailyTimeType } =
    useOnClickAddDailyTimeType();

  return (
    <ListInputContainer>
      <ListInput onChange={onChangeListInput}>
        {timeTypeList?.map((option, index) => (
          <Option key={index} value={option.name}>
            {option.name}
          </Option>
        ))}
      </ListInput>
      <ActionButton onClick={onClickAddDailyTimeType}>추가하기</ActionButton>
    </ListInputContainer>
  );
};

export default TypeAdder;
