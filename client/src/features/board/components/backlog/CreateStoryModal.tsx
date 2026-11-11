import { type FC, type FormEvent, useState } from "react";
import { Bookmark } from "lucide-react";
import Modal from "@/components/common/Modal";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "@/components/common/FormControls";

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSprintDefault?: string;
  onSubmitStory?: (story: {
    title: string;
    sprint: string;
    priority: string;
    points: number;
    assignee: string;
    description: string;
  }) => void;
}

const CreateStoryModal: FC<CreateStoryModalProps> = ({
  isOpen,
  onClose,
  selectedSprintDefault = "Sprint 24.1 (Active)",
  onSubmitStory = () => {},
}) => {
  const [title, setTitle] = useState("");
  const [sprint, setSprint] = useState(selectedSprintDefault);
  const [priority, setPriority] = useState("Medium");
  const [points, setPoints] = useState(5);
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmitStory({ title, sprint, priority, points, assignee, description });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create User Story"
      description="Add a new requirement to the backlog or active sprint"
      size="lg"
      icon={<Bookmark className="w-4 h-4 text-blue-400" />}
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
            disabled={!title}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            Create Story
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <FormInput
          label="Story Title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Implement webhook signature verification"
        />

        <FormSelect
          label="Assign to Sprint"
          value={sprint}
          onChange={(e) => setSprint(e.target.value)}
        >
          <option value="Sprint 24.1 (Active)">
            Sprint 24.1 (Current Active Sprint)
          </option>
          <option value="Sprint 24.2 (Upcoming)">
            Sprint 24.2 (Upcoming Planned Sprint)
          </option>
          <option value="Sprint Backlog (Inactive)">
            Backlog (Unassigned / Future)
          </option>
        </FormSelect>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormSelect
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </FormSelect>

          <FormInput
            label="Story Points (Fibonacci)"
            type="number"
            min="1"
            max="34"
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            placeholder="e.g., 3, 5, 8"
          />
        </div>

        <FormSelect
          label="Assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        >
          <option value="">Unassigned</option>
          <option value="alex">Alex Rivera (Project Supervisor)</option>
          <option value="sarah">Sarah Chen (Coordinator)</option>
          <option value="john">John Doe (Contributor)</option>
        </FormSelect>

        <FormTextarea
          label="Description & Acceptance Criteria"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="As a [user], I want to [goal] so that [benefit]..."
        />
      </form>
    </Modal>
  );
};

export default CreateStoryModal;
