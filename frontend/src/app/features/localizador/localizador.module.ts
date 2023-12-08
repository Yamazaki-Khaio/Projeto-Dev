import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalizadorRoutingModule } from './localizador-routing.module';
import { LocalizadorCadastroComponent } from './localizador-cadastro/localizador-cadastro.component';
import { SharedModule } from "../../shared/shared.module";
import { EnderecoViewComponent } from './endereco-view/endereco-view.component';
import { TelefoneViewComponent } from './telefone-view/telefone-view.component';
import { EmailViewComponent } from './email-view/email-view.component';


@NgModule({
    declarations: [
        LocalizadorCadastroComponent,
        EnderecoViewComponent,
        TelefoneViewComponent,
        EmailViewComponent
    ],
    imports: [
        CommonModule,
        LocalizadorRoutingModule,
        SharedModule
    ]
})
export class LocalizadorModule { }
