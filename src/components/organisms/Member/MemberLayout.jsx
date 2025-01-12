import React from "react";
import { useParams } from "react-router-dom";

function MemberLayout() {

    const {memberId, id} = useParams();
    console.log(memberId, id);

  return (
    <div>
      Member Chat
    </div>
  );
}

export default MemberLayout;
