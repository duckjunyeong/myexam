import React, { useCallback, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";

import { Container } from "./styles";
import {
  TypeSelector,
  TypeButton,
  SelectedTypeIndicator,
} from "@pages/Page_TimeTable/components/EditTimeTable/styles";

import fetcher from "@utils/fetcher";
import StopWatch from "@pages/Page_StopWatch/components/StopWatch";
import useGetAllTimeType from "@hooks/GetData/calendar/useGetAllTimeType";
import LoadingIndicator from "@components/LoadingIndicator";

const Page_StopWatch = () => {
  const { data: userData } = useSWR("/api/user", fetcher);
  const { data: timeType } = useGetAllTimeType(userData ? userData.id : null);
  const [userTypes, setUserTypes] = useState(timeType);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    setUserTypes(timeType);
  }, [timeType]);

  const handleTypeClick = useCallback((type) => {
    setSelectedType(type);
  }, []);

  if (!userTypes) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Container>
        <ToastContainer autoClose={1000} />
        <TypeSelector>
          {userTypes.map((type) => (
            <TypeButton
              key={type.name}
              color={type.color}
              onClick={() => handleTypeClick(type)}
            >
              {type.name}
            </TypeButton>
          ))}
        </TypeSelector>
        <SelectedTypeIndicator color={selectedType?.color}>
          현재 선택된 타입: <span>{selectedType?.name || "없음"}</span>
        </SelectedTypeIndicator>
        <StopWatch userId={userData.id} timeTypeId={selectedType?.id} />
      </Container>
    </>
  );
};

export default Page_StopWatch;
