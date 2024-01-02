import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-list-link',
  templateUrl: './list-link.component.html',
  styleUrls: ['./list-link.component.scss']
})
export class ListLinkComponent implements OnInit {
  clienteId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];


  }

}

