import {withApollo} from "../../../../apollo";
import {withMemberLayout} from "../../../../components/app";
import MemberPlanPage from "../../../../components/MemberPlanPage";

export default withApollo({ssr: false})(
  withMemberLayout(MemberPlanPage, {secure: true})
)