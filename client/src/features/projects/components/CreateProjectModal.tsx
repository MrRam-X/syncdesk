import { type FC, type FormEvent, useState } from "react";
import { Layers } from "lucide-react";
import Modal from "@/components/common/Modal";
import { FormInput, FormTextarea } from "@/components/common/FormControls";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject?: (projectData: {
    name: string;
    key: string;
    description: string;
  }) => void;
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onCreateProject = () => {},
}) => {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (val: string) => {
    setName(val);
    if (!key || key.length <= 4) {
      // Auto-suggest 3-4 letter uppercase key
      const suggestedKey = val
        .trim()
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 4);
      setKey(suggestedKey);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCreateProject({ name, key, description });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      description="Initialize a new repository workspace and sprint tracker"
      size="md"
      icon={<Layers className="w-4 h-4 text-blue-400" />}
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
            disabled={!name || !key}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition cursor-pointer"
          >
            Create Project
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <FormInput
          label="Project Name"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., Data Platform & Pipelines"
        />

        <FormInput
          label="Project Key (Prefix for Task IDs)"
          required
          value={key}
          onChange={(e) => setKey(e.target.value.toUpperCase().slice(0, 5))}
          placeholder="e.g., DATA"
          className="font-mono uppercase"
        />

        <FormTextarea
          label="Description & Scope"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the repository goals, technical stack, or deliverables..."
        />
      </form>
    </Modal>
  );
};

export default CreateProjectModal;
