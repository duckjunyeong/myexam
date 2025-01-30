import React from "react";
import EditTimeTable from "@pages/Page_TimeTable/components/EditTimeTable";
import WatchTimeTable from "@pages/Page_TimeTable/components/WatchTimeTable";
import { useParams } from "react-router";

const Page_TimeTable = () => {
  const { mode } = useParams();

  const isEditMode = mode === "isEditMode";

  return <EditTimeTable />;
  // return <>{isEditMode ? <EditTimeTable /> : <WatchTimeTable />}</>;
};

export default Page_TimeTable;
