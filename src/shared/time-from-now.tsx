import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';


const fromNow = (
  timeObject: Moment
) =>
  timeObject.fromNow();


const TimeFromNow = (
  { time }: { time: number }
) => {
  const [timeObject, setTimeObject] = useState(() => moment(time));

  useEffect(() => {
    setTimeObject(moment(time));
  }, [time]);

  const [timeView, setTimeView] = useState(
    () => fromNow(timeObject)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeView = fromNow(timeObject);
      setTimeView(timeView);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    }
  }, [timeObject]);

  return (
    <>
      {timeView}
    </>
  )
};

export default TimeFromNow;