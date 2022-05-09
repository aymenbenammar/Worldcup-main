import {Component, OnInit} from '@angular/core';
import {Team} from "../model/Team";
import {Role} from "../model/Role";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Staff} from "../model/Staff";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../shared/service/User.service";
import {LocalStorageService} from "ngx-webstorage";
import {ConfirmationService, MessageService} from "primeng/api";
import {RoleService} from "../shared/service/role.service";
import {Player} from "../model/Player";
import {Router} from "@angular/router";

let PLAYERS: Player[]

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {
  hide = true;
  page = 1;
  players!: Player[];
  player!: Player;
  teams: Team[] = [];
  team!: Team;
  displayAdd!: boolean;
  displayEdit!: boolean;
  submitted!: boolean;
  roleList: Role[] = [];
  authentication: string[] = ['Mot de passe', 'Code Pin'];
  PlayerGroup!: FormGroup;
  PlayerForm!: Player;
  title!: string;

  constructor(private modalService: NgbModal, private userService: UserService, private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService, private confirmationService: ConfirmationService,
              private messageService: MessageService, private roleService: RoleService,
              private router: Router) {
    this.PlayerGroup = this.formBuilder.group({
      firstNameControl: ['', Validators.required],
      lastNameControl: ['', Validators.required],
      positionControl: ['', Validators.required],
      teamControl: ['', Validators.required]
    });
    this.PlayerForm = {
      id: undefined,
      firstName: '',
      lastName: '',
      position: '',
      team: new Team()
    }

  }

  ngOnInit(): void {
    this.getAllPlayers();
  }

  open(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }

  getAllPlayers() {
    return this.userService.getAllPlayers().subscribe(data => {
      this.players = data;
      PLAYERS = this.players;
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.PlayerGroup.controls;
  }

  deletePlayer(player: Player) {
    this.confirmationService.confirm({
      message: 'delete Team ? ' + player.firstName + '?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (player.id != null) {
          this.userService.deletePlayer(player.id).subscribe(data => {
            console.log(JSON.stringify(data.message))
            if (JSON.stringify(data.message == "success")) {
              this.players = this.players.filter(val => val.id !== player.id);

              this.messageService.add({severity: 'success', summary: 'Successful', detail: data.message, life: 1000});
            } else {
              this.messageService.add({severity: 'error', summary: 'Probléme de suppression', detail: data.message});
            }
          })
        }
      }
    })
    window.location.href="http://localhost:4200/#/admin/players"
  }

  saveEditPlayer(player: Player) {
    this.displayEdit = true
    console.log(player);
    this.userService.addPlayer(player).subscribe(data => {
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

  editPlayer(player: Player) {
    this.title = 'Edit Team';
    this.player = {...player};
    this.displayEdit = true;
    this.displayAdd = false;
    this.PlayerGroup = this.formBuilder.group({
      firstNameControl: [this.player.firstName, Validators.required],
      lastNameControl: [this.player.lastName, Validators.required],
      positionControl: [this.player.position, Validators.required],
      teamControl: [this.player.team, Validators.required]
    });
    console.log(this.PlayerGroup)

  }

  getAllTeams() {
    return this.userService.getAllTeams().subscribe(data => {
      this.teams = data;


    })
  }

  addPlayer() {
    this.PlayerGroup = this.formBuilder.group({
      firstNameControl: ['', Validators.required],
      lastNameControl: ['', Validators.required],
      positionControl: ['', Validators.required],
      teamControl: ['', Validators.required]
    });
    this.displayAdd = true;
    this.displayEdit = false;
    this.title = 'Ajouter player';
    this.getAllTeams();
    // window.location.href = "/#/admin/users";
    this.router.navigateByUrl('admin/playerss');

  }

  showMaximizableDialog() {
    this.displayAdd = true;
    this.submitted = false;
  }

  saveNewPlayer() {
    if (this.PlayerGroup.invalid) {
      console.log(JSON.stringify(this.PlayerGroup.value, null, 2));
      return;
    }
    this.PlayerForm.firstName = this.f.firstNameControl.value;
    this.PlayerForm.lastName = this.f.lastNameControl.value;
    this.PlayerForm.position = this.f.positionControl.value;
    this.PlayerForm.team = this.f.teamControl.value;

    this.userService.addPlayer(this.PlayerForm).subscribe(data => {
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

  comparer(o1: any, o2: any): boolean {
    // if possible compare by object's name, and not by reference.
    return o1 && o2 ? o1.label === o2.label : o2 === o2;
  }


}
