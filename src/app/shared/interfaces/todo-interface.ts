export interface TodoInterface {
    /**
     * @var (optional) id: number
     * identifiant du todo 
     */
    id?:number;
    /**
     * titre du Todo
     * @var String
     */
    title: String;

    /**
     * Date de début pour le todo
     * @var Date begin
     */
    begin : Date;
    /**
     * date de fin pour le todo
     * * @var Date end
     */

     end: Date;
    
    /**
     * @var boolean
     * vrai si le todo est coché
     */
    isChecked?: boolean;
}
