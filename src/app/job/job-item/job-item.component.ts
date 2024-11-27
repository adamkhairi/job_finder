import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.scss']
})
export class JobItemComponent {
  @Input() job!: {
    title: string;
    link: string;
    snippet: string;
    formattedUrl: string;
    displayLink: string;
  };
}
