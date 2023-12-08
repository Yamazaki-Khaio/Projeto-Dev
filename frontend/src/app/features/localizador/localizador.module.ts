import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocalizadorRoutingModule } from './localizador-routing.module';
import { LocalizadorCadastroComponent } from './localizador-cadastro/localizador-cadastro.component';
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations: [
        LocalizadorCadastroComponent
    ],
    imports: [
        CommonModule,
        LocalizadorRoutingModule,
        SharedModule
    ]
})
export class LocalizadorModule { }
