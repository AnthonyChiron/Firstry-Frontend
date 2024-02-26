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
  defaultsRules: RulesModel[] = [];
  displayDefaultRules: boolean = false;

  constructor(private rs: RulesService) {}

  ngOnInit(): void {
    this.rs.getAllByContestId(this.contest._id).subscribe((rules) => {
      this.rules = rules;

      // Map rules in 2 arrays : default rules and custom rules
      this.defaultsRules = this.rules.filter((rule) => rule.isDefault);
      this.rules = this.rules.filter((rule) => !rule.isDefault);
    });
  }

  createRule() {
    if (this.rules.length == 0 || this.rules[0]._id) {
      this.rules.unshift({} as RulesModel);
    }
  }

  updateRule(rule: RulesModel) {
    if (rule && rule._id) {
      this.rs
        .update(rule._id, {
          name: rule.name,
          description: rule.description,
          contestId: rule.contestId,
          stepFormats: rule.stepFormats,
          pointCategories: rule.pointCategories,
          isDefault: false,
        })
        .subscribe((updatedRule) => {
          let newRule = this.rules.find((c) => c._id == rule._id);
          newRule = updatedRule;
        });
    } else {
      this.rs.create(rule).subscribe((createdRule) => {
        this.rules[0] = createdRule;
      });
    }
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

  duplicateRule(rule: RulesModel) {
    let newRule = { ...rule };
    delete newRule._id;
    this.rules.unshift(newRule);
  }
}
