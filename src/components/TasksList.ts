import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers/connect-mixin.js";
import store from "../store/store";
import { fetchTasks, toggleTask, deleteTask } from "../store/actions";
const API_URL = "http://localhost:3005/tasks";

export class TasksList extends connect(store)(LitElement) {
  tasks: Array<any> = [];

  static get properties() {
    return {
      tasks: { type: Array },
    };
  }

  static styles = css`
    .task {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      border: 1px solid #ccc;
      margin: 5px 0;
    }
  `;

  stateChanged(state: any) {
    const tasks = state.tasksData.tasks;
    if (tasks && tasks.length > 0) {
      this.tasks = tasks;
    }
  }

  async connectedCallback() {
    super.connectedCallback();
    await fetchTasks();
  }

  render() {
    return html`
      <p>Tasks List</p>
      ${this.tasks.map(
        (task) => html`
          <div class="task">
            <input
              type="checkbox"
              .checked=${task.status === "finished"}
              @change=${() => this.toggleTaskStatus(task)}
            />
            ${task.task}
            <button @click=${() => this.deleteTaskById(task._id)}>
              Delete
            </button>
          </div>
        `
      )}
    `;
  }

  toggleTaskStatus(task: any) {
    const newStatus = task.status === "pending" ? "finished" : "pending";
    store.dispatch(toggleTask(task._id, newStatus));
  }

  deleteTaskById(taskId: string) {
    store.dispatch(deleteTask(taskId));
  }
}

customElements.define("tasks-list", TasksList);
