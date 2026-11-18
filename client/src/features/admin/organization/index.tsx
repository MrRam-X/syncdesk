import { useState, type FC } from "react";
import OrganizationTable, {
  type OrganizationRowItem,
} from "./components/OrganizationTable";
import { Plus } from "lucide-react";
import AddOrgModal from "../components/AddOrgModal";
import { useNavigate } from "react-router-dom";
import { APP_ROUTE_NAMES } from "@/constants/appConstant";

const initialOrganizations: OrganizationRowItem[] = [
  {
    id: "org-1",
    name: "Acme Corporation",
    slug: "acme-corp",
    ownerName: "Sarah Vance",
    ownerEmail: "owner@acme.com",
    ownerInitials: "SV",
    usersCount: 24,
    projectsCount: 4,
    created: "Oct 10, 2026",
    status: "Active",
    plan: "Enterprise Tier",
  },
  {
    id: "org-2",
    name: "Stripefin Technologies",
    slug: "stripefin-tech",
    ownerName: "David Kross",
    ownerEmail: "david@stripefin.io",
    ownerInitials: "DK",
    usersCount: 18,
    projectsCount: 3,
    created: "Oct 15, 2026",
    status: "Active",
    plan: "Growth Tier",
  },
  {
    id: "org-3",
    name: "Nexus Health Systems",
    slug: "nexus-health",
    ownerName: "Dr. Clara Oswald",
    ownerEmail: "clara@nexushealth.org",
    ownerInitials: "CO",
    usersCount: 42,
    projectsCount: 7,
    created: "Oct 20, 2026",
    status: "Active",
    plan: "Enterprise Tier",
  },
  {
    id: "org-4",
    name: "Vanguard Logistics",
    slug: "vanguard-logistics",
    ownerName: "Thomas Thorne",
    ownerEmail: "thomas@vanguard.co",
    ownerInitials: "TT",
    usersCount: 8,
    projectsCount: 1,
    created: "Nov 02, 2026",
    status: "Suspended",
    plan: "Starter Tier",
  },
];

const OrganizationsView: FC = () => {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const orgSelectHandler = (org: OrganizationRowItem) => {
    console.log({ org });
    // Add the code here
    navigate(`/${APP_ROUTE_NAMES.ORG_DETAILS}/${org.id}`)
  };

  const orgDeleteHandler = (org: OrganizationRowItem) => {
    console.log({ org });
    // Add the code here
  };

  const onAddOrgModalCloseButtonClick = () => {
    setIsAddModalOpen(false)
  }
  return (
    <div className="space-y-6 w-full">
      {/* Header Info & Sub-Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-rose-400 font-semibold">Super-Admin</span>
            <span>/</span>
            <span className="text-slate-300">System Governance</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white mt-1">
            Multi-Tenant Administration
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 h-8 px-3.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-600/20 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Organization</span>
          </button>
        </div>
      </div>
      <OrganizationTable
        organizations={initialOrganizations}
        onRequestDelete={orgDeleteHandler}
        onSelectOrg={orgSelectHandler}
      />
      <AddOrgModal 
        isOpen={isAddModalOpen}
        onClose={onAddOrgModalCloseButtonClick}
      />
    </div>
  );
};

export default OrganizationsView;
