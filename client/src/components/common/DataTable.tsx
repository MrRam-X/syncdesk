import { type ReactNode } from "react";

export interface Column<T> {
  header: string;
  width?: string;
  align?: "left" | "center" | "right";
  accessor?: keyof T;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T, index: number) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

const DataTable = <T,>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = "No records found matching criteria.",
}: DataTableProps<T>) => {
  return (
    <div className="bg-slate-900/30 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          {/* Table Header */}
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={`py-3 px-4 ${col.width || ""} ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                        ? "text-center"
                        : "text-left"
                  }`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-800">
            {data.map((row, rIdx) => {
              const isClickable = !!onRowClick;
              return (
                <tr
                  key={keyExtractor(row, rIdx)}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`transition ${
                    isClickable
                      ? "hover:bg-slate-900/60 cursor-pointer group"
                      : ""
                  }`}
                >
                  {columns.map((col, cIdx) => (
                    <td
                      key={cIdx}
                      className={`py-3.5 px-4 ${
                        col.align === "right"
                          ? "text-right"
                          : col.align === "center"
                            ? "text-center"
                            : "text-left"
                      }`}
                    >
                      {col.render
                        ? col.render(row)
                        : col.accessor
                          ? (row[col.accessor] as ReactNode)
                          : null}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State Fallback */}
      {data.length === 0 && (
        <div className="p-8 text-center text-slate-500 text-xs italic">
          {emptyMessage}
        </div>
      )}
    </div>
  );
}

export default DataTable;
