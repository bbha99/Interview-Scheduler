import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const dayList = props.days.map(dayItem => {
    return (
      <DayListItem
        key={dayItem.id}
        name={dayItem.name}
        spots={dayItem.spots}
        setDay={props.setDay} 
        selected = {dayItem.name === props.day}
      />)
  })

  return (
    <ul>{dayList}</ul>
  );

}