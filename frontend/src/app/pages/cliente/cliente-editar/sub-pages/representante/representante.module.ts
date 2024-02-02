import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentanteRoutingModule } from './representante-routing.module';
import { RepresentanteCadastroComponent } from './representante-cadastro/representante-cadastro.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RepresentanteHomeComponent } from './representante-home/representante-home.component';


@NgModule({
    declarations: [
        RepresentanteCadastroComponent,
        RepresentanteHomeComponent,

    ],
    imports: [
        CommonModule,
        RepresentanteRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class RepresentanteModule { }
