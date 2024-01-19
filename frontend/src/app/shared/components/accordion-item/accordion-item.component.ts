import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconsService } from '../../util/icons.service';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss']
})
export class AccordionItemComponent {
  @Input() title: string = '';
  @Input() isOpen: boolean = false;
  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();
  openedIconUrl: string = '';
  upIconUrl: string = '';
  downIconUrl: string = '';

  constructor(private IconsService: IconsService) {
    this.openedIconUrl = this.IconsService.getIconUrl('icon-obrigatorio');
    this.upIconUrl = this.IconsService.getIconUrl("up");
    this.downIconUrl = this.IconsService.getIconUrl("down");
  }
  toggleItem() {
    this.toggle.emit();
  }

}
