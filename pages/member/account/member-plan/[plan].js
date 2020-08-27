import {withApollo} from "../../../../apollo";
import {withMemberLayout} from "../../../../components/app";
import SwitchPlanPage from "../../../../components/SwitchPlanPage";

export default withApollo({ssr: false})(
  withMemberLayout(SwitchPlanPage, {secure: true})
)