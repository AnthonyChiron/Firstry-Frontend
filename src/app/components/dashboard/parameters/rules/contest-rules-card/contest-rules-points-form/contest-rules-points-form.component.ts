import { FormRulesService } from 'src/app/shared/services/FormUtility/form-rules.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { pointsOptions } from 'src/app/constants/rulesConstants';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'contest-rules-points-form',
  templateUrl: './contest-rules-points-form.component.html',
  styleUrls: ['./contest-rules-points-form.component.scss'],
})
export class ContestRulesPointsFormComponent implements OnInit, OnChanges {
  @Input() parentForm: FormGroup;
  @Input() edit: boolean = false;

  pointCategoriesArray: FormArray;

  pointsOptions = pointsOptions;

  public chartsLabels: string[] = [];
  public chartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    //   { data: [350, 450, 100], label: 'Series A' },
  ];
  public chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '80%',
    layout: {
      padding: {
        left: 10, //set that fits the best
        right: 10, //set that fits the best
        bottom: 10, //set that fits the best
        top: 10, //set that fits the best
      },
    },
    plugins: {
      legend: {
        labels: {
          boxWidth: 15,
          font: {
            size: 14,
            family: 'HankenGrotesk',
          },
        },
      },
    },
  };

  constructor(
    protected _formRulesService: FormRulesService,
    private fb: FormBuilder,
    public fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.initPointCategory();
  }

  ngOnChanges() {
    this.initPointCategory();
  }

  initPointCategory() {
    this.pointCategoriesArray = this.parentForm.get(
      'pointCategories'
    ) as FormArray;

    this.pointCategoriesArray.valueChanges.subscribe(() => {
      this.loadDataChart();
    });

    this.loadDataChart();
  }

  loadDataChart() {
    this.chartsLabels = this.pointCategoriesArray.value.map(
      (category) => category.name
    );
    this.chartDatasets = [
      {
        data: this.pointCategoriesArray.value.map(
          (category) => category.points
        ),
        backgroundColor: ['#202020', '#4b4b4b', '#585858', '#999999'],
        borderWidth: 0,
        hoverOffset: 25,
        offset: 15,
        weight: 20,
        borderRadius: 1000,
        label: 'Points',
      },
    ];
  }

  isFieldInvalid(control, field) {
    return control.touched && control.get(field).invalid;
  }
}
