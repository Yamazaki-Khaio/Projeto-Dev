import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { AccordionItemComponent } from '../accordion-item/accordion-item.component';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements AfterContentInit {
  @ContentChildren(AccordionItemComponent) accordionItems!: QueryList<AccordionItemComponent>;

  ngAfterContentInit() {
    this.accordionItems.forEach(item => item.isOpen = true);
  }

  toggleItem(item: AccordionItemComponent) {
    item.isOpen = !item.isOpen;
  }
}
