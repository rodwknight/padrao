import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DetalheProposta } from 'src/app/interfaces/detalhe-proposta';
import { PropostasServicos, Servicos } from 'src/app/interfaces/propostas-servicos';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'modelo-proposta',
  templateUrl: './modelo-proposta.component.html',
  styleUrls: ['./modelo-proposta.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ]
})

export class ModeloPropostaComponent implements OnInit {
  @Input() proposta: DetalheProposta = {} as DetalheProposta;

  protected servicos: Servicos[]

  constructor() {
    this.servicos = [] as Servicos[]

  }

  ngOnInit() {
    const { propostaServicos } = this.proposta
    this.servicos = propostaServicos.map((propostaServico: PropostasServicos) => (propostaServico.servicos))
    this.gerarPDF()

  }

  private gerarPDF() {
    const doc = new jsPDF();

    // Título do PDF
    doc.setFont('helvetica', 'bold');
    doc.text('Proposta de Serviços', 105, 20, { align: 'center' });

    // Conteúdo de Apresentação
    const presentationContent = `
      1. Apresentação\n
      Apresentamos nossa proposta para a realização dos serviços de:
      ${this.servicos.map(servico => `${servico.nome} - ${servico.descricao}`).join(', ')}.
      Oferecendo suporte especializado para garantir a conformidade com as exigências legais e a segurança dos colaboradores.
    `;
    doc.setFont('helvetica', 'normal');
    doc.text(presentationContent, 10, 30);

    // Adicionando a tabela com os serviços
    const serviceTable = this.servicos.map(servico => ({
      nome: servico.nome,
      descricao: servico.descricao,
      proposta: servico.descricaoProposta || '', // Garantir que nunca seja 'undefined'
    }));

     // Usando autoTable e armazenando o retorno para acessar a última posição Y
    autoTable(doc, {
      head: [['Nome do Serviço', 'Descrição', 'Proposta']],
      body: serviceTable, // Dados da tabela
      startY: 50,  // Começa logo abaixo do conteúdo anterior
      styles: { fontSize: 10, fillColor: [255, 255, 255] },
      columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0] } }, // Células da primeira coluna centralizadas e com fundo verde
      theme: 'striped', // Estilo listrado
      margin: { top: 10 },
    });

    /*doc.

    // Seção "Escopo dos Serviços"
    doc.text('2. Escopo dos Serviços', 10,);
    doc.text('Descrevemos abaixo os serviços a serem prestados:', 10, currentY + 10);*/

    // Salvando o PDF
    doc.save('proposta.pdf');
  }

}
