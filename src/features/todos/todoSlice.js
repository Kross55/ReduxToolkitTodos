import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FILTER_ALL } from "./constants/filterTypes";

const API_URL = "https://647c17f9c0bae2880ad06138.mockapi.io/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", () => {
    return axios
        .get(API_URL)
        .then((response) => response.data)
        .catch((error) => {
            throw Error(error.message);
        });
});

export const addTodo = createAsyncThunk("todos/addTodo", (text) => {
    return axios
        .post(API_URL, { text, completed: false })
        .then((response) => response.data)
        .catch((error) => {
            throw Error(error.message);
        });
});

export const toggleTodo = createAsyncThunk(
    "todos/toggleTodo", ({ id, completed }) => {
        return axios
            .put(`${API_URL}/${id}`, { completed })
            .then(() => id)
            .catch((error) => {
                throw Error(error.message);
            });
    }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", (id) => {
    return axios
        .delete(`${API_URL}/${id}`)
        .then(() => id)
        .catch((error) => {
            throw Error(error.message);
        });
});

const initialState = {
    todos: [],
    filter: FILTER_ALL,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todos.push(action.payload);
            })
            .addCase(toggleTodo.fulfilled, (state, action) => {
                const id = action.payload;
                const todo = state.todos.find((todo) => todo.id === id);
                if (todo) {
                    todo.completed = !todo.completed;
                }
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const id = action.payload;
                const updatedTodos = state.todos.filter((todo) => todo.id !== id);
                state.todos = updatedTodos;
            });
    },
});

export const { setFilter } = todoSlice.actions;

export default todoSlice.reducer;



// eslint-disable-next-line no-lone-blocks
{/*import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://647c17f9c0bae2880ad06138.mockapi.io/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const response = await axios.post(API_URL, { text, completed: false });
  return response.data;
});

export const toggleTodo = createAsyncThunk(
  "todos/toggleTodo",
  async ({ id, completed }) => {
    await axios.put(`${API_URL}/${id}`, { completed });
    return id;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const initialState = {
  todos: [],
  filter: "FILTER_ALL",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        const id = action.payload;
        const todo = state.todos.find((todo) => todo.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const id = action.payload;
        const updatedTodos = state.todos.filter((todo) => todo.id !== id);
        state.todos = updatedTodos;
      })
  },
});

export const { setFilter } = todoSlice.actions;

export default todoSlice.reducer;*/}
