import {dateSelectionJoinTransformer} from "@fullcalendar/angular";
import {Team} from "./Team";

export class Player{
  id?:number;
  firstName! : string;
  lastName! : string;
  position! : string;
  team: Team = new Team();

}
