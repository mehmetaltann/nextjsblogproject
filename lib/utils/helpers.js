export const getText = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
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
