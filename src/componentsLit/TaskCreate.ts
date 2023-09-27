import { LitElement, html, css } from "lit";
import { connect } from "pwa-helpers/connect-mixin.js";
import store from "../store/store.js";
import { addTask } from "../store/actions.js";

export class TasksCreate extends connect(store)(LitElement) {
  taskText: string = "";

  static get properties() {
    return {
      taskText: { type: String },
    };
  }

  static styles = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px 0;
  `;

  render() {
    return html`
      <input .value=${this.taskText} @input=${this.handleInput} />
      <button @click=${this.addNewTask}>Add</button>
    `;
  }

  handleInput(event: Event) {
    this.taskText = (event.target as HTMLInputElement).value;
  }

  addNewTask() {
    if (this.taskText) {
      store.dispatch(addTask({ task: this.taskText, status: "pending" }));
      this.taskText = "";
    }
  }
}

customElements.define("tasks-create", TasksCreate);
