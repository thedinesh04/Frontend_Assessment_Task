
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export const exportDataUtil = (rows, format) => {
    if (!rows || rows.length === 0) {
        alert("Please select at least one row to export");
        return;
    }

    if (format === "csv") {
        const csv = Papa.unparse(rows);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "export.csv");
        link.click();
    }

    if (format === "xlsx") {
        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, "export.xlsx");
    }

    if (format === "pdf") {
        const doc = new jsPDF();
        const head = [["ID", "Name", "Email", "Status"]];
        const body = rows.map(user => [user.id, user.name, user.email, user.status]);
        autoTable(doc,{
            head,
            body,
            styles: { fontSize: 10 },
        });
        doc.save("export.pdf");
    }
};
