import CreateWorkspaceModal from "@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal";
import WorkspacePreferenceModal from "@/components/organisms/Models/WorkspacePreferceModal/WorkspacePreferenceModal";
import CreateChannelModal from "./CreateChannelModal/CreateChannelModal";

function ModelContainer() {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferenceModal/>
      <CreateChannelModal/>
    </>
  );
}

export default ModelContainer;
