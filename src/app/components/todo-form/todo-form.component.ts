import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DateValidators } from './../../shared/validators/date-validators';
import { TodoService} from './../../shared/services/todo.service';
import { TodoInterface } from '../../shared/interfaces/todo-interface';
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

  constructor(
    private formBuilder: FormBuilder,
    private todoService: TodoService
    ) { }
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
        '', // valeur par défaut pour le contrôle du title
        [Validators.required, Validators.minLength(5)] // Règle de validation à appliquer
      ],
      begin: [
        '',
        [Validators.required]
      ],
      end: [
        '',
        [Validators.required]
      ]
    },
      {
        validator: Validators.compose([
          DateValidators.dateLessThan('begin', 'end', { 'begin': true })
        ])
      });
  }

  /**
   * Emet le nouveau todo 
   */

   public saveTodo(): void {
     const _todo: TodoInterface = this.todoForm.value;
     _todo.isChecked = false;
     this.todoService.sendTodo(_todo);
      
   }

}
