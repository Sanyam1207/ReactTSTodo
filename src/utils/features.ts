export const saveLocal = (todo : TodoItemType[]) : void => {
    localStorage.setItem("mytodos", JSON.stringify(todo))
}

export const getLocal = () : [] => {
    const todos = localStorage.getItem("mytodos");
    return todos?JSON.parse(todos):[]
}