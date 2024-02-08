import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'Capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    // Expression régulière pour capturer le début de chaque mot en tenant compte des caractères accentués
    return value.replace(
      /(^|\s+)([a-zàâäéèêëïîôöùûüç])/gi,
      (match, separator, char) => {
        // On transforme uniquement le premier caractère alphabétique en majuscule
        return separator + char.toUpperCase();
      }
    );
  }
}
