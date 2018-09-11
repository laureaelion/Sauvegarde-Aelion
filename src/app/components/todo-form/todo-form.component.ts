import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
//importation de la librairie pour les dates
import * as moment from 'moment';
import { TodoService} from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  /**
   * @var todoForm: FormGroup prise en charge du formulaire par Reactive forms
   */
  public todoForm: FormGroup;

  /**
   * Abonnement à un todo qui vient du tableau des todos et qui passe par l'intermédiaire du service
   */

   private todoSubscription: Subscription;

   /**
    * Définit un objet todo à mettre à jour 
    * @var TodoToUpdate: TodoInterface todo qui vient du tableau 
    */

   private TodoToUpdate: TodoInterface;

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService ){
      //Objet todoUpdate vide
      this.TodoToUpdate = {
        title:'',
        begin: new Date(),
        end: new Date()
      };
      //abonnement au todo
      this.todoSubscription = this.todoService.getTodo()
        .subscribe((unTodo)=>{
          console.log('je viens de recevoir un todo : '+JSON.stringify(unTodo));
          this.TodoToUpdate = unTodo;
          this._loadForm();
        });
    }
  
    
  /**
   * @returns FormControl Contrôle title du formulaire 
   */

  public get title() {
    return this.todoForm.controls.title;
  }
  /**
   * Méthode définie dans l'interface OnInit Est appelée immédiatement 
   * après le constructeur de la classe courante.
   * Construction du formulaire todoForm
   */
  ngOnInit() {
    //Définit le formulaire, ce su'il contient et les règle de validation du formulaire 
    this.todoForm = this.formBuilder.group({
      title: [
        this.TodoToUpdate.title, // valeur par défaut pour le contrôle du title
        [Validators.required, Validators.minLength(5)] // Règle de validation à appliquer
      ],
      begin: [
        moment(this.TodoToUpdate.begin).format('YYYY-MM-DD'),
        [Validators.required]
      ],
      end: [
        moment(this.TodoToUpdate.end).format('YYYY-MM-DD'),
        [Validators.required]
      ]
    },
      {
        validator: Validators.compose([
          DateValidators.dateLessThan('begin', 'end', { 'begin': true })
        ])
      });
 
  }

  private _loadForm(): void {
    this.ngOnInit();
  }
  /**
   * Emet le nouveau todo 
   */

   public saveTodo(): void {
     const _todo: TodoInterface = this.todoForm.value;
     _todo.isChecked = false;
     // On doit tenir compte des todo Update
     console.log ('todoToUpdate : '+ JSON.stringify(this.TodoToUpdate))
    
     if (this.TodoToUpdate.hasOwnProperty('id')){
       _todo.id = this.TodoToUpdate.id;
       this.todoService.UpdateTodo(_todo);
     }else{
       //c'est une insertion 
       this.todoService.addTodo(_todo);
     }
     }
      
   }


