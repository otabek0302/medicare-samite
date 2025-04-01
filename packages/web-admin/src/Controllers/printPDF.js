// @ts-ignore
const printPDF = (pdfUrl) => {
  const newWindow = window.open(pdfUrl, '_blank');
  if (newWindow) {
    newWindow.focus();

    newWindow.onload = () => {
      // @ts-ignore
      newWindow.load();
      newWindow.onafterprint = () => {
        newWindow.close();
      };
    };
  }
};

export default printPDF;
