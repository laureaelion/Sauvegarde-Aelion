import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';

@Component({
  selector: 'view-todos',
  templateUrl: './view-todos.component.html',
  styleUrls: ['./view-todos.component.scss']
})
export class ViewTodosComponent implements OnInit {
  /**
   * Abonnement à un todo qui vient de l'espace (meuh non ...., de todoService)
   */
  private todoSubscription: Subscription;

  public todos: TodoInterface[];

  constructor(private todoService: TodoService) {
    this.todos = []; // Définit le tableau des todo à afficher

    this.todoSubscription = this.todoService.getTodo().subscribe((todo) => {
      console.log('observable todo' + JSON.stringify(todo))
      this.todos.push(todo);
    });

  }
  /**
   * Après construction de l'objet on charge la liste des todos existant dans la base
   */
  ngOnInit() {
    //Récupère les todos existants dans la base
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
      console.log('Il y a ' + this.todos.length + 'todos à afficher')
    });
  }


}
