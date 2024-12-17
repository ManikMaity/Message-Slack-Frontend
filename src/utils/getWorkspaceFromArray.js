export function getWorkspaceFromArray(workspaces, workspaceId) {
    return workspaces.find((workspace) => workspace._id === workspaceId);
}