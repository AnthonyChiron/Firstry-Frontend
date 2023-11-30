import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/shared/data/CategoriesService/categories.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { ActivatedRoute } from '@angular/router';
import { th } from 'date-fns/locale';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: CategoryModel;
  @Input() contest: any;
  @Output() delete = new EventEmitter();

  categoryForm: FormGroup;
  edit: boolean = false;
  touched: boolean = false;
  showDeleteModal: boolean = false;

  sports: any[];
  stepFormat: any[] = [];

  isNew: boolean = false;

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
      maxRiders: ['', Validators.required],
      sports: ['', Validators.required],
      registerPrice: ['', Validators.required],
      isQualificationStep: [true, Validators.required],
      contestId: ['', Validators.required],
    });
    this.fus.setForm(this.categoryForm);

    // Fill le tableau de sport en fonction du contest
    this.sports = this.contest.sports.map((sport) => {
      return { name: sport, value: sport[0].toUpperCase() + sport.slice(1) };
    });

    // Si le contest n'a qu'un seul sport, on le met par défaut
    if (this.sports.length == 1) {
      this.categoryForm.patchValue({
        sports: [this.sports[0].value],
      });
    }

    if (this.category._id) {
      this.initForm(this.contest);
    } else {
      this.categoryForm.patchValue({
        contestId: this.contest._id,
      });

      this.isNew = true;
      this.edit = true;
    }
  }

  initForm(contest: any) {
    this.categoryForm.patchValue({
      name: this.category.name,
      description: this.category.description,
      maxRiders: this.category.maxRiders,
      sports: this.category.sports,
      registerPrice: this.category.registerPrice,
      isQualificationStep: this.category.isQualificationStep,
      contestId: contest._id,
    });
  }

  submit() {
    this.touched = true;
    if (this.categoryForm.valid) {
      this.edit = false;

      if (!this.isNew)
        this.cs
          .update(this.category._id, this.categoryForm.value)
          .subscribe((res) => {
            console.log(res);
          });

      if (this.isNew)
        this.cs.create(this.categoryForm.value).subscribe((res) => {
          this.category = res;
          this.isNew = false;
        });
    }
  }

  cancel() {
    this.edit = false;
    if (this.isNew) this.deleteCategory();
    this.initForm(this.contest);
  }

  deleteCategory() {
    this.showDeleteModal = true;
  }

  onDeleteConfirmed() {
    if (!this.isNew) this.delete.emit(this.category);
    else this.delete.emit();
    this.showDeleteModal = false;
  }

  onDeleteCancelled() {
    this.showDeleteModal = false;
  }
}
