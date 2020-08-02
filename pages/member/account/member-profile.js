import {withApollo} from "../../../apollo";
import {withMemberLayout} from "../../../components/app";
import MemberProfilePage from "../../../components/MemberProfilePage";

export default withApollo({ssr: false})(
  withMemberLayout(MemberProfilePage,{secure:true})
)