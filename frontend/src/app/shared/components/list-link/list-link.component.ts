import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-link',
  templateUrl: './list-link.component.html',
  styleUrls: ['./list-link.component.scss']
})
export class ListLinkComponent implements OnInit {
  clienteId!: number;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.clienteId = this.route.snapshot.params['id'];
  }

  
}
