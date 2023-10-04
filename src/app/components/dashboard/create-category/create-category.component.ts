import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/shared/data/CategoriesService/categories.service';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit, OnChanges {
  @Input() contest: any;
  categoryForm: FormGroup;
  touched: boolean = false;
  sports: any[];

  constructor(
    private authService: AuthService,
    private contestService: ContestsService,
    private categoriesService: CategoriesService,
    private fb: FormBuilder,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      maxCompetitorCount: ['', Validators.required],
      // rules: ['', Validators.required],
      sports: ['', Validators.required],
    });

    this.fus.setForm(this.categoryForm);
  }

  ngOnChanges(): void {
    if (this.contest) {
      this.sports = this.contest.sports.map((sport) => {
        return { name: sport, value: sport[0].toUpperCase() + sport.slice(1) };
      });
      if (this.sports.length == 1) {
        this.categoryForm.patchValue({
          sports: [this.sports[0].value],
        });
      }
    }
  }

  submit() {
    this.touched = true;
    console.log(this.categoryForm.value);
    console.log(this.categoryForm.valid);
    if (this.categoryForm.valid) {
      this.categoriesService
        .create(this.categoryForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
