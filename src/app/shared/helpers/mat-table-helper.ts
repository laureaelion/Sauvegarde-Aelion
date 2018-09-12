import { MatColumns } from "../interfaces/mat-columns";

export class MatTableHelper {
    protected todoTableMap: Map<String, MatColumns> = new Map();

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
