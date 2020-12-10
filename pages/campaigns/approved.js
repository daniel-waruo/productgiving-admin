import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import ApprovedCampaignListPage from "../../components/ApprovedCampaignListPage";

export default withApollo({ssr: false})(
  withMainLayout(ApprovedCampaignListPage, {secure: true})
)
