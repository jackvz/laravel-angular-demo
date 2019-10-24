import { Component, Input } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-footer',
  templateUrl: './todo-list-footer.component.html',
  styleUrls: ['./todo-list-footer.component.scss']
})
export class TodoListFooterComponent {

  @Input()
  todos: Todo[];

  constructor() {
  }

  get activeTodos() {
    return this.todos.filter(todo => todo.complete == false);
  }
}
