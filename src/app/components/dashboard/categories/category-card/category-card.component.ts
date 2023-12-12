import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from 'src/app/shared/data/CategoriesService/categories.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';

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
  touched: boolean = false;
  showDeleteModal: boolean = false;

  sports: any[];
  rulesOptions: any[] = [];
  stepFormat: any[] = [];

  isNew: boolean = false;

  constructor(
    private cs: CategoriesService,
    private rs: RulesService,
    private fb: FormBuilder,
    public fus: FormUtilityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.category);
    this.categoryForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      maxRiders: ['', Validators.required],
      sports: ['', Validators.required],
      registerPrice: ['', Validators.required],
      isQualificationStep: [true, Validators.required],
      contestId: ['', Validators.required],
      stepQualif: this.fb.group({
        _id: [''],
        name: ['QUALIFICATION'],
        startDate: [''],
        ridersPerPool: [
          '4',
          [Validators.required, Validators.min(1), this.fus.numberValidator()],
        ],
        ridersQualifiedCount: [
          '8',
          [Validators.required, Validators.min(1), this.fus.numberValidator()],
        ],
        rules: ['', Validators.required],
      }),
      stepFinal: this.fb.group({
        _id: [''],
        name: ['FINALE'],
        startDate: [''],
        ridersPerPool: [
          '4',
          [Validators.required, Validators.min(1), this.fus.numberValidator()],
        ],
        rules: ['', Validators.required],
      }),
    });
    this.fus.setForm(this.categoryForm);

    this.getSports();

    this.rs.getAllByContestId(this.contest._id).subscribe((res) => {
      if (res) {
        this.rulesOptions = res.map((rule) => {
          return { label: rule.name, value: rule._id };
        });
      }

      if (this.category._id) {
        this.initForm(this.contest);
      } else {
        this.categoryForm.patchValue({
          contestId: this.contest._id,
        });

        this.categoryForm.get('stepQualif').patchValue({
          rules: this.rulesOptions[0].value,
        });

        this.categoryForm.get('stepFinal').patchValue({
          rules: this.rulesOptions[0].value,
        });

        this.isNew = true;
        this.edit = true;
      }
    });
  }

  initForm(contest: any) {
    let qualif = this.category.steps.find(
      (step) => step.name === 'QUALIFICATION'
    );
    let final = this.category.steps.find(
      (step) => step.name === 'FINALE' || step.name === ''
    );
    console.log(this.category.steps);
    console.log(final);

    this.categoryForm.patchValue({
      _id: this.category._id,
      name: this.category.name,
      description: this.category.description,
      maxRiders: this.category.maxRiders,
      sports: this.category.sports,
      registerPrice: this.category.registerPrice,
      isQualificationStep: this.category.isQualificationStep,
      contestId: contest._id,
    });

    if (this.category.isQualificationStep)
      this.categoryForm.get('stepQualif').patchValue({
        _id: qualif._id,
        ridersPerPool: qualif.ridersPerPool,
        ridersQualifiedCount: qualif.ridersQualifiedCount,
        rules: qualif.rules,
      });

    this.categoryForm.get('stepFinal').patchValue({
      _id: final._id,
      ridersPerPool: final.ridersPerPool,
      rules: final.rules,
    });
  }

  submit() {
    this.touched = true;
    if (this.categoryForm.valid) {
      this.edit = false;

      let newCategory = {
        category: {
          name: this.categoryForm.value.name,
          description: this.categoryForm.value.description,
          sports: this.categoryForm.value.sports,
          maxRiders: this.categoryForm.value.maxRiders,
          registerPrice: this.categoryForm.value.registerPrice,
          isQualificationStep: this.categoryForm.value.isQualificationStep,
          contestId: this.categoryForm.value.contestId,
        },
        steps: [
          this.categoryForm.value.stepQualif,
          this.categoryForm.value.stepFinal,
        ].map((step) => {
          return {
            name: step.name,
            rules: step.rules,
            startDate: step.startDate,
            endDate: step.endDate,
            ridersPerPool: step.ridersPerPool,
            ridersQualifiedCount: step.ridersQualifiedCount,
          };
        }),
      };

      console.log(newCategory);

      if (!this.isNew) {
        newCategory.steps = [
          this.categoryForm.value.stepQualif,
          this.categoryForm.value.stepFinal,
        ];

        console.log(this.category._id);
        console.log(newCategory);
        this.cs
          .updateCategory(this.category._id, newCategory)
          .subscribe((res) => {
            console.log(res);
            this.category = res;
          });
      }

      if (this.isNew) {
        this.cs.createCategory(newCategory).subscribe((res) => {
          this.category = res;
          this.isNew = false;
          this.submitCategory.emit(this.category);
        });
      }
    }
  }

  cancel() {
    this.edit = false;
    if (this.isNew) this.onDeleteConfirmed();
    else this.initForm(this.contest);
  }

  onDeleteConfirmed() {
    if (!this.isNew) this.deleteCategory.emit(this.category);
    else this.deleteCategory.emit();
    this.showDeleteModal = false;
  }

  onDeleteCancelled() {
    this.showDeleteModal = false;
  }

  toggleQualificationStep() {
    // Change validator for qualifStep
    if (!this.edit) return;
    if (this.categoryForm.get('isQualificationStep').value) {
      this.categoryForm.get('stepQualif').get('rules').clearValidators();
      this.categoryForm
        .get('stepQualif')
        .get('ridersPerPool')
        .clearValidators();
      this.categoryForm
        .get('stepQualif')
        .get('ridersQualifiedCount')
        .clearValidators();
      this.categoryForm.get('stepQualif').get('rules').updateValueAndValidity();
    } else {
      this.categoryForm
        .get('stepQualif')
        .get('rules')
        .setValidators([Validators.required, Validators.min(1)]);
      this.categoryForm
        .get('stepQualif')
        .get('ridersPerPool')
        .setValidators([Validators.required, Validators.min(1)]);
      this.categoryForm
        .get('stepQualif')
        .get('ridersQualifiedCount')
        .setValidators([Validators.required, Validators.min(1)]);
      this.categoryForm.get('stepQualif').get('rules').updateValueAndValidity();
    }
  }

  getSports() {
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
  }
}
