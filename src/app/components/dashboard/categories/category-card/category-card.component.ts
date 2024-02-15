import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/shared/data/CategoriesService/categories.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';
import { SportsService } from 'src/app/shared/services/SportsService/sports.service';
import { FormCategoriesService } from 'src/app/shared/services/FormUtility/form-categories.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
})
export class CategoryCardComponent implements OnInit {
  @Input() category: CategoryModel;
  @Input() contest: any;
  @Output() deleteCategory = new EventEmitter<CategoryModel>();
  @Output() submitCategory = new EventEmitter<CategoryModel>();

  categoryForm: FormGroup;
  edit: boolean = false;
  showDeleteModal: boolean = false;

  sportsOptions: any[];
  rulesOptions: any[] = [];
  dateOptions: any[] = [];

  isNew: boolean = false;

  constructor(
    private cs: CategoriesService,
    private rs: RulesService,
    private sportsService: SportsService,
    private fb: FormBuilder,
    public fus: FormUtilityService,
    private activatedRoute: ActivatedRoute,
    private _formCategories: FormCategoriesService
  ) {}

  async ngOnInit() {
    this.dateOptions = this._formCategories.getDatesFromContestAsOptions(
      this.contest
    );

    this.categoryForm = this._formCategories.createCategoriesForm();
    this.fus.setForm(this.categoryForm);

    this.initSports();
    await this.initRules();

    this.fillForm();
    console.log(this.category);
    console.log(this.categoryForm.value);

    this.categoryForm
      .get('isQualificationStep')
      .valueChanges.subscribe((isQualificationStep) => {
        if (isQualificationStep) {
          this._formCategories.addQualificationStep(this.categoryForm);
        } else {
          this._formCategories.removeQualificationStep(this.categoryForm);
        }
      });
  }

  fillForm() {
    if (this.category._id) {
      this._formCategories.fillCategoryForm(
        this.categoryForm,
        this.category,
        this.contest
      );
    } else {
      this._formCategories.fillNewCategoryForm(
        this.categoryForm,
        this.contest,
        this.rulesOptions[0].value
      );
      this.isNew = true;
      this.edit = true;
    }
  }

  submit() {
    console.log(this.categoryForm.value);
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.valid) {
      this.edit = false;

      let newCategory = this._formCategories.parseFormToCategoryDTO(
        this.categoryForm,
        this.isNew
      );

      if (this.isNew)
        this.cs.createCategory(newCategory).subscribe((res) => {
          this.category = res;
          this.isNew = false;
          this.submitCategory.emit(this.category);
        });
      else
        this.cs
          .updateCategory(this.category._id, newCategory)
          .subscribe((res) => {
            this.category = res;
          });
    }
  }

  cancel() {
    this.edit = false;
    if (this.isNew) this.onDeleteConfirmed();
    else this.fillForm();
  }

  onDeleteConfirmed() {
    if (!this.isNew) this.deleteCategory.emit(this.category);
    else this.deleteCategory.emit();
    this.showDeleteModal = false;
  }

  onDeleteCancelled() {
    this.showDeleteModal = false;
  }

  initSports() {
    this.sportsOptions = this.sportsService.formatSportsOptionFormContest(
      this.contest
    );

    // Si le contest n'a qu'un seul sport, on le met par défaut
    if (this.sportsOptions.length == 1) {
      this.categoryForm.patchValue({
        sports: [this.sportsOptions[0].value],
      });
    }
  }

  async initRules() {
    try {
      const res = await firstValueFrom(
        this.rs.getAllByContestId(this.contest._id)
      );
      if (res) {
        this.rulesOptions = res.map((rule) => {
          return { label: rule.name, value: rule._id };
        });
      }
    } catch (error) {
      // Gestion des erreurs si nécessaire
      console.error(error);
    }
  }

  isStepFieldInvalid(step, field) {
    return (
      (this.categoryForm.touched &&
        this.categoryForm.get(step).get(field).invalid) ||
      (this.categoryForm.get(step).get(field).invalid &&
        this.categoryForm.get(step).get(field).touched)
    );
  }
}
