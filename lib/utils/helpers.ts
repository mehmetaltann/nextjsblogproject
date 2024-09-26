import moment from "moment";
import "moment/locale/tr";

export async function delay(ms: Number | any) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getFormatDate = (date: string): string => {
  moment.locale("tr");
  const formattedDate = moment(date).format("Do MMMM YYYY");
  return formattedDate;
};

export const getFormatLongDate = (date: string) => {
  moment.locale("tr");
  const formattedDate = moment(date).format("Do MMMM YYYY, h:mm:ss");
  return formattedDate;
};

export const getFormatLeftTime = (date: string) => {
  moment.locale("tr");
  const formattedDate = moment(date).startOf("day").fromNow();
  return formattedDate;
};

interface Category {
  name: string;
}

interface Item {
  category: Category[];
}

interface Result {
  name: string;
  count: number;
}

export const getAttCount = (list: Item[]): Result[] => {
  const firstArray: Category[] = [];
  list.forEach((item) =>
    item.category.forEach((item2) => firstArray.push(item2))
  );

  const result = firstArray.reduce((acc: Result[], child: Category) => {
    const indexFinded = acc.findIndex((el) => el.name === child.name);
    if (indexFinded === -1) {
      acc.push({ name: child.name, count: 1 });
    } else {
      acc[indexFinded].count += 1;
    }
    return acc;
  }, []);

  return result;
};
