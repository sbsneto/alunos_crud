import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AlunoService } from '../aluno.service';
import { Aluno } from './../aluno';


@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {

  dataSaved = false;
  alunoForm: any;
  allAlunos!: Observable<Aluno[]>;
  alunoIdUpdate = "";
  

  constructor(
    private formBuilder: FormBuilder, 
    private alunoService: AlunoService ) { }
  
  //Validar se os campos estão preenchidos  
  ngOnInit() {
    this.alunoForm = this.formBuilder.group({
      Nome:["", [Validators.required]],
      Email:["",[Validators.required]],
    });
    this.loadAllAlunos();
  }

  //Listar os alunos cadastrados
  loadAllAlunos(){
    this.allAlunos = this.alunoService.getAllAlunos();
  }

  //Coleta os dados digitados e chama a função de cadastro 
  onFormSubmit() {
    this.dataSaved = false;
    const aluno = this.alunoForm.value;
    this.CreateAluno(aluno);
    this.alunoForm.reset();
  }

  //Cadastrar aluno
  CreateAluno(aluno: Aluno){
    
    //Validar se é uma inclusão ou uma edição
    if(this.alunoIdUpdate == ""){
      this.alunoService.createAluno(aluno).subscribe(
        () => {
          this.dataSaved = true;
          this.alunoService.showMessage("Registro salvo com sucesso");
          //this.message = 'Registro salvo com sucesso';
          this.loadAllAlunos();
          this.alunoIdUpdate = "";
          this.alunoForm.reset();
        });
    } else {
      aluno.id = this.alunoIdUpdate;
      this.alunoService.updateAluno(this.alunoIdUpdate,aluno)
      .subscribe(() => {
        this.dataSaved = true;
        this.alunoService.showMessage('Registro atualizado com sucesso');
        this.loadAllAlunos();
        this.alunoIdUpdate = "";
        this.alunoForm.reset();
      });

    }
  }

  //Editar aluno
  loadAlunoToEdit(id: string) {
    this.alunoService.getAlunoById(id)
    .subscribe(aluno => {
      this.dataSaved = false;
      this.alunoIdUpdate = aluno.id;
      this.alunoForm.controls['Nome'].setValue(aluno.nome);
      this.alunoForm.controls['Email'].setValue(aluno.email);
    });
  }

  //Remover aluno
  deleteAluno(id: string){
    if(confirm("Deseja realmente deletar este aluno?")){
      this.alunoService.deleteAlunoById(id)
      .subscribe(() => {
        this.dataSaved = true;
        this.alunoService.showMessage('Registro deletado com sucesso');
        this.loadAllAlunos();
        this.alunoIdUpdate = "";
        this.alunoForm.reset();
        
      });
    }
  }

}
