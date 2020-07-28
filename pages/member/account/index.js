import {withApollo} from "../../../apollo";
import AccountPage from "../../../components/AccountPage";
import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(AccountPage,{secure:true})
)