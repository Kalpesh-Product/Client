import { useState } from "react";
import { Document, Page } from "react-pdf";

function EmployeeAgreementPdf() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  const pdfUrl =
    "https://res.cloudinary.com/dua5bpiab/raw/upload/v1735631360/employment-agreements/fdie7npsnhmrw1gr2ljp.pdf";

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  // function downloadPdf() {
  //   // Create a link element
  //   const link = document.createElement("a");
  //   link.href = pdfUrl; // Path to your PDF file
  //   link.download = "dummy-employment-agreement.pdf"; // Name for the downloaded file
  //   link.click(); // Programmatically trigger the download
  // }
  async function downloadPdf() {
    try {
      const response = await fetch(pdfUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "employment-agreement.pdf"; // Name for the downloaded file

      // Add the link to the document body and click it to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }

  return (
    <>
      <div>
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>
      <div className="text-right">
        <button
          onClick={downloadPdf}
          className="px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
          Download PDF
        </button>
      </div>
    </>
  );
}

export default EmployeeAgreementPdf;
