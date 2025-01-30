import { useCallback, useState } from "react";
import CreateTimeCategory from "./CreateTimeCategory";
import CreateTimeType from "./CreateTimeType";
import {
  ModalContainer,
  CloseButton,
  PaginationContainer,
  PaginationDot,
  CheckButton,
  ButtonContainer,
} from "./styles";
import axios from "axios";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  setTimeTypeName,
  setTimeTypeColor,
} from "../../../../../store/useCreateTimeType";
import useGetTimeType from "@hooks/GetData/calendar/useGetTimeType";
import useGetAllTimeType from "@hooks/GetData/calendar/useGetAllTimeType";

const CreateTimeTypeModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { categoryId, timeTypeName, timeTypeColor } = useSelector(
    (state) => state.createTimeType
  );
  const { data: userData } = useGetUserInfo();

  const { mutate: timeTypesMutate } = useGetTimeType(categoryId);
  const { mutate: allTimeTypesMutate } = useGetAllTimeType(
    userData ? userData.id : null
  );

  const [step, setStep] = useState(0);

  const onCLickNextStep = useCallback(() => {
    setStep((preStep) => preStep + 1);
  }, []);

  const onCLickBackStep = useCallback(() => {
    setStep((preStep) => preStep - 1);
    dispatch(setTimeTypeName(""));
    dispatch(setTimeTypeColor(""));
  }, []);

  const onCLickCreate = useCallback(async () => {
    if (!categoryId || !timeTypeName || !timeTypeColor) {
      return toast.error("입력하지 않은 부분이 존재합니다.");
    }
    const response = await axios
      .post(`/api/timeType/create/${userData.id}`, {
        categoryId,
        timeTypeName,
        timeTypeColor,
      })
      .then(() => {
        dispatch(setTimeTypeName(""));
        dispatch(setTimeTypeColor(""));
        timeTypesMutate();
        allTimeTypesMutate();
        return toast.success("생성되었습니다.");
      })
      .catch((error) => {
        return toast.error(error.response.data);
      });
  }, [userData, categoryId, timeTypeName, timeTypeColor]);

  return (
    <ModalContainer>
      <CloseButton onClick={onClose}> x </CloseButton>
      {step === 0 && <CreateTimeCategory />}
      {step === 1 && <CreateTimeType />}

      <PaginationContainer>
        <PaginationDot active={step === 0} />
        <PaginationDot active={step === 1} />
      </PaginationContainer>
      <ButtonContainer>
        {step === 0 && (
          <CheckButton onClick={onCLickNextStep}>NEXT</CheckButton>
        )}
        {step === 1 && (
          <>
            <CheckButton onClick={onCLickBackStep}>BACK</CheckButton>
            <CheckButton onClick={onCLickCreate}>CREATE</CheckButton>
          </>
        )}
      </ButtonContainer>
    </ModalContainer>
  );
};

export default CreateTimeTypeModal;
