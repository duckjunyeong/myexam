import React, { useCallback, useEffect, useState } from "react";
import {
  ModalContainer,
  ModalWindow,
  ModalTitle,
  InputContainer,
  Label,
  InputField,
  ButtonContainer,
  SaveButton,
  CancelButton,
} from "./styles";
import useInput from "hooks/useInput";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const CategoryEditModal = ({ categoryData, closeEditModal }) => {
  const { data: userData } = useGetUserInfo();
  const { mutate: timeTypeCategoryMutate } = useSWR(
    userData && userData.id ? `/api/allTimeTypeCategory/${userData.id}` : null,
    fetcher
  );

  const [categoryName, onChangeCategoryName, setCategoryName] = useInput(
    categoryData ? categoryData.name : ""
  );
  const [categoryColor, onChangeCategoryColor, setCategoryColor] = useInput(
    categoryData ? categoryData.color : ""
  );

  const handleSave = useCallback(async () => {
    try {
      await axios.patch(`/api/timeTypeCategory/${categoryData.id}/edit`, {
        categoryName,
        categoryColor,
      });
      timeTypeCategoryMutate();
      toast.success("Category를 수정하였습니다.");
    } catch (error) {
      console.error(error);
      toast.error("Category를 수정하지 못 하였습니다.");
    }
  }, [categoryData, categoryName, categoryColor]);

  useEffect(() => {
    setCategoryName(categoryData?.name);
    setCategoryColor(categoryData?.color);
  }, [categoryData]);

  console.log(categoryName);
  return (
    <ModalContainer onClick={closeEditModal}>
      <ToastContainer autoClose={1000} />
      <ModalWindow onClick={(e) => e.stopPropagation()}>
        <ModalTitle>Category 수정</ModalTitle>
        <InputContainer>
          <Label htmlFor="title">Category Name</Label>
          <InputField
            type="text"
            id="title"
            value={categoryName}
            onChange={onChangeCategoryName}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="answer">Category Color</Label>
          <InputField
            type="color"
            id="answer"
            value={categoryColor}
            onChange={onChangeCategoryColor}
          />
        </InputContainer>
        <ButtonContainer>
          <CancelButton onClick={closeEditModal}>취소</CancelButton>
          <SaveButton onClick={handleSave}>수정</SaveButton>
        </ButtonContainer>
      </ModalWindow>
    </ModalContainer>
  );
};

export default CategoryEditModal;
