import { Component, Input, OnInit } from '@angular/core';
import Smestaj from './smestaj.model';
import Soba from './soba.model';

@Component({
  selector: 'smestaj-component',
  templateUrl: './smestaj-component.component.html',
  styleUrls: ['./smestaj-component.component.scss']
})
export class SmestajComponentComponent implements OnInit {
  @Input()
  smestaj!: Smestaj;
  constructor() { 
     
  }

  ngOnInit(): void {
  }

}