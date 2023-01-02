interface props<T> {
  obj: T;
  sort: SortOptions;
}

type SortOptions = "CLASSNUM" | "COURSENUM";

function sortObject<T extends object>(props: props<T>) {
  if (props.sort === "CLASSNUM") {
    return Object.entries(props.obj).sort((elt1, elt2) => {
      return Number(elt1[0]) - Number(elt2[0]);
    });
  } else if (props.sort === "COURSENUM") {
    return Object.entries(props.obj).sort((elt1, elt2) => {
      let first_num = elt1[1][0].split(" ")[1].replace(/\D/g, "");
      let second_num = elt2[1][0].split(" ")[1].replace(/\D/g, "");
      return Number(first_num) - Number(second_num);
    });
  }
  throw Error("not possible");
}

export { sortObject };
