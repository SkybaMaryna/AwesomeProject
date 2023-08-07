import { toDate } from "firebase/firestore";
const getMonthName = (monthNumber) => {
  const monthNames = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
  ];
  return monthNames[monthNumber];
};

export const formatDate = (timestamp) => {
 
  const date = new Date(timestamp.seconds*1000);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${day} ${getMonthName(
    month
  )}, ${year} | ${hours}:${minutes.toString().padStart(2, "0")}`;
  return formattedDate;
};
