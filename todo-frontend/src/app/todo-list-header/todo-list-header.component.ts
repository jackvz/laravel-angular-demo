import { Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent {

  newTodo: Todo = new Todo();
  searchTerm: string;

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  @Output()
  search: EventEmitter<string> = new EventEmitter();

  constructor() {
  }

  addTodo() {
    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
  }

  doSearch() {
    this.search.emit(this.searchTerm);
  }

}
