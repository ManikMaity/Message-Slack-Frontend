
import DatabaseError from "@/components/organisms/errors/DatabaseError";
import useAuthContext from "@/hooks/apis/context/useAuthContext";
import useGetUserWorkspace from "@/hooks/apis/useGetUserWorkspace";
import { getErrorMessage } from "@/utils/getErrorMessage";


function Workspaces() {
  const { workspacesData, isError, isLoading, isSuccess, refetch, error } =
    useGetUserWorkspace();
    const {auth} = useAuthContext();
    console.log(auth);

  console.log(error, "error in workspaces");

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
    {isSuccess && workspacesData?.data?.map(workspace => (
      <div key={workspace._id}>{workspace.name}</div>
    ))}
  </div>;
}

export default Workspaces;
