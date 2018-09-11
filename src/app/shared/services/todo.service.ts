import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// Importer les modules d'observation 
import { Observable, Subject } from 'rxjs';
import { TodoInterface } from './../interfaces/todo-interface';
import { Constants } from './../constants/constants';
import { constants } from 'os';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private todoSubject: Subject<TodoInterface> = new Subject<TodoInterface>();

  /**
   * Injection de dépendance HttpClient
   * @param _api: HTTPClient transport vers le Backend
   */

  constructor(private _api: HttpClient) { }

  public getTodos(id: number = null): Observable<TodoInterface[]> {
    if (id !== null) {
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT + '/' + id
      );
    } else {
      return this._api.get<TodoInterface[]>(
        Constants._API_ROOT
      );

    }
  }

  public addTodo(todo: TodoInterface) {
    this._api.post<TodoInterface[]>(
      Constants._API_ROOT,
      todo
    ).subscribe((addedTodo) => {
      addedTodo[0].isChecked = false;
      this.sendTodo(addedTodo[0]);
      const _emptyTodo = {
        title: '',
        begin: new Date(),
        end: new Date()}
        this.sendTodo(_emptyTodo);
    });
  }
  /**
   * Supprime un todo physiquement
   * @param todo: TodoInterface todo à supprimer 
   */
  public deleteTodo(todo: TodoInterface): void {

    this._api.delete(
      Constants._API_ROOT + "/" + todo.id
    ).subscribe((result) => {
//RIEN 
    })

  }

  /**
   * Methode permettant aux autres classes de souscrire (observer) le sujet 
   */
  public getTodo(): Observable<TodoInterface> {
    return this.todoSubject.asObservable();
  }

  /**
   * Methode qui diffuse le sujet vers les donées 
   * @param todo TodoInterface un todo qui passe par là
   */
  public sendTodo(todo: TodoInterface) {
    this.todoSubject.next(todo);
  }

  public UpdateTodo(todo: TodoInterface): void{
    this._api.put<TodoInterface>(
      Constants._API_ROOT + '/' + todo.id,
      todo
      ).subscribe((result)=>{
        // On oublie pas de transmettre le todo modifié
        const _emptyTodo = {
          title: '',
          begin: new Date(),
          end: new Date()
        }
        this.sendTodo(todo);
        this.sendTodo(_emptyTodo);
      });
  }
}
