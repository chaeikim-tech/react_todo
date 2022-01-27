import { atom, selector } from "recoil";
//selector = atom의 output을 변형시키는 도구
// atom은 그냥 배열.
//selector는 state를 가져다가 뭔가를 return함

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

//enum = enumerable = 프로그래머를 도와주기 위해서 일련의 숫자를 문자로 표현해줌.
//열거형으로 이름이 있는 상수들의 집합을 정의할 수 있습니다.
//열거형을 사용하면 의도를 문서화 하거나 구분되는 사례 집합을 더 쉽게 만들수 있습니다.
//TypeScript는 숫자와 문자열-기반 열거형을 제공합니다.
//https://www.typescriptlang.org/ko/docs/handbook/enums.html

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
};

export const categoryState = atom<Categories>({
    key:"category",
    default: Categories.TO_DO,
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