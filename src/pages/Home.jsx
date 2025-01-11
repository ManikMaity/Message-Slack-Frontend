import AvatarMenu from "@/components/atoms/AvatarMenu";
import DatabaseError from "@/components/organisms/errors/DatabaseError";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import useGetUserWorkspace from "@/hooks/apis/workspaces/useGetUserWorkspace";
import { getErrorMessage } from "@/utils/getErrorMessage";

function Home() {
  const { workspacesData, isError, isLoading, isSuccess, refetch, error } =
  useGetUserWorkspace();
  const {auth} = useAuthContext();


if (isError || isLoading) {
  return (
    <DatabaseError
      onClickFn={refetch}
      errorTitle={error?.message}
      errorMessage={getErrorMessage(error)}
    />
  );
}

return <div>
  <AvatarMenu/>
  {isSuccess && workspacesData?.data?.map(workspace => (
    <div key={workspace._id}>{workspace.name}</div>
  ))}
   
</div>;
}

export default Home;
