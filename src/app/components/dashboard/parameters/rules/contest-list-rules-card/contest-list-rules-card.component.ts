import { Component, Input, OnInit } from '@angular/core';
import { ContestModel } from 'src/app/models/contest.model';
import { RulesModel } from 'src/app/models/rules.model';
import { RulesService } from 'src/app/shared/data/RulesService/rules.service';

@Component({
  selector: 'contest-list-rules-card',
  templateUrl: './contest-list-rules-card.component.html',
  styleUrls: ['./contest-list-rules-card.component.scss'],
})
export class ContestListRulesCardComponent implements OnInit {
  @Input() contest: ContestModel;
  rules: RulesModel[] = [];

  constructor(private rs: RulesService) {}

  ngOnInit(): void {
    this.rs.getAllByContestId(this.contest._id).subscribe((rules) => {
      this.rules = rules;
      console.log(this.rules);
    });
  }

  createRule() {
    this.rules.unshift({} as RulesModel);
  }

  deleteRule(rule: RulesModel) {
    if (rule && rule._id) {
      // Delete rule from contest.categories
      this.rules = this.rules.filter((c) => c._id != rule._id);

      // Delete rule from database
      this.rs.delete(rule._id).subscribe();
    } else {
      this.rules = this.rules.filter((c) => c._id != undefined);
    }
  }
}
