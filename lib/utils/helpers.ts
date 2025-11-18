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

export const slugify = (text: string) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u2018\u2019\u201C\u201D'"]/g, "")
    .replace(/[çÇ]/g, "c")
    .replace(/[ğĞ]/g, "g")
    .replace(/[ıİ]/g, "i")
    .replace(/[öÖ]/g, "o")
    .replace(/[şŞ]/g, "s")
    .replace(/[üÜ]/g, "u")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
};
