import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss'],
})
export class TableDataComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {}
  exportFile() {
    const date = new Date();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(
      this.dataService.JsonData
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `Combinado ${date.toLocaleDateString()}.xlsx`);
  }
}
