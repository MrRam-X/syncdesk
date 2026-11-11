import { type FC, type FormEvent, useState } from "react";
import { Building2 } from "lucide-react";
import Modal from "@/components/common/Modal";
import { FormInput, FormSelect } from "@/components/common/FormControls";

export interface NewOrgData {
  name: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  plan: string;
}

interface AddOrgModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOrg?: (data: NewOrgData) => void;
}

const AddOrgModal: FC<AddOrgModalProps> = ({
  isOpen,
  onClose,
  onAddOrg = () => {},
}) => {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [plan, setPlan] = useState("Enterprise Tier");

  const handleNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().trim().replace(/\s+/g, "-"));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAddOrg({ name, slug, ownerName, ownerEmail, plan });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Organization"
      description="Provision a new company tenant and assign owner credentials"
      size="md"
      icon={<Building2 className="w-4 h-4 text-rose-400" />}
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
            disabled={!name || !slug}
            className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition cursor-pointer"
          >
            Provision Organization
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <FormInput
          label="Company / Organization Name"
          required
          value={name}
          onChange={(e) => handleNameChange(e.target.value)}
          placeholder="e.g., Quantum Dynamics"
        />

        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Tenant URL Slug <span className="text-rose-400">*</span>
          </label>
          <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 overflow-hidden text-xs">
            <span className="px-3 py-2 bg-slate-900 border-r border-slate-800 text-slate-500 font-mono text-[11px]">
              syncdesk.app/
            </span>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="quantum-dynamics"
              className="w-full bg-transparent px-3 py-2 text-slate-200 placeholder-slate-600 focus:outline-none font-mono text-xs"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Owner Name"
            required
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            placeholder="e.g., Jessica Alba"
          />

          <FormInput
            label="Owner Email"
            type="email"
            required
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            placeholder="jessica@quantum.com"
          />
        </div>

        <FormSelect
          label="Subscription Tier"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
        >
          <option value="Enterprise Tier">Enterprise Tier (Unlimited)</option>
          <option value="Growth Tier">Growth Tier (Up to 50 users)</option>
          <option value="Starter Tier">Starter Tier (Up to 15 users)</option>
        </FormSelect>
      </form>
    </Modal>
  );
};

export default AddOrgModal;