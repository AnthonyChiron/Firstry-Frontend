import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/data/CategoriesService/categories.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: any;
  @Input() contest: any;
  touched: boolean = false;
  categoryForm: FormGroup;
  sports: any[];
  edit: boolean = false;

  constructor(
    private cs: CategoriesService,
    private fb: FormBuilder,
    protected fus: FormUtilityService,
    private activatedRoute: ActivatedRoute
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
      contestId: ['', Validators.required],
    });

    this.fus.setForm(this.categoryForm);

    this.initForm(this.contest);
  }

  initForm(contest: any) {
    this.categoryForm.patchValue({
      contestId: contest._id,
      name: this.category.name,
      description: this.category.description,
      startDate: this.category.startDate,
      endDate: this.category.endDate,
      maxCompetitorCount: this.category.maxCompetitorCount,
      // rules: ['', Validators.required],
      sports: ['', Validators.required],
    });

    this.sports = this.contest.sports.map((sport) => {
      return { name: sport, value: sport[0].toUpperCase() + sport.slice(1) };
    });
    if (this.sports.length == 1) {
      this.categoryForm.patchValue({
        sports: [this.sports[0].value],
      });
    }
  }

  submit() {
    this.touched = true;
    this.edit = false;
    if (this.categoryForm.valid) {
      this.cs
        .update(this.category._id, this.categoryForm.value)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  cancel() {
    this.edit = false;
    this.initForm(this.contest);
  }
}
