import {
  TypeButton,
  SelectedTypeIndicator,
  Selector,
  ActionButton,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedType } from "store/useTimeTable";
import CreateTimeTypeModal from "@pages/Page_Calendar/components/Modal/CreateTimeTypeModal";
import useModal from "@hooks/useModal";
import useGetDailyTimeType from "@pages/Page_TimeTable/hooks/useGetDailyTimeType";
import TypeAdder from "../TypeAdder";

const TypeSelector = () => {
  const { data: dailyTimeType } = useGetDailyTimeType();
  const dispatch = useDispatch();
  const { selectedType } = useSelector((state) => state.timeTable);
  const {
    isModalOpen: isOpenCreateTimeTypeModal,
    openModal: openCreateTImeTypeModal,
    closeModal: closeCreateTimeTypeModal,
  } = useModal();

  const handleTypeClick = (type) => {
    const updatedType = {
      id: type.TimeTypeId,
      name: type.TimeType.name,
      color: type.TimeType.color,
    };
    dispatch(setSelectedType(updatedType));
  };

  console.log(selectedType);

  return (
    <>
      {isOpenCreateTimeTypeModal && (
        <CreateTimeTypeModal onClose={closeCreateTimeTypeModal} />
      )}

      <Selector>
        {dailyTimeType?.map((timeType, index) => {
          return (
            <TypeButton
              color={timeType.TimeType?.color}
              onClick={() => {
                handleTypeClick(timeType);
              }}
            >
              {timeType.TimeType?.name}
            </TypeButton>
          );
        })}
      </Selector>

      <div>
        <ActionButton onClick={openCreateTImeTypeModal}> 설정 </ActionButton>
      </div>

      <SelectedTypeIndicator color={selectedType?.color}>
        현재 선택된 타입: <span>{selectedType?.name || "없음"}</span>
      </SelectedTypeIndicator>
    </>
  );
};

export default TypeSelector;
