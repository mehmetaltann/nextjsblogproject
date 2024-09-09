import moment from "moment";
import "moment/locale/tr";

export const getFormatDate = (date) => {
  moment.locale("tr");
  const formattedDate = moment(date).format("Do MMMM YYYY");
  return formattedDate;
};

export const getFormatLongDate = (date) => {
  moment.locale("tr");
  const formattedDate = moment(date).format("Do MMMM YYYY, h:mm:ss");
  return formattedDate;
};

export const getFormatLeftTime = (date) => {
  moment.locale("tr");
  const formattedDate = moment(date).startOf("day").fromNow();
  return formattedDate;
};

export const getAttCount = (list) => {
  const firstArray = [];
  list.map((item) => item.category.map((item2) => firstArray.push(item2)));
  let result = firstArray.reduce((acc, child, index) => {
    const indexFinded = acc.findIndex((el) => el.name == child.name);
    const result = {};
    if (indexFinded == -1) {
      result.name = child.name;
      result.count = 1;
      acc.push(result);
    } else {
      acc[indexFinded].count += 1;
    }

    return acc;
  }, []);
  return result;
};
