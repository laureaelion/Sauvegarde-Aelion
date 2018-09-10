import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// Importer les modules d'observation 
import{Observable, Subject} from 'rxjs';
import{TodoInterface} from './../interfaces/todo-interface';
import { Constants } from './../constants/constants';

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

  public getTodos(id: number = null) : Observable<TodoInterface[]>{
   if(id !== null){
    return this._api.get<TodoInterface[]>(
     Constants._API_ROOT + '/' + id
    );
   }else {
     return this._api.get<TodoInterface[]>(
      Constants._API_ROOT
     );

   }
  }

  /**
   * Methode permettant aux autres classes de souscrire (observer) le sujet 
   */
  public getTodo (): Observable<TodoInterface>{
    return this.todoSubject.asObservable();
  }

  /**
   * Methode qui diffuse le sujet vers les donées 
   * @param todo TodoInterface un todo qui passe par là
   */
  public sendTodo(todo: TodoInterface) {
    this.todoSubject.next(todo);
  }
}
