import CreateWorkspaceModal from "@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal";
import WorkspacePreferenceModal from "@/components/organisms/Models/WorkspacePreferceModal/WorkspacePreferenceModal";
import CreateChannelModal from "./CreateChannelModal/CreateChannelModal";
import AddMemberLinkModal from "./AddMemberLinkModal/AddMemberLinkModal";

function ModelContainer() {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferenceModal/>
      <CreateChannelModal/>
      <AddMemberLinkModal/>
    </>
  );
}

export default ModelContainer;
