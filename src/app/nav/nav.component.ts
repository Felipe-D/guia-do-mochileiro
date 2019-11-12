import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BackApiService } from '../services/back-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  modalRef: BsModalRef;
  user:string;
  pass:string;
  mail:string;
  cadastro: boolean = false;
  isCollapsed:boolean = true;
  pfCol:boolean = true;
  private loader:boolean = false;
  constructor(
    private modalService: BsModalService, 
    private back: BackApiService, 
    private rote: Router) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { backdrop: true, keyboard: true });
  }

  goTo(){
    this.rote.navigateByUrl('history/');
    this.pfCol = true;
  }

  logout(){
    this.back.logout().subscribe(result =>{
      if(!result){
        this.back.setId(null);
        this.back.setName(null);
        this.pfCol = true;
        this.rote.navigateByUrl('');
      }
    })
  }
  logar() {
    this.loader = true;
    let body:object = { "username": `${this.user}`, "password": `${this.pass}`};
    try {
      this.back.login(body)
        .subscribe(result => {
          if(result.id) {
            this.back.setId(result.id);
            this.back.setName(this.user);
            alert(this.feedback(200));
            this.rote.navigateByUrl('search/');
            console.log(this.back.getId())
          }else {
            alert(this.feedback(result.statusCode))
          }
          this.clearForms();
          this.loader = false;
          this.modalRef.hide();
        })
      
    } catch (error) {
      console.log(error)
    }
  }
  addUser() {
    let body:object = { "username": `${this.user}`, "password": `${this.pass}`, "email": `${this.mail}`};
    try {
      this.loader = true;
      this.back.postUser(body)
        .subscribe(result => {
          console.log(result);
          if(result.id) {
            alert(this.feedback(200));
          }else {
            alert(this.feedback(result.statusCode))
          }
          this.clearForms();
          this.loader = false;
        })
      
    } catch (error) {
      console.log(error)
    }
  }

  clearForms(){
    this.mail = undefined;
    this.user = undefined;
    this.pass = undefined;
  }

  feedback(status){
    switch(status){
      case 422:
        return "Usuário ou Email já cadastrado";
      case 401:
        return "Usuário ou Senha incorreto";
      case 200:
        return "Operação realizada com sucesso";
    }
  }
}
