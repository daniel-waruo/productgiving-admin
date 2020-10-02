import {withApollo} from "../../../apollo";
import CampaignPage from "../../../components/CampaignPage";
import {withMainLayout} from "../../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(CampaignPage, {secure: true})
)