import { Injectable } from '@angular/core';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

@Injectable({
  providedIn: 'root',
})
export class ImageUtilityService {
  async prepareImgForUpload(file: File): Promise<File> {
    file = await this.convertHeicToPng(file);
    file = await this.compressImg(file);
    return file;
  }

  async convertHeicToPng(file: File): Promise<File> {
    // Convertir le fichier HEIC en PNG
    if (!file.name.endsWith('.heic')) return file;
    const convertedBlob = <Blob>await heic2any({
      blob: file,
      toType: 'image/png',
    });

    // Créer un nouveau fichier à partir du blob
    const convertedFile = new File([convertedBlob], file.name, {
      type: 'image/png',
      lastModified: Date.now(),
    });

    return convertedFile;
  }

  async compressImg(file: File): Promise<File> {
    // Options de compression
    const options = {
      maxSizeMB: 0.5, // (Max size in MB)
      maxWidthOrHeight: 1400, // (Compressed files are resized to these dimensions)
      useWebWorker: true, // (Optionally enable Web Worker for performance)
    };

    try {
      // Compression de l'image
      console.log("Compression de l'image");
      const compressedFile = await imageCompression(file, options);
      console.log('FINIS');

      return compressedFile;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
