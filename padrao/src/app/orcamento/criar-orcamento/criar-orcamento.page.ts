import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-orcamento',
  templateUrl: './criar-orcamento.page.html',
  styleUrls: ['./criar-orcamento.page.scss'],
})
export class CriarOrcamentoPage implements OnInit {
  public orcamentoForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.orcamentoForm = this.fb.group({
      username: ['', Validators.required],
    })
  }

  ngOnInit() { }

  public onSubmit = () => { }

}
