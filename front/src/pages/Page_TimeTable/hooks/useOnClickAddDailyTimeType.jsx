import { useCallback, useState, useEffect } from "react";
import useGetAllTimeType from "@hooks/GetData/calendar/useGetAllTimeType";
import useGetUserInfo from "@hooks/GetData/exam/useGetUserInfo";
import useGetDailyTimeType from "./useGetDailyTimeType";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router";

const useOnClickAddDailyTimeType = () => {
  const { date } = useParams();
  const { data: userData } = useGetUserInfo();
  const { data: timeTypes } = useGetAllTimeType(userData ? userData.id : null);
  const [timeTypeList, setTimeTypeList] = useState([]);

  const { data: dailyTimeType, mutate: dailyTimeTypeMutate } =
    useGetDailyTimeType();

  const [listInputId, setListInputId] = useState(null);

  const onChangeListInput = useCallback(
    (e) => {
      const selectedValue = e.target.value; // 선택된 option의 value
      const selectedOption = timeTypeList.find(
        (option) => option.name === selectedValue
      ); // timeTypeList 배열에서 value가 일치하는 option 찾기

      setListInputId(selectedOption.id);
    },
    [timeTypeList]
  );

  const onClickAddDailyTimeType = useCallback(async () => {
    if (!listInputId) {
      return toast.error("TimeType을 선택해주세요");
    }

    try {
      await axios.post(`/api/userDailyTimeType/add/${date}/${userData.id}`, {
        timeTypeId: listInputId,
      });

      dailyTimeTypeMutate();
      toast.success("추가하였습니다.");
    } catch (error) {
      toast.error("추가하지 못 하였습니다.");
    }
  }, [listInputId, userData, date]);

  useEffect(() => {
    if (!dailyTimeType || !timeTypes) {
      return;
    }

    const dailyTimeTypeIds = new Set(
      dailyTimeType.map((data) => data.TimeTypeId)
    );

    const filteredUserTypes = timeTypes.filter(
      (userType) => !dailyTimeTypeIds.has(userType.id)
    );
    setTimeTypeList(filteredUserTypes);
  }, [timeTypes, dailyTimeType]);

  useEffect(() => {
    if (timeTypeList && timeTypeList.length > 0) {
      setListInputId(timeTypeList[0].id);
    } else {
      setListInputId(null);
    }
  }, [timeTypeList]);

  return {
    timeTypeList,
    onChangeListInput,
    onClickAddDailyTimeType,
  };
};

export default useOnClickAddDailyTimeType;
