import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import { saveAs } from 'file-saver';

// Configuración de posicionamiento y estilos
const config = {
  fonts: {
    primary: 'Segoe UI',
    fallback: StandardFonts.Helvetica
  },
  title: {
    fontSize: 70,
    marginTop: 400,    // Distancia desde el borde superior
    marginSides: 50    // Márgenes laterales
  },  description: {
    fontSize: 40,       // Reducido para evitar desbordamiento
    marginTop: 200,     // Distancia desde el título
    marginSides: 250,   // Aumentado para mayor margen lateral
    lineHeight: 1.5,    // Espaciado entre líneas
    maxWidth: 500       // Ancho máximo fijo para la descripción (reducido para mejor control)
  },
  image: {
    width: 450,         // Ancho fijo para todas las imágenes
    height: 450,        // Alto fijo para todas las imágenes
    marginTop: 350,     // Distancia desde la descripción
    scale: 0.8,         // Factor de escala adicional
    maxHeight: 400,     // Altura máxima para las imágenes
    maxWidth: 600       // Ancho máximo para las imágenes
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
  if (!text || typeof text !== 'string') {
    console.warn('drawMultilineText: texto no válido', text);
    return startY; // Retorna la posición Y original si no hay texto
  }

  // Asegurarse de que los parámetros numéricos sean válidos
  const safeStartY = typeof startY === 'number' && !isNaN(startY) ? startY : page.getSize().height / 2;
  const safeFontSize = typeof fontSize === 'number' && !isNaN(fontSize) ? fontSize : config.description.fontSize;
  const safeLineHeight = typeof lineHeight === 'number' && !isNaN(lineHeight) ? lineHeight : 1.5;
    // Dividir el texto en palabras para el procesamiento
  const words = text.split(' ');
  let currentLine = '';
  let currentY = safeStartY;
  
  // Calcular el ancho máximo disponible para el texto
  // Usar el valor menor entre config.description.maxWidth y el ancho disponible en la página
  const pageWidth = page.getSize().width;
  const availableWidth = pageWidth - (config.description.marginSides * 2);
  const maxWidth = Math.min(availableWidth, config.description.maxWidth);

  try {
    for (const word of words) {
      const testLine = currentLine + word + ' ';
      const testWidth = font.widthOfTextAtSize(testLine.trim(), safeFontSize);      if (testWidth > maxWidth && currentLine !== '') {
        // Centrar cada línea de la descripción
        const lineWidth = font.widthOfTextAtSize(currentLine.trim(), safeFontSize);
        // Centrar el texto en la página
        const lineX = (pageWidth - lineWidth) / 2;
        
        // Validar que lineX sea un número válido y esté dentro de los márgenes
        const safeLineX = typeof lineX === 'number' && !isNaN(lineX) 
          ? Math.max(config.description.marginSides, lineX) 
          : config.description.marginSides;
        
        page.drawText(currentLine.trim(), {
          x: safeLineX,
          y: currentY,
          size: safeFontSize,
          font,
          color: rgb(0, 0, 0),
        });
        currentY -= safeFontSize * safeLineHeight;
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    }    // Centrar la última línea
    if (currentLine.trim() !== '') {
      const lineWidth = font.widthOfTextAtSize(currentLine.trim(), safeFontSize);
      // Centrar el texto en la página
      const lineX = (pageWidth - lineWidth) / 2;
      
      // Validar que lineX sea un número válido y esté dentro de los márgenes
      const safeLineX = typeof lineX === 'number' && !isNaN(lineX) 
        ? Math.max(config.description.marginSides, lineX) 
        : config.description.marginSides;
      
      page.drawText(currentLine.trim(), {
        x: safeLineX,
        y: currentY,
        size: safeFontSize,
        font,
        color: rgb(0, 0, 0),
      });
    }
  } catch (error) {
    console.error('Error dibujando texto multilinea:', error);
    // Si hay un error, no interrumpir el proceso
  }
  return currentY;
}

export const generateCartel = async (projectData) => {
  try {
    // Cargar el template
    const templateBytes = await loadTemplate();
    const pdfDoc = await PDFDocument.load(templateBytes);
    pdfDoc.registerFontkit(fontkit);
    
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const { width, height } = page.getSize();
    
    // Intentar cargar la fuente personalizada Segoe UI
    let font;
    try {
      // Intentar cargar Segoe UI
      const fontResponse = await fetch('/assets/fonts/segoeui.ttf');
      if (fontResponse.ok) {
        const fontBytes = await fontResponse.arrayBuffer();
        font = await pdfDoc.embedFont(fontBytes);
        console.log('Fuente Segoe UI cargada correctamente');
      } else {
        throw new Error('No se pudo cargar la fuente Segoe UI');
      }
    } catch (fontError) {
      console.warn('No se pudo cargar Segoe UI, usando fuente fallback:', fontError);
      // Usar la fuente fallback si falla la carga de Segoe UI
      font = await pdfDoc.embedFont(config.fonts.fallback);
    }

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
      // Aplicar un texto más limpio - eliminar caracteres no deseados y múltiples espacios
      const cleanDescription = projectData.description
        .trim()
        .replace(/\s+/g, ' '); // Reemplazar múltiples espacios con uno solo
      
      console.log('Dibujando descripción:', {
        y: titleY - config.description.marginTop,
        fontSize: config.description.fontSize,
        maxWidth: Math.min(width - (config.description.marginSides * 2), config.description.maxWidth)
      });
      
      lastY = drawMultilineText(
        page,
        cleanDescription,
        config.description.marginSides,
        titleY - config.description.marginTop,
        config.description.fontSize,
        font
      );
    }
    
    // Si hay una imagen, insertarla
    if (projectData.image) {
      try {
        const imageBytes = await projectData.image.arrayBuffer();
        let embedImage;
        
        if (projectData.image.type === 'image/png') {
          embedImage = await pdfDoc.embedPng(imageBytes);
        } else if (projectData.image.type === 'image/jpeg' || projectData.image.type === 'image/jpg') {
          embedImage = await pdfDoc.embedJpg(imageBytes);
        }
        
        if (embedImage) {
          // Obtener dimensiones originales
          const imgDims = embedImage.scale(1);
          
          // Usar dimensiones fijas o calcular escala para mantener proporción
          let scaledWidth, scaledHeight;
          
          if (config.image.width && config.image.height) {
            // Usar dimensiones fijas
            scaledWidth = config.image.width;
            scaledHeight = config.image.height;
          } else {
            // Calcular escala basada en restricciones y mantener proporción
            const scaleWidth = config.image.maxWidth / imgDims.width;
            const scaleHeight = config.image.maxHeight / imgDims.height;
            const scale = Math.min(scaleWidth, scaleHeight) * config.image.scale;
            
            scaledWidth = imgDims.width * scale;
            scaledHeight = imgDims.height * scale;
          }
          
          // Calcular posición - centrado horizontal
          const imgX = (width - scaledWidth) / 2;
          
          // Calcular posición vertical - debajo de la descripción
          // Asegurar que lastY sea un número válido
          const imgY = typeof lastY === 'number' && !isNaN(lastY) 
            ? lastY - config.image.marginTop - scaledHeight 
            : height / 2 - scaledHeight / 2; // Posición por defecto si lastY no es válido
          
          console.log("Dibujando imagen en:", { imgX, imgY, scaledWidth, scaledHeight });
          
          page.drawImage(embedImage, {
            x: imgX,
            y: imgY,
            width: scaledWidth,
            height: scaledHeight,
          });
        }
      } catch (imageError) {
        console.error('Error procesando la imagen:', imageError);
        // Continuamos sin la imagen
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