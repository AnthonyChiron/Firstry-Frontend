import { Injectable } from '@angular/core';
import imageCompression from 'browser-image-compression';
import heic2any from 'heic2any';

@Injectable({
  providedIn: 'root',
})
export class ImageUtilityService {
  async convertHeicToPng(file: File): Promise<File> {
    // Convertir le fichier HEIC en PNG
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

  async compressImg(file: File) {
    // Options de compression
    const options = {
      maxSizeMB: 1, // (Max size in MB)
      maxWidthOrHeight: 1920, // (Compressed files are resized to these dimensions)
      useWebWorker: true, // (Optionally enable Web Worker for performance)
    };

    try {
      // Compression de l'image
      const compressedFile = await imageCompression(file, options);

      return compressedFile;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
