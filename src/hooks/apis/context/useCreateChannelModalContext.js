import { useContext } from "react";

import ModalOpenContext from "@/context/ModalOpenContext";


function useCreateChannelModalContext() {
 const {createChannelModalOpen, setCreateChannelModalOpen} = useContext(ModalOpenContext);
 return {createChannelModalOpen, setCreateChannelModalOpen};
}

export default useCreateChannelModalContext;
