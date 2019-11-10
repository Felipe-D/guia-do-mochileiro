import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { BackApiService } from '../services/back-api.service';

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

  constructor(private modalService: BsModalService, private back: BackApiService) { }

  ngOnInit() {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { backdrop: true, keyboard: true });
  }

  logar() {
    let body:object = { "username": `${this.user}`, "password": `${this.pass}`};
    try {
      this.back.login(body)
        .subscribe(result => {
          if(result.id) {
            this.back.setId(result.id);
            console.log(this.back.getId())
          }else {
            alert(this.feedback(result.statusCode))
          }
          this.clearForms();
        })
      
    } catch (error) {
      console.log(error)
    }
  }
  addUser() {
    let body:object = { "username": `${this.user}`, "password": `${this.pass}`, "email": `${this.mail}`};
    try {
      this.back.postUser(body)
        .subscribe(result => {
          console.log(result);
          if(result.id) {
          }else {
            alert(this.feedback(result.statusCode))
          }
          this.clearForms();
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
