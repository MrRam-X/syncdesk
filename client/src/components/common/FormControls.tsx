import {
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";
import { ChevronDown } from "lucide-react";

interface BaseFieldProps {
  label: string;
  required?: boolean;
  error?: string;
}

const FormInput = ({
  label,
  required,
  error,
  className = "",
  ...props
}: BaseFieldProps & InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <input
        {...props}
        className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none transition text-xs ${
          error ? "border-rose-500" : "border-slate-800 focus:border-blue-500"
        } ${className}`}
      />
      {error && <p className="text-[10px] text-rose-400">{error}</p>}
    </div>
  );
};

const FormSelect = ({
  label,
  required,
  error,
  children,
  className = "",
  ...props
}: BaseFieldProps & SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <div className="relative">
        <select
          {...props}
          className={`w-full bg-slate-950 border rounded-lg px-3 py-2 text-slate-200 text-xs focus:outline-none appearance-none cursor-pointer transition ${
            error
              ? "border-rose-500"
              : "border-slate-800 hover:border-slate-700 focus:border-blue-500"
          } ${className}`}
        >
          {children}
        </select>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {error && <p className="text-[10px] text-rose-400">{error}</p>}
    </div>
  );
};

const FormTextarea = ({
  label,
  required,
  error,
  className = "",
  rows = 4,
  ...props
}: BaseFieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <textarea
        rows={rows}
        {...props}
        className={`w-full bg-slate-950 border rounded-lg p-3 text-slate-200 placeholder-slate-500 focus:outline-none transition text-xs leading-relaxed font-sans resize-none ${
          error ? "border-rose-500" : "border-slate-800 focus:border-blue-500"
        } ${className}`}
      />
      {error && <p className="text-[10px] text-rose-400">{error}</p>}
    </div>
  );
};

export { FormInput, FormSelect, FormTextarea };
