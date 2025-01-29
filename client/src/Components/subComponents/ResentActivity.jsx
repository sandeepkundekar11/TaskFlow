/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import TimeUtililty from "../Utilities/TimeUtility";

// eslint-disable-next-line react/prop-types
const ResentActivity = ({ data }) => {
  const [ActivityData, setActivityData] = useState();
  const { updateTime } = TimeUtililty();
  useEffect(() => {
    console.log(data);
    if (data) {
      let updatedData = data?.map((activity) => {
        return {
          ...activity,
          user: activity?.name?.name,
          timeStamp: updateTime(activity?.timeStamp),
        };
      });
      setActivityData(updatedData);
    }
  }, [data]);
  return (
    <div className="space-y-8">
      {ActivityData?.map((item) => (
        <div key={item?._id} className="flex items-center">
          <div className="space-y-1">
            <p className="text-base font-medium leading-none">{item?.user}</p>
            <p className="text-sm text-muted-foreground">
              {item?.action} {item?.task}
            </p>
          </div>
          <div className="ml-auto font-medium">{item?.timeStamp}</div>
        </div>
      ))}
    </div>
  );
};
export default ResentActivity;
