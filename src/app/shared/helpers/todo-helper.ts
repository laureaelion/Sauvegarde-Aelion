import { MatColumns } from "../interfaces/mat-columns";

export class TodoHelper {
    private todoTableMap: Map<String, MatColumns> = new Map();

    public constructor() {
        this.todoTableMap.set(
            'title', {title: 'A faire', always: true, value: 'title', isDisplayed: true}
        );
        this.todoTableMap.set(
            'begin', {title: 'Du...', always: false, value: 'begin', isDisplayed: true}
        );
        this.todoTableMap.set(
            'end', {title: 'Au...', always: false, value: 'end', isDisplayed: true}
        );
        this.todoTableMap.set(
            'update', {title: '', always: true, value: 'update', isDisplayed: true}
        );
        this.todoTableMap.set(
            'delete', {title: '', always: true, value: 'delete', isDisplayed: true}
        );   
    }

    /**
     * Retourne le tableau des colonnes à afficher à partir du Map défini
     */
    public getDisplayedColumns() : String[]{
        const toDisplay: String[] = [];
        
        this.todoTableMap.forEach((column, key)=> {
            if( column.isDisplayed){
                toDisplay.push(column.value);
            }
        });
        return toDisplay;
    }

    /**
     * Retourne la liste des colonnes à afficher
     * @param userSelection Tableau contenant la selection utilisateur
     */

     public setDisplayedColumns(userSelection: String[]): String[]{
         this.todoTableMap.forEach((column, key)=> {
             if (!column.always) {
                 if(userSelection.indexOf(column.value)=== -1){
                     column.isDisplayed = false;
                 }else{
                     column.isDisplayed = true;
                 }
                 this.todoTableMap.set(key, column); // remplace l'objet à la clé concerné
             }
         });
         return this.getDisplayedColumns();
     }

    /**
     * Retourne un des élément du map
     */

     public getColumn(key: String): MatColumns {
         return this.todoTableMap.get(key);
     }

      /**
     * Retourne le tableau des colonnes à afficher à partir du Map défini
     */
    public getOptionalColumns() : MatColumns[] {
        const toDisplay: MatColumns[] = [];
        
        this.todoTableMap.forEach((column, key)=> {
            if( !column.always){
                toDisplay.push(column);
            }
        });
        return toDisplay;
    }

    public optionalColumnsToArray(): String[] {
        const toDisplay: String[] = []

        this.todoTableMap.forEach((column, key)=> {
            if( !column.always){
                toDisplay.push(column.value);
            }
        });
        return toDisplay;
    }



}
