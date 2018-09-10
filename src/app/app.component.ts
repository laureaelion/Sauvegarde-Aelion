import { Component } from '@angular/core';
import { TodoInterface } from './shared/interfaces/todo-interface';
import { CHECKBOX_VALUE_ACCESSOR } from '@angular/forms/src/directives/checkbox_value_accessor';
import { DeprecatedI18NPipesModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: String = 'Hello Angular';

  /**
   * @var todos : TodoInterface []
   * Tableau des todos
   */
  public todos: TodoInterface[];

  /**
   * @var aTodo: String 
   * Nouveau todo à ajouter à notre tableau 
   */
  public aTodo: String;

  public checkedStatus: boolean= false;


  /**
   * Constructeur de la classe AppComponent
   * Invoquées dés la création d'un objet de type AppComponent
   */
  public constructor() {
   /** this.todos = [
      { title: 'Nouveau todo', isChecked: false },
      { title: 'What the fuck', isChecked: false }
    ];
    */

    this.aTodo = ''
  }
  
  /**
   * Ajouter un todo au Tableau des Todos 
   * @return void 
   */
  /**
  public addTodo(): void {
    this.todos.push({ title: this.aTodo, isChecked: false })
    this.aTodo = ""
  }
  */

  /**
   * désactiver le bouton tant qu'il y a moins de 5 caractères
   */
  public notEnoughForMe(): Boolean {
    return this.aTodo.length <= 5;
  }

  /**
   * Determine l'état d'un todo checked or not 
   * @param TodoInterface todo le todo à tester
   */
  public isChecked (todo: TodoInterface): Boolean {
    return todo.isChecked;
  }
  /**
   * Suprimer un todo
   * @param index : numbre Indice de l'élèment a supprimer du tableau
   */
  public delete(index: number): void {
    console.log('Okay je doit enlever l\'élément à l\'indice : ' + index);

    // On peut donc supprimer l'élément du tableau 
    this.todos.splice(index, 1);
  }
  
  public checkUncheckAll(){
    this.checkedStatus = !this.checkedStatus;
//appel la methode prive check
    this._check();
  }

  /**
   * Bascule l'état de isChecked d'un todo
   * @param index Indice de l'élément dans le tableau 
   */
  public toggle(index: number): void {
    this.todos[index].isChecked = !this.todos[index].isChecked
    this.checkedStatus= this._allChecked();

  }
/**
 * Change l'état de tous les todos
 */
  private _check(): void {
    for(let index = 0; index < this.todos.length;index++)
    this.todos[index].isChecked = this.checkedStatus;
  }
  /**
   * Supprimer les Todos cochés
   */
  public deleteChecked() {
    const _todos: TodoInterface[] = [];

    for (const todo of this.todos) {
      if (!todo.isChecked) {
        _todos.push(todo);
      }
    }
    this.todos = _todos;
  }

  /**
   * Détermine si oui ou non une boite est cochée
   */
  public noneChecked(): Boolean {
    let status: Boolean = true;
    for (const todo of this.todos) {
      if (todo.isChecked) {
        status = false;
      }
    }
    return status;
  }
  private _allChecked(): boolean {
    let allChecked: boolean = true;

    for (const todo of this.todos){
      if(todo.isChecked){
        allChecked = false;
      }
    }
    return allChecked;
  }




  public changeTitle(): void {
    this.title = 'Hola Angular';
  }

}
