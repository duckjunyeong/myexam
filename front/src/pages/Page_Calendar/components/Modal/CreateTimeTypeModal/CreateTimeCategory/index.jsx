import React, { useCallback, useState } from "react";
import {
  IconWrapper,
  IconContainer,
  IconCircle,
  Description,
  IconText,
} from "./styles";
import {
  TypeInput,
  TypeButton,
  DeleteButton,
  EditButton,
  ButtonWrapper,
} from "@pages/Page_TimeTable/components/EditTimeTable/styles";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import useInput from "@hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCategoryName,
  setCategoryColor,
} from "../../../../../../store/useCreateTimeType";
import { toast } from "react-toastify";
import useModal from "@hooks/useModal";
import CategoryEditModal from "../CategoryEditModal";

const CreateTimeCategory = () => {
  const dispatch = useDispatch();
  const { categoryId } = useSelector((state) => state.createTimeType);
  console.log("categoryId");
  console.log(categoryId);

  const { data: userData } = useSWR("/api/user", fetcher);
  const { data: timeTypeCategory, mutate: timeTypeCategoryMutate } = useSWR(
    userData && userData.id ? `/api/allTimeTypeCategory/${userData.id}` : null,
    fetcher
  );
  const [newTypeName, onChangeNewTypeName, setNewTypeName] = useInput("");
  const [newTypeColor, onChangeNewTypeColor, setNewTypeColor] = useInput("");
  const {
    isModalOpen: isEditModal,
    openModal: openEditModal,
    closeModal: closeEditModal,
  } = useModal();
  const [editCategoryData, setEditCategoryData] = useState(null);

  const onClickTimeCategory = useCallback((data) => {
    console.log(data);
    dispatch(setCategoryId(data.id));
    dispatch(setCategoryName(data.name));
    dispatch(setCategoryColor(data.color));
  }, []);

  const handleAddType = useCallback(async () => {
    if (!newTypeName || !newTypeColor) {
      return toast.error("아직 입력되지 않는 칸이 있습니다.");
    }
    await axios
      .post("/api/timeTypeCategory/create", {
        name: newTypeName,
        color: newTypeColor,
        UserId: userData.id,
      })
      .then(() => {
        setNewTypeName("");
        setNewTypeColor("");
        timeTypeCategoryMutate();
      })
      .catch((error) => {
        toast.error(error.response.data);
        setNewTypeName("");
        setNewTypeColor("");
      });
  }, [newTypeColor, newTypeName, userData]);

  const onClickDelete = useCallback(async (id) => {
    try {
      await axios.delete(`/api/timeTypeCategory/${id}/delete`);
      timeTypeCategoryMutate();
      toast.success("삭제되었습니다.");
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  }, []);
  const onClickEdit = useCallback((data) => {
    openEditModal();
    setEditCategoryData(data);
  }, []);

  if (!timeTypeCategory) {
    return <div> loading ... </div>;
  }
  return (
    <>
      {isEditModal && (
        <CategoryEditModal
          closeEditModal={closeEditModal}
          categoryData={editCategoryData}
        />
      )}
      <TypeInput
        type="text"
        placeholder="새 타입 이름"
        value={newTypeName}
        onChange={onChangeNewTypeName}
      />
      <input
        type="color"
        value={newTypeColor}
        onChange={onChangeNewTypeColor}
      />
      <TypeButton color={newTypeColor} onClick={handleAddType}>
        추가
      </TypeButton>
      <IconContainer>
        {timeTypeCategory.length > 0 &&
          timeTypeCategory.map((data) => {
            return (
              <IconWrapper>
                <IconCircle
                  isSelected={data.id === categoryId}
                  onClick={() => {
                    onClickTimeCategory(data);
                  }}
                >
                  <IconText> {data.name}</IconText>
                </IconCircle>
                <ButtonWrapper>
                  <DeleteButton onClick={() => onClickDelete(data.id)}>
                    삭제
                  </DeleteButton>
                  <EditButton onClick={() => onClickEdit(data)}>
                    수정
                  </EditButton>
                </ButtonWrapper>
              </IconWrapper>
            );
          })}
      </IconContainer>
      <Description> 시간 유형을 선택해주세요 </Description>
    </>
  );
};

export default CreateTimeCategory;
