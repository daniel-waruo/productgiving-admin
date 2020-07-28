import {withApollo} from "../../../apollo";
import ProfilePage from "../../../components/ProfilePage";
import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(ProfilePage,{secure:true})
)