import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ca } from 'date-fns/locale';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor() {}

  public downloadPDF(
    contentId: string,
    fileName: string = 'download.pdf'
  ): jsPDF {
    const data = document.getElementById(contentId);
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4',
    });

    if (!data) {
      console.error('Element not found:', contentId);
      return null;
    }

    html2canvas(data, { scale: 1 }).then((canvas) => {
      console.log('test');
      const imgData = canvas.toDataURL('image/png');
      console.log('test');

      const imgWidth = 210; // approx A4 width in mm
      const pageHeight = 295; // approx A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
    });
    return pdf;
  }

  generateSpeakerPdf(pools: any[], categoryName: any): void {
    const doc = new jsPDF({
      orientation: 'landscape',
    });

    // Ajoute le titre de la catégorie en haut de la page
    doc.setFontSize(18);
    doc.text(categoryName, 14, 15);

    // Prépare les données de tous les riders pour un seul tableau
    const tableRows = pools.map((pool) => [
      pool.poolNumber, // Numéro de la poule
      pool.registration.rider.lastName, // Nom complet du rider
      pool.registration.rider.firstName, // Nom complet du rider
      this.calculateAge(pool.registration.rider.birthDate), // Nom complet du rider
      pool.registration.rider.nationality.name.common, // Nationalité
      pool.registration.rider.city, // Ville
    ]);

    // Génère le tableau unique pour tous les riders
    autoTable(doc, {
      startY: 25, // Commence un peu plus bas pour laisser de l'espace après le titre
      theme: 'grid',
      head: [['Poule', 'Nom', 'Prénom', 'Age', 'Nationalité', 'Ville']],
      body: tableRows,
      styles: {
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      margin: { top: 20 },
    });

    // Ouvre le PDF dans un nouvel onglet ou sauvegardez-le
    doc.save('FichesSpeaker_' + categoryName + '.pdf'); // Pour sauvegarder le fichier
  }

  calculateAge(birthDate: any): string {
    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    return `${age} ans`;
  }
}
