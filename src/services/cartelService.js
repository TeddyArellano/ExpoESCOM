import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { saveAs } from 'file-saver';
import { cartelConfig } from '../assets/templates/cartelConfig';

// Funciones auxiliares
const loadTemplate = async () => {
  const templateUrl = `/assets/templates/cartel-template.pdf?v=${Date.now()}`;
  const response = await fetch(templateUrl, { cache: 'no-store' });
  
  if (!response.ok) {
    throw new Error('No se pudo cargar el template del cartel');
  }
  
  return await response.arrayBuffer();
};

const calculateCenteredX = (text, fontSize, maxWidth, font, pageWidth) => {
  const textWidth = Math.min(font.widthOfTextAtSize(text, fontSize), maxWidth);
  return (pageWidth - textWidth) / 2;
};

const drawJustifiedText = (page, text, config, font, pageWidth) => {
  const words = text.split(' ');
  let currentLine = '';
  let yPosition = config.y;
  const lineHeight = config.fontSize * config.lineHeight;
  const maxWidth = config.maxWidth;
  const startX = (pageWidth - maxWidth) / 2;

  for (const word of words) {
    const testLine = currentLine + word + ' ';
    const testWidth = font.widthOfTextAtSize(testLine.trim(), config.fontSize);

    if (testWidth > maxWidth && currentLine !== '') {
      const lineWords = currentLine.trim().split(' ');
      const textWidth = font.widthOfTextAtSize(currentLine.trim(), config.fontSize);
      const spaceCount = lineWords.length - 1;

      if (spaceCount > 0) {
        const extraSpacePerWord = (maxWidth - textWidth) / spaceCount;
        let currentX = startX;

        lineWords.forEach((word, index) => {
          page.drawText(word, {
            x: currentX,
            y: yPosition,
            size: config.fontSize,
            font,
            color: rgb(0, 0, 0)
          });

          if (index < lineWords.length - 1) {
            currentX += font.widthOfTextAtSize(word, config.fontSize) +
                      font.widthOfTextAtSize(' ', config.fontSize) +
                      extraSpacePerWord;
          }
        });
      }

      yPosition -= lineHeight;
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }

  // Centrar última línea
  if (currentLine.trim()) {
    const lastLineX = calculateCenteredX(
      currentLine.trim(),
      config.fontSize,
      maxWidth,
      font,
      pageWidth
    );

    page.drawText(currentLine.trim(), {
      x: lastLineX,
      y: yPosition,
      size: config.fontSize,
      font,
      color: rgb(0, 0, 0)
    });
  }
};

const processImage = async (imageFile, pdfDoc, page, config, pageWidth) => {
  const imageBytes = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsArrayBuffer(imageFile);
  });

  const pdfImage = imageFile.type === 'image/png'
    ? await pdfDoc.embedPng(imageBytes)
    : await pdfDoc.embedJpg(imageBytes);

  const { width, height } = pdfImage.scale(1);
  const scaleFactor = Math.min(
    config.maxWidth / width,
    config.maxHeight / height
  );

  const scaledWidth = width * scaleFactor;
  const scaledHeight = height * scaleFactor;
  const imageX = (pageWidth - scaledWidth) / 2;

  page.drawImage(pdfImage, {
    x: imageX,
    y: config.y,
    width: scaledWidth,
    height: scaledHeight
  });
};

export async function generateCartel(projectData) {
  try {
    const templateBytes = await loadTemplate();
    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);

    const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    const page = pdfDoc.getPages()[0];
    const { width: pageWidth } = page.getSize();
    const { textFields, imageField } = cartelConfig;

    // Dibujar título en mayúsculas
    const projectNameUpper = projectData.projectName.toUpperCase();
    const projectNameX = calculateCenteredX(
      projectNameUpper,
      textFields.projectName.fontSize,
      textFields.projectName.maxWidth,
      font,
      pageWidth
    );

    page.drawText(projectNameUpper, {
      x: projectNameX,
      y: textFields.projectName.y,
      size: textFields.projectName.fontSize,
      font,
      color: rgb(0, 0, 0)
    });

    // Dibujar descripción justificada
    if (projectData.description) {
      drawJustifiedText(page, projectData.description, textFields.description, font, pageWidth);
    }

    // Procesar imagen si existe
    if (projectData.image) {
      if (!['image/jpeg', 'image/png'].includes(projectData.image.type)) {
        throw new Error('Formato de imagen no soportado. Use PNG o JPG/JPEG');
      }
      await processImage(projectData.image, pdfDoc, page, imageField, pageWidth);
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `cartel-${projectData.projectName}.pdf`);

    return true;
  } catch (error) {
    console.error('Error al generar cartel:', error);
    throw error;
  }
}
