import {
  Component,
  forwardRef,
  ContentChildren,
  QueryList,
  AfterViewInit,
  OnInit,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'chips-group',
  templateUrl: './chips-group.component.html',
  styleUrls: ['./chips-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsGroupComponent),
      multi: true,
    },
  ],
})
export class ChipsGroupComponent implements ControlValueAccessor, OnInit {
  @Input() chips: Array<{ value: any; name: string }>;
  @Input() isBinary: boolean = false;
  @Input() preSelect: boolean = false;
  selectedChips: string[] = [];
  onChange: any = () => {};
  onTouched: any = () => {};

  ngOnInit() {}

  toggleSelection(chip) {
    if (this.isBinary) {
      if (this.selectedChips[0] != '') this.selectedChips[0] = chip.value;
      else this.selectedChips.push(chip.value);
      this.onChange(this.selectedChips[0]);
    } else {
      const index = this.selectedChips.indexOf(chip.value);
      if (index === -1) {
        this.selectedChips.push(chip.value);
      } else {
        this.selectedChips.splice(index, 1);
      }
      this.onChange(this.selectedChips);
    }
  }

  isSelected(chip) {
    if (this.isBinary) return this.selectedChips[0] == chip.value;
    else return this.selectedChips.includes(chip.value);
  }

  writeValue(value: [] | string): void {
    if (value && Array.isArray(value)) {
      console.log(value);
      this.selectedChips = value;
    } else if (value) {
      console.log('a');
      this.selectedChips = [<string>value];
    }
    if (this.preSelect && !value) {
      console.log('a');
      this.toggleSelection(this.chips[0]);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
