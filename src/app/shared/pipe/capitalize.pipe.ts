import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'Capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (value == null || value === '') {
      return '';
    }
    const str = String(value).trim();
    if (!str) {
      return '';
    }

    // Expression régulière pour capturer le début de chaque mot en tenant compte des caractères accentués
    return str.replace(
      /(^|\s+)([a-zàâäéèêëïîôöùûüç])/gi,
      (match, separator, char) => {
        // On transforme uniquement le premier caractère alphabétique en majuscule
        return separator + char.toUpperCase();
      }
    );
  }
}
