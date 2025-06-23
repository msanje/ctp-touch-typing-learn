declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
    };
    jsPDF?: {
      unit?: string;
      format?: string;
      orientation?: string;
    };
  }

  interface Html2PdfInstance {
    from(element: HTMLElement): Html2PdfInstance;
    set(options: Html2PdfOptions): Html2PdfInstance;
    save(): void;
  }

  function html2pdf(): Html2PdfInstance;
  export default html2pdf;
}
