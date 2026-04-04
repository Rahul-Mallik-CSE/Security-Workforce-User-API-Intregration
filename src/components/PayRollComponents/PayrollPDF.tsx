/** @format */

import { PayrollData } from "@/types/AllTypes";

interface PayrollPDFProps {
  selectedPayrolls: PayrollData[];
}

export default function PayrollPDF({ selectedPayrolls }: PayrollPDFProps) {
  const totalAmount = selectedPayrolls.reduce((sum, p) => {
    const amount = parseFloat(p.total.replace("$", ""));
    return sum + amount;
  }, 0);

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="hidden print:block">
      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          .print-container { width: 100%; padding: 20px; font-family: Arial, sans-serif; }
          .print-header { margin-bottom: 20px; border-bottom: 2px solid #000; padding-bottom: 10px; }
          .print-title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
          .print-date { font-size: 12px; color: #666; margin-top: 5px; }
          .print-summary { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd; }
          .summary-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .summary-label { font-weight: bold; }
          .print-records { margin-top: 15px; }
          .record { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd; }
          .record-title { font-size: 12px; font-weight: bold; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
          .record-row { display: flex; justify-content: space-between; margin-bottom: 4px; }
          .record-label { font-weight: bold; width: 50%; }
          .record-value { width: 50%; }
          .banking-info { font-weight: bold; font-size: 11px; margin-top: 8px; margin-bottom: 4px; }
          .total-section { margin-top: 30px; padding-top: 20px; border-top: 2px solid #333; }
          .total-row { display: flex; justify-content: space-between; margin-top: 10px; }
          .total-amount { font-weight: bold; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th { background-color: #f0f0f0; border-bottom: 2px solid #333; padding: 8px; text-align: left; font-weight: bold; font-size: 10px; }
          td { border-bottom: 1px solid #ddd; padding: 8px; font-size: 9px; }
        }
      `}</style>
    </div>
  );
}
