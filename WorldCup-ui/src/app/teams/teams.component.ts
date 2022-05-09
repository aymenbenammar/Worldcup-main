import { Component, OnInit } from '@angular/core';
import {Team} from "../model/Team";
import {User} from "../model/User";
import {Role} from "../model/Role";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../shared/service/User.service";
import {LocalStorageService} from "ngx-webstorage";
import {ConfirmationService, MessageService} from "primeng/api";
import {RoleService} from "../shared/service/role.service";
import Validation from "../model/Validation";
let TEAMS : Team []=[];
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  hide = true;
  page = 1;
  teams!: Team[];
  team!: Team;
  displayAdd!: boolean;
  displayEdit!: boolean;
  submitted!: boolean;
  roleList: Role[] = [];
  authentication: string[] = ['Mot de passe', 'Code Pin'];
  TeamGroup!: FormGroup;
  TeamForm!: Team;
  title!: string;
  constructor(private modalService: NgbModal, private userService: UserService, private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService, private confirmationService: ConfirmationService,
              private messageService: MessageService, private roleService: RoleService) {
    this.TeamGroup=this.formBuilder.group({
      addressControl: ['',Validators.required],
      nameControl: ['',Validators.required]
    }) ;
    this.TeamForm={
      id:undefined,
      address:'',
      name: ''
    }
  }

  ngOnInit(): void {
    this.getAllTeams();
  }
  open(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }
  getAllTeams(){
    return this.userService.getAllTeams().subscribe(data =>{
      this.teams=data;
      TEAMS=this.teams;
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.TeamGroup.controls;
  }
  deleteTeam(team: Team){
    this.confirmationService.confirm({
      message: 'delete Team ? ' + team.name + '?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept:()=>{
        if (team.id!=null){
          this.userService.deleteTeam(team.id).subscribe(data =>{
            console.log(JSON.stringify(data.message))
            if (JSON.stringify(data.message == "success")) {
              this.teams = this.teams.filter(val => val.id !== team.id);

              this.messageService.add({severity: 'success', summary: 'Successful', detail: data.message, life: 1000});
            } else {
              this.messageService.add({severity: 'error', summary: 'Probléme de suppression', detail: data.message});
            }
          })
        }
        }
      })
  }
  saveEditTeam(team: Team) {
    this.displayEdit = true
    console.log(team);
    this.userService.addTeam(team).subscribe(data => {
      this.messageService.add({
        severity: 'success',
        summary: 'Ajouter utilisateur',
        detail: 'L\'utilisateur est modifié avec success'
      });
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Probléme ajout utilisateur',
        detail: 'Impossible de modifier l\'utilisateur'
      });
    })
  }
  editTeam(team: Team) {
    this.title='Edit Team';
    this.team = {...team};
    this.displayEdit = true;
    this.displayAdd = false;
    this.TeamGroup = this.formBuilder.group({
      addressControl: [this.team.address, Validators.required],
      nameControl: [this.team.name, Validators.required],
    });
    console.log(this.TeamGroup)

  }
  addTeam() {
    this.TeamGroup = this.formBuilder.group({
     addressControl: ['', Validators.required],
      nameControl: ['', Validators.required],
    });
    this.displayAdd = true;
    this.displayEdit = false;
    this.title='Ajouter team';
  }
  showMaximizableDialog() {
    this.displayAdd = true;
    this.submitted = false;
  }
  saveNewTeam() {
    if (this.TeamGroup.invalid) {
      console.log(JSON.stringify(this.TeamGroup.value, null, 2));
      return;
    }
    this.TeamForm.name = this.f.nameControl.value;
    this.TeamForm.address = this.f.addressControl.value;

    this.userService.addTeam(this.TeamForm).subscribe(data => {
      this.messageService.add({
        severity: 'success',
        summary: 'Ajouter utilisateur',
        detail: 'L\'utilisateur est ajouté avec success'
      });
    }, error => {
      this.messageService.add({
        severity: 'error',
        summary: 'Probléme ajout utilisateur',
        detail: 'Impossible d\'ajouter l\'utilisateur'
      });
    })
  }

}
