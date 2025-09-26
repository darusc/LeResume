import { useReactToPrint } from "react-to-print";

/**
 * Wrapper hook around useReactToPrint
 */
export default function usePrint(ref: React.RefObject<HTMLElement>, title: string) {
  return useReactToPrint({
    documentTitle: title,
    content: () => ref.current,
    pageStyle: `
      @media print {
        .a4 {
          transform: scale(1) !important;
        }
      }
    `,
  });
}