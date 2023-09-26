import { LitElement, html, css } from "lit";
import "./TaskCreate.ts";
import "./TasksList.ts";

export class TodoList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      max-width: 500px;
      margin: 40px auto;
      background-color: #f9f9f9;
    }
  `;

  render() {
    return html`
      <tasks-create></tasks-create>
      <tasks-list></tasks-list>
    `;
  }
}

customElements.define("todo-list", TodoList);
