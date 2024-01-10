import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContestsService } from 'src/app/shared/data/ContestsService/contests.service';
import { UsersService } from 'src/app/shared/data/UsersService/users.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { FormUtilityService } from 'src/app/shared/services/FormUtility/form-utility.service';

@Component({
  selector: 'create-contest',
  templateUrl: './create-contest.component.html',
  styleUrls: ['./create-contest.component.scss'],
})
export class CreateContestComponent implements OnInit {
  contestForm: FormGroup;
  touched: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private contestService: ContestsService,
    private fb: FormBuilder,
    protected fus: FormUtilityService
  ) {}

  ngOnInit(): void {
    this.contestForm = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      sports: ['', Validators.required],
    });
    this.fus.setForm(this.contestForm);
  }

  onAddressSelected(address: any) {}

  submit() {
    this.touched = true;
    if (this.contestForm.valid) {
      this.contestService.create(this.contestForm.value).subscribe((res) => {
        console.log(res);
      });
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
