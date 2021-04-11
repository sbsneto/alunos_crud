import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aluno } from './aluno';
import { MatSnackBar } from '@angular/material/snack-bar';

var httpOptions = {
  headers: new HttpHeaders(
    {"Content-Type": "application/json"}
  )};

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url = 'https://localhost:44387/api/alunos';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
  }

  getAllAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.url);
  }

  getAlunoById(id: string): Observable<Aluno> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Aluno>(apiUrl);
  }

  createAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.url, aluno, httpOptions);
  }

  updateAluno(id: string, aluno: Aluno): Observable<Aluno> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.put<Aluno>(apiUrl, aluno, httpOptions);
  }

  deleteAlunoById(id: string): Observable<number> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<number>(apiUrl, httpOptions);
  }
}
