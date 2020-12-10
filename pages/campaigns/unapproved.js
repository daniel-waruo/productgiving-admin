import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import UnapprovedCampaignListPage from "../../components/UnapprovedCampaignListPage";

export default withApollo({ssr: false})(
  withMainLayout(UnapprovedCampaignListPage, {secure: true})
)
