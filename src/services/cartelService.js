import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { saveAs } from 'file-saver';

// Configuración de posicionamiento y estilos
const config = {
  title: {
    fontSize: 24,
    marginTop: 175,    // Distancia desde el borde superior
    marginSides: 50    // Márgenes laterales
  },
  description: {
    fontSize: 14,
    marginTop: 50,     // Distancia desde el título
    marginSides: 100,  // Márgenes laterales más grandes para la descripción
    lineHeight: 1.5    // Espaciado entre líneas
  },
  image: {
    maxHeight: 250,    // Altura máxima de la imagen reducida de 300 a 250
    marginTop: 150,    // Aumentado de 50 a 150 para bajar la imagen
    scale: 0.8         // Factor de escala adicional para la imagen
  }
};

// Función para cargar el template
const loadTemplate = async () => {
  try {
    const response = await fetch('/assets/templates/cartel-template.pdf');
    if (!response.ok) {
      throw new Error('No se pudo cargar el template del cartel');
    }
    return await response.arrayBuffer();
  } catch (error) {
    console.error('Error cargando el template:', error);
    throw error;
  }
};

// Función para dibujar texto con saltos de línea
const drawMultilineText = (page, text, startX, startY, fontSize, font, lineHeight = config.description.lineHeight) => {
  const words = text.split(' ');
  let currentLine = '';
  let currentY = startY;
  const maxWidth = page.getSize().width - (config.description.marginSides * 2);

  for (const word of words) {
    const testLine = currentLine + word + ' ';
    const testWidth = font.widthOfTextAtSize(testLine.trim(), fontSize);

    if (testWidth > maxWidth && currentLine !== '') {
      // Centrar cada línea de la descripción
      const lineWidth = font.widthOfTextAtSize(currentLine.trim(), fontSize);
      const lineX = (page.getSize().width - lineWidth) / 2;
      
      page.drawText(currentLine.trim(), {
        x: lineX,
        y: currentY,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
      currentY -= fontSize * lineHeight;
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }

  // Centrar la última línea
  if (currentLine.trim() !== '') {
    const lineWidth = font.widthOfTextAtSize(currentLine.trim(), fontSize);
    const lineX = (page.getSize().width - lineWidth) / 2;
    
    page.drawText(currentLine.trim(), {
      x: lineX,
      y: currentY,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
  }

  return currentY;
};

export const generateCartel = async (projectData) => {
  try {
    // Cargar el template
    const templateBytes = await loadTemplate();
    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);
    
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Dibujar título
    const title = projectData.projectName || 'Proyecto';
    const titleWidth = font.widthOfTextAtSize(title, config.title.fontSize);
    const titleX = (width - titleWidth) / 2;
    const titleY = height - config.title.marginTop;

    page.drawText(title, {
      x: titleX,
      y: titleY,
      size: config.title.fontSize,
      font,
      color: rgb(0, 0, 0),
    });

    // Dibujar descripción si existe
    let lastY = titleY;
    if (projectData.description) {
      lastY = drawMultilineText(
        page,
        projectData.description,
        config.description.marginSides,
        titleY - config.description.marginTop,
        config.description.fontSize,
        font
      );
    }

    // Si hay una imagen, insertarla
    if (projectData.image) {
      const imageBytes = await projectData.image.arrayBuffer();
      let embedImage;
      
      if (projectData.image.type === 'image/png') {
        embedImage = await pdfDoc.embedPng(imageBytes);
      } else if (projectData.image.type === 'image/jpeg') {
        embedImage = await pdfDoc.embedJpg(imageBytes);
      }      if (embedImage) {
        const imgDims = embedImage.scale(1);
        // Calculamos la escala basada en las restricciones de tamaño y el factor adicional
        const scale = Math.min(
          (width - config.description.marginSides * 2) / imgDims.width,
          config.image.maxHeight / imgDims.height
        ) * config.image.scale; // Aplicamos el factor de escala adicional
        
        const scaledWidth = imgDims.width * scale;
        const scaledHeight = imgDims.height * scale;
        
        const imgX = (width - scaledWidth) / 2;
        const imgY = lastY - config.image.marginTop - scaledHeight;

        page.drawImage(embedImage, {
          x: imgX,
          y: imgY,
          width: scaledWidth,
          height: scaledHeight,
        });
      }
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, `cartel-${projectData.projectName || 'proyecto'}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generando el cartel:', error);
    throw error;
  }
};
