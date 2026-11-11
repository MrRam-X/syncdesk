import { type FC, type FormEvent, useState } from "react";
import { Calendar } from "lucide-react";
import Modal from "@/components/common/Modal";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/common/FormControls";

export interface SprintFormData {
  name: string;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "PLANNED" | "COMPLETED";
  goal: string;
}

interface SprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  initialData?: Partial<SprintFormData>;
  onSubmitSprint?: (data: SprintFormData) => void;
}

const SprintModal: FC<SprintModalProps> = ({
  isOpen,
  onClose,
  mode = "create",
  initialData,
  onSubmitSprint = () => {},
}) => {
  // Initialize state directly from initialData / mode (Zero useEffect, zero cascading renders)
  const [name, setName] = useState(
    initialData?.name ?? (mode === "edit" ? "Sprint 24.1" : ""),
  );
  const [startDate, setStartDate] = useState(
    initialData?.startDate ?? (mode === "edit" ? "2026-10-20" : ""),
  );
  const [endDate, setEndDate] = useState(
    initialData?.endDate ?? (mode === "edit" ? "2026-11-03" : ""),
  );
  const [status, setStatus] = useState<"ACTIVE" | "PLANNED" | "COMPLETED">(
    initialData?.status ?? (mode === "edit" ? "ACTIVE" : "PLANNED"),
  );
  const [goal, setGoal] = useState(
    initialData?.goal ??
      (mode === "edit"
        ? "Integrate Stripe webhook verification and token rotation."
        : ""),
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitSprint({ name, startDate, endDate, status, goal });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit Sprint" : "Create New Sprint"}
      description={
        mode === "edit"
          ? "Update timeline, goals, and iteration state"
          : "Plan a new sprint iteration for this project"
      }
      size="md"
      icon={<Calendar className="w-4 h-4 text-blue-400" />}
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!name}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            {mode === "edit" ? "Save Changes" : "Create Sprint"}
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <FormInput
          label="Sprint Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Sprint 24.3"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="[color-scheme:dark]"
          />

          <FormInput
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="[color-scheme:dark]"
          />
        </div>

        <FormSelect
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "ACTIVE" | "PLANNED" | "COMPLETED")
          }
        >
          <option value="PLANNED">Planned / Upcoming</option>
          <option value="ACTIVE">Active</option>
          <option value="COMPLETED">Completed</option>
        </FormSelect>

        <FormTextarea
          label="Sprint Goal"
          rows={3}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="What does the team aim to deliver in this iteration?"
        />
      </form>
    </Modal>
  );
};

export default SprintModal;
