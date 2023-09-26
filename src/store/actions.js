import store from "./store";
const API_URL = "http://localhost:3005/tasks";

export const addTask = (task) => async (dispatch) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    dispatch({ type: "ADD_TASK", payload: data });
  } catch (error) {
    console.error("Error adding task:", error);
  }
};

export const toggleTask = (taskId, status) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = await response.json();
    dispatch({ type: "TOGGLE_TASK", payload: data });
  } catch (error) {
    console.error("Error toggling task:", error);
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });

    dispatch({ type: "DELETE_TASK", payload: { _id: taskId } });
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    store.dispatch({ type: "SET_TASKS", payload: data });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
