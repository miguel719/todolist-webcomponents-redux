import {
  FASTElement,
  customElement,
  css,
  html,
  repeat,
  observable,
} from "@microsoft/fast-element";
import { connect } from "pwa-helpers";
import store from "../store/store";
import { fetchTasks, toggleTask, deleteTask } from "../store/actions";
const API_URL = "http://localhost:3005/tasks";

const template = html<TasksList>`
  <p>Tasks List</p>
  ${repeat(
    (x) => x.tasks,
    html<string>`
      <div class="task">
        <input
          type="checkbox"
          :checked=${(x) => x.status === "finished"}
          @change=${(x, c) => c.parent.toggleTaskStatus(x)}
        />
        ${(x) => x.task}

        <button @click=${(x, c) => c.parent.deleteTaskById(x._id)}>
          Delete
        </button>
      </div>
    `
  )}
`;

const styles = css`
  .task {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 5px 0;
  }
`;

@customElement({
  name: "tasks-list",
  template,
  styles,
})
export class TasksList extends connect(store)(FASTElement) {
  @observable tasks = [];

  stateChanged(state: any) {
    const tasks = state.tasksData.tasks;
    if (tasks && tasks.length > 0) {
      this.tasks = [...tasks];
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    await fetchTasks();
  }

  toggleTaskStatus(task: any) {
    const newStatus = task.status === "pending" ? "finished" : "pending";
    store.dispatch(toggleTask(task._id, newStatus));
  }

  deleteTaskById(taskId: string) {
    store.dispatch(deleteTask(taskId));
  }
}
