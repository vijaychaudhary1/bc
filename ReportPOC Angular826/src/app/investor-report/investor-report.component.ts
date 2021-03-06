import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataTable } from 'primeng/datatable';
import { ReportService } from './investor-report.service';
import { MOCKDATA } from './resultMock';
import * as $ from 'jquery';

import 'datatables.net';
import 'datatables.net-bs4';
import { ExcelService } from '../excel.service';

@Component({
  selector: 'app-investor-report',
  templateUrl: './investor-report.component.html',
  styleUrls: ['./investor-report.component.css'],
  providers: [ReportService]
})
export class InvestorReportComponent implements OnInit {

  searchForm: FormGroup;
  investorNames = [];
  programTypes = [];
  cols: any[];
  resultData: any = [];
  showReport: boolean;
  @ViewChild('dt') resultTable: DataTable;

  constructor(private reportService: ReportService, private excelService: ExcelService) {
    this.searchForm = this.createFormGroup();

  }
  createFormGroup() {
    return new FormGroup({
      fromDate: new FormControl('', Validators.required),
      toDate: new FormControl('', Validators.required),
      investorName: new FormControl(''),
      programType: new FormControl('')
    });
  }

  ngOnInit() {
    this.investorNames = [{ name: 'Bank of Coimbatore' }];
    this.programTypes = [{ type: 'Coromandel Train Company' }];
    this.cols = [
      { field: 'investorName', header: 'Investor Name' },
      { field: 'program', header: 'Program' },
      { field: 'limit', header: 'Limit' },
      { field: 'ccySold', header: 'Ccy Sold' },
      { field: 'investorPricing', header: 'Investor Pricing' },
      { field: 'supplierExcluded', header: 'Supplier Excluded' },
      { field: 'supplierCountiesPermitted', header: 'Supplier Countries Permitted' },
      { field: 'minTenor', header: 'Min Tenor' },
      { field: 'maxTenor', header: 'Max Tenor' }
    ];
  }

  onSearch(formData) {
    let inputData = formData.value;
    let formattedToDate = new Date(inputData.toDate);
    let formattedFromDate = new Date(inputData.fromDate);
    inputData.toDate = `${formattedToDate.getFullYear()}-${formattedToDate.getMonth() + 1}-${formattedToDate.getDate()}`;
    inputData.fromDate = `${formattedFromDate.getFullYear()}-${formattedFromDate.getMonth() + 1}-${formattedFromDate.getDate()}`;
    
    this.reportService.getReportData(inputData)
      .then(response => {
        this.resultData = response.clientReport;
      })
      .catch(error => {
        console.log(error);
      });
    //this.resultData = MOCKDATA;
    this.showReport = true;
  }
  exportToExcel() {
    this.excelService.exportAsExcelFile(this.resultData, 'sample');
  }


}
