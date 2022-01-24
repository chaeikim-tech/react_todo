import React from 'react';
import {useForm} from "react-hook-form";

/* function ToDoList() {
    const [ toDo, setToDo ] = useState("");
    const [ toDoError, setToDoError ] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const { currentTarget: { value }} = event;
        setToDoError("");
        setToDo(value);
    };
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (toDo.length < 10 ){
            return setToDoError("To do should be longer");
        }
        console.log("submit");
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={toDo} placeholder='Write a to do' />
                <button>Add</button>
                {toDoError !== "" ? toDoError : null}
            </form>
        </div>
    );
} */

interface IForm {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    password1: string;
    extraError?: string;
  }

function ToDoList() {
    const { register, handleSubmit, formState: {errors}, setError,} = useForm<IForm>({
        // setError = 발생하는 문제에 따라 추가적으로 에러를 설정할 수 있게 도와줌.
        defaultValues:{
            email: "@naver.com",
        },
    });
    const onValid = (data: IForm) => {
        if(data.password !== data.password1){
            setError("password1",{ message: "Password are not the same"}, {shouldFocus: true});
        }
        // setError("extraError", { message: "Server offline."});
    };
    console.log(errors);
    return(
        <div>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={handleSubmit(onValid)}>
                <input {...register("email",{
                    required: "Email is required",
                    pattern:{
                        value:/^[A-Za-z0-9._%+-]+@naver.com$/,
                        message:"Only naver.com emails allowed",
                },
                })} placeholder='Email' />
                <span>{errors?.email?.message}</span>
                <input {...register("firstName",{
                    required: "Write here", 
                    validate: {
                        noMickey: (value) => value.includes("mickey") ? "no mickey allowed": true,
                        noMouse: (value) => value.includes("mouse") ? "no mouse allowed" : true,
                    },
                    })}
                    placeholder='First Name' />
                <span>{errors?.firstName?.message}</span>
                <input {...register("lastName",{required: "Write here"})} placeholder='Last Name' />
                <span>{errors?.lastName?.message}</span>
                <input {...register("username",{required: "Write here", minLength: 5})} placeholder='Username' />
                <span>{errors?.username?.message}</span>
                <input {...register("password",{required: "Write here", minLength: 10})} placeholder='Password' />
                <span>{errors?.password?.message}</span>
                <input {...register("password1",{required: "Password is required",minLength:{value:10, message: "Your password is too short.",},})} placeholder='Password1' />
                <span>{errors?.password1?.message}</span>
                <button>Add</button>
                <span>{errors?.extraError?.message}</span>
            </form>
        </div>
    )

}


export default ToDoList;