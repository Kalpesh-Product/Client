import { useState } from "react";
import { Document, Page } from "react-pdf";
// import pdf1 from "./sop-pdfs/sop-wfh.pdf";
import pdf1 from "../sops/sop-pdfs/sop-wfh.pdf";

function SopPdf() {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function downloadPdf() {
    // Create a link element
    const link = document.createElement("a");
    link.href = pdf1; // Path to your PDF file
    link.download = "sop-wfh.pdf"; // Name for the downloaded file
    link.click(); // Programmatically trigger the download
  }

  return (
    <>
      <div className="text-right">
        {/* <button onClick={downloadPdf} className="download-btn">
          Download PDF
        </button> */}

        <button
          onClick={downloadPdf}
          className=" px-6 py-2 rounded-lg text-white wono-blue-dark hover:bg-[#3cbce7] transition-shadow shadow-md hover:shadow-lg active:shadow-inner">
          Download PDF
        </button>
      </div>
      <div>
        <Document file={pdf1} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
        {/* <p>
        Page {pageNumber} of {numPages}
      </p> */}
      </div>
    </>
  );
}

export default SopPdf;
