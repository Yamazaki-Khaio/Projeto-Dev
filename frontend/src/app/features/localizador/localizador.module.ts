import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


import { LocalizadorRoutingModule } from './localizador-routing.module';
import { LocalizadorCadastroComponent } from './localizador-cadastro/localizador-cadastro.component';
import { SharedModule } from "../../shared/shared.module";
import { EnderecoViewComponent } from './endereco-view/endereco-view.component';
import { TelefoneViewComponent } from './telefone-view/telefone-view.component';
import { EmailViewComponent } from './email-view/email-view.component';
import { LocalizadorConstrucaoComponent } from './localizador-construcao/localizador-construcao.component';
import { EnderecoCadastroComponent } from './endereco-cadastro/endereco-cadastro.component';
import { TelefoneCadastroComponent } from './telefone-cadastro/telefone-cadastro.component';
import { EmailCadastroComponent } from './email-cadastro/email-cadastro.component';


@NgModule({
    declarations: [
        LocalizadorCadastroComponent,
        EnderecoViewComponent,
        TelefoneViewComponent,
        EmailViewComponent,
        LocalizadorConstrucaoComponent,
        LocalizadorCadastroComponent,
        EnderecoCadastroComponent,
        TelefoneCadastroComponent,
        EmailCadastroComponent,

    ],
    imports: [
        CommonModule,
        LocalizadorRoutingModule,
        SharedModule,
        ReactiveFormsModule,
    ]
})
export class LocalizadorModule { }
