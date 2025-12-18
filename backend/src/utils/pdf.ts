import PDFDocument from 'pdfkit';

export const generateCertificate = (
  studentName: string,
  courseTitle: string
) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });

  doc.fontSize(26).text('Certificate of Completion', { align: 'center' });
  doc.moveDown(2);

  doc.fontSize(16).text('This certifies that', { align: 'center' });
  doc.moveDown();

  doc.fontSize(20).text(studentName, { align: 'center', underline: true });
  doc.moveDown();

  doc.fontSize(16).text(
    `has successfully completed the course`,
    { align: 'center' }
  );
  doc.moveDown();

  doc.fontSize(18).text(courseTitle, { align: 'center', underline: true });
  doc.moveDown(3);

  doc.fontSize(14).text(`Date: ${new Date().toDateString()}`, {
    align: 'center'
  });

  return doc;
};
