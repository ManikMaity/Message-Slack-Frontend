import CreateWorkspaceModal from "@/components/molecules/CreateWorkspaceModal/CreateWorkspaceModal";
import WorkspacePreferenceModal from "@/components/organisms/Models/WorkspacePreferceModal/WorkspacePreferenceModal";
import CreateChannelModal from "./CreateChannelModal/CreateChannelModal";
import AddMemberLinkModal from "./AddMemberLinkModal/AddMemberLinkModal";
import UserProfileModal from "./UserProfileModal/UserProfileModal";
import SearchBoxModal from "./SearchBox/SearchBoxModal";

function ModelContainer() {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferenceModal/>
      <CreateChannelModal/>
      <AddMemberLinkModal/>
      <UserProfileModal/>
    </>
  );
}

export default ModelContainer;
