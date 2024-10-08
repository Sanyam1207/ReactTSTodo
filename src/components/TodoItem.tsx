import { DeleteForeverOutlined, EditNoteOutlined } from "@mui/icons-material";
import { Button, Checkbox, Paper, Stack, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { saveLocal } from "../utils/features";

type PropTypes = {
  todo: TodoItemType;
  completeHandler: (id: TodoItemType["id"]) => void;
  deleteHandler: (id: TodoItemType["id"]) => void;
  todos: TodoItemType[]
};



const TodoItem = ({ todo, completeHandler, deleteHandler, todos }: PropTypes) => {

  const [editTitle, setEditTitle] = useState<string>(todo.title)
  const [editActive, setEditActive] = useState<boolean>(false);

  const editHandler = (id: TodoItemType["id"]) => {

    todos.filter((todo) => {
      if (todo.id === id) {
        setEditActive(prev => !prev)
        return todo.title = editTitle
      }
    })
  }

  useEffect(() => {
    saveLocal(todos)
  }, [todos])
  

  return (
    <>
      <Paper
        sx={{
          padding: "1rem",
        }}
      >
        {editActive && (
          <Card sx={{ minWidth: 275 }} elevation={2}>
            <CardContent>
              <Typography variant="h6" marginBottom={'1.2rem'} component="div">
                Edit Task
              </Typography>
              <TextField
                placeholder={todo.title}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth label={"Edit This Task"}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    editHandler(todo.id)
                  }
                }} />

              <Button variant="contained" sx={{
                margin: '1rem 0rem',
                height: '3.3rem',
                borderRadius: '1rem'
              }} fullWidth
                onClick={() => editHandler(todo.id)}
                disabled={editTitle === ""}>Confirm Edit</Button>
            </CardContent>
          </Card>
        )}

        <Stack direction={"row"} alignItems={"center"}>
          <Typography marginRight={"auto"} sx={{
            textDecoration: todo.isCompleted ? 'line-through' : "none"
          }}>{todo.title}</Typography>
          <Checkbox
            onClick={() => {
              completeHandler(todo.id);
            }}
            checked={todo.isCompleted}
          />
          <Button
            color="secondary"
            onClick={() => setEditActive((prev) => !prev)}
          >
            <EditNoteOutlined />
          </Button>
          <Button
            color="error"
            onClick={() => {
              deleteHandler(todo.id);
            }}
          >
            <DeleteForeverOutlined />
          </Button>
        </Stack>
      </Paper>


    </>
  );
};

export default TodoItem;
