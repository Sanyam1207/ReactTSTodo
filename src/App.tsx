import { AppBar, Button, Container, Stack, TextField, Toolbar, Typography } from "@mui/material"
import TodoItem from "./components/TodoItem"
import { useEffect, useState } from "react"
import { getLocal, saveLocal } from "./utils/features"

function App() {

  const [todos, setTodos] = useState<TodoItemType[]>(getLocal())

  const [title, setTitle] = useState<TodoItemType["title"]>("")


  const completeHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted
      }
      return todo
    })

    setTodos(newTodos)
  }

  const deleteHandler = (id: TodoItemType["id"]): void => {
    const newTodos: TodoItemType[] = todos.filter((todo) => {
      return (todo.id !== id)
    })

    setTodos(newTodos)
  }

  const submitHandler = (): void => {

    if (title !== "") {
      const newTodo: TodoItemType = {
        title,
        isCompleted: false,
        id: String(Math.random() * 1000)
      }

      setTodos(prev => [...prev, newTodo]);
      setTitle("")
    }
  }

  useEffect(() => {
    saveLocal(todos)
  }, [todos])
  

  return (
    <Container maxWidth={"sm"}
      sx={{
        marginTop: '1rem',
        height: "90vh",
        // margin: '1rem'

      }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>

      <Stack
        height={"80%"}
        direction={'column'}
        spacing={'1rem'}
        padding={'1rem'}
        sx={{
          overflowY: 'scroll',    // Only vertical scrolling
          overflowX: 'hidden',    // Disable horizontal scrolling
          '&::-webkit-scrollbar': {
            width: '2px',         // Thin scrollbar width (laser beam)
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',  // Scrollbar color (you can customize this)
            borderRadius: '10px',     // Rounded corners for the scrollbar
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',  // Darker color when hovered
          },
        }}
      >
        {
          todos.map((todo) =>
            <TodoItem
              key={todo.id}
              todo={todo}
              completeHandler={completeHandler}
              deleteHandler={deleteHandler}
              setTodo={setTodos}
              todos={todos}
            />

          )
        }
      </Stack>

      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth label={"New Task"}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitHandler()
          }
        }} />

      <Button variant="contained" sx={{
        margin: '1rem 0rem',
        height: '3.3rem',
        borderRadius: '1rem'
      }} fullWidth
        onClick={submitHandler}
        disabled={title === ""}>Add Task</Button>
    </Container>
  )
}

export default App
