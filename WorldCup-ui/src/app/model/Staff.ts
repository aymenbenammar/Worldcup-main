
import {Team} from "./Team";

export class Staff{
  id?: number;
  firstName!: string;
  lastName!:string;
  job!:string;
 // date:dateSelectionJoinTransformer;
  team: Team=new Team();
}

