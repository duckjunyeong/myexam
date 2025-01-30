import {
  Title,
  InputContainer,
  Input,
  ColorPicker,
  TimeTypeColorBox,
  TimeTypeName,
  StyledTimeTypeList,
  TimeTypeItemContainer,
  DeleteButton,
} from "./styles";
import { useCallback } from "react";
import {
  setTimeTypeName,
  setTimeTypeColor,
} from "../../../../../../store/useCreateTimeType";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import useGetTimeType from "@hooks/GetData/calendar/useGetTimeType";

const CreateTimeType = () => {
  const dispatch = useDispatch();
  const { categoryName, categoryId, timeTypeName, timeTypeColor } = useSelector(
    (state) => state.createTimeType
  );

  const { data: timeTypes, mutate: timeTypesMutate } =
    useGetTimeType(categoryId);

  console.log(timeTypes);
  const onChangeNewTimeTypeName = useCallback((e) => {
    dispatch(setTimeTypeName(e.target.value));
  }, []);

  const onChangeNewTimeColor = useCallback((e) => {
    dispatch(setTimeTypeColor(e.target.value));
  }, []);

  const handleDeleteTimeType = useCallback(async (id) => {
    try {
      await axios.delete(`/api/timeType/${id}/delete`);
      timeTypesMutate();
      toast.success("삭제되었습니다.");
    } catch (error) {
      toast.error(error.data.message);
      console.error(error);
    }
  }, []);

  return (
    <>
      <Title>{categoryName}</Title>
      <InputContainer>
        <Input
          type="text"
          value={timeTypeName}
          onChange={onChangeNewTimeTypeName}
          placeholder="timeType"
        />
        <ColorPicker
          type="color"
          value={timeTypeColor}
          onChange={onChangeNewTimeColor}
        />
      </InputContainer>
      <StyledTimeTypeList>
        {timeTypes &&
          timeTypes.map((timeType) => (
            <TimeTypeItemContainer key={timeType.id}>
              <TimeTypeName>{timeType.name}</TimeTypeName>
              <DeleteButton onClick={() => handleDeleteTimeType(timeType.id)}>
                삭제
              </DeleteButton>
            </TimeTypeItemContainer>
          ))}
      </StyledTimeTypeList>
    </>
  );
};

export default CreateTimeType;
