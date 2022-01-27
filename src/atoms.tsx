import { atom, selector } from "recoil";
//selector = atom의 output을 변형시키는 도구
// atom은 그냥 배열.
//selector는 state를 가져다가 뭔가를 return함

type categories = "TO_DO" | "DOING" | "DONE";

export interface IToDo {
    text: string;
    id: number;
    category: categories;
};

export const categoryState = atom<categories>({
    key:"category",
    default: "TO_DO",
});

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: [],
});

export const toDoSelector = selector({
    key: "toDoSelector",
    //get function을 이용하면 selector의 내부로 atom을 가져올수 있음.
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});