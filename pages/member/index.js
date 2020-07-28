import {withApollo} from "../../apollo";
import {withMemberLayout} from "../../components/app";
import MemberHomePage from "../../components/MemberHomePage"

export default withApollo({ssr: false})(
  withMemberLayout(MemberHomePage, {secure: false})
);