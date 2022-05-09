import { Component, OnInit } from '@angular/core';
import {Staff} from "../model/Staff";
import {Player} from "../model/Player";
import {Team} from "../model/Team";
import {Role} from "../model/Role";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "../shared/service/User.service";
import {LocalStorageService} from "ngx-webstorage";
import {ConfirmationService, MessageService} from "primeng/api";
import {RoleService} from "../shared/service/role.service";
let STAFFS : Staff[]
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {
  hide = true;
  page = 1;
  staffs!: Staff[];
  staff!: Staff;
  teams:Team[]=[];
  team!:Team;
  displayAdd!: boolean;
  displayEdit!: boolean;
  submitted!: boolean;
  roleList: Role[] = [];
  authentication: string[] = ['Mot de passe', 'Code Pin'];
  StaffGroup!: FormGroup;
  StaffForm!: Staff;
  title!: string;
  constructor(private modalService: NgbModal, private userService: UserService, private formBuilder: FormBuilder,
              private localStorageService: LocalStorageService, private confirmationService: ConfirmationService,
              private messageService: MessageService, private roleService: RoleService) {
    this.StaffGroup=this.formBuilder.group({
      firstNameControl: ['',Validators.required],
      lastNameControl: ['',Validators.required],
      jobControl: ['',Validators.required],
      teamControl:['',Validators.required]
    }) ;
    this.StaffForm={
      id:undefined,
      firstName:'',
      lastName:'',
      job:'',
      team:new Team()
    }
  }

  ngOnInit(): void {
    this.getAllStaffs();
  }
  open(content: any) {
    this.modalService.open(content, {size: 'lg'});
  }
  getAllStaffs(){
    return this.userService.getAllStaff().subscribe(data =>{
      this.staffs=data;
      STAFFS=this.staffs;
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.StaffGroup.controls;
  }
  deleteStaff(staff: Staff){
    this.confirmationService.confirm({
      message: 'delete Team ? ' + staff.firstName + '?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      accept:()=>{
        if (staff.id!=null){
          this.userService.deleteStaff(staff.id).subscribe(data =>{
            console.log(JSON.stringify(data.message))
            if (JSON.stringify(data.message == "success")) {
              this.staffs = this.staffs.filter(val => val.id !== staff.id);

              this.messageService.add({severity: 'success', summary: 'Successful', detail: data.message, life: 1000});
            } else {
              this.messageService.add({severity: 'error', summary: 'Probléme de suppression', detail: data.message});
            }
          })
        }
      }
    })
  }
  saveEditStaff(staff: Staff) {
    this.displayEdit = true
    console.log(staff);
    this.userService.addStaff(staff).subscribe(data => {
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
  editStaff(staff: Staff) {
    this.title='Edit staff';
    this.staff = {...staff};
    this.displayEdit = true;
    this.displayAdd = false;
    this.StaffGroup = this.formBuilder.group({
      firstNameControl: [this.staff.firstName, Validators.required],
      lastNameControl: [this.staff.lastName, Validators.required],
      positionControl: [this.staff.job, Validators.required],
      teamControl : [this.staff.team,Validators.required]
    });
    console.log(this.StaffGroup)

  }
  getAllTeams() {
    return this.userService.getAllTeams().subscribe(data =>{
      this.teams=data;


    })
  }
  addStaff() {
    this.StaffGroup = this.formBuilder.group({
      firstNameControl: ['', Validators.required],
      lastNameControl: ['', Validators.required],
      jobControl: ['', Validators.required],
      teamControl :['',Validators.required]
    });
    this.displayAdd = true;
    this.displayEdit = false;
    this.title='Ajouter player';
    this.getAllTeams();
  }
  showMaximizableDialog() {
    this.displayAdd = true;
    this.submitted = false;
  }
  saveNewStaff() {
    if (this.StaffGroup.invalid) {
      console.log(JSON.stringify(this.StaffGroup.value, null, 2));
      return;
    }
    this.StaffForm.firstName = this.f.firstNameControl.value;
    this.StaffForm.lastName = this.f.lastNameControl.value;
    this.StaffForm.job = this.f.jobControl.value;
    this.StaffForm.team=this.f.teamControl.value;

    this.userService.addStaff(this.StaffForm).subscribe(data => {
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
