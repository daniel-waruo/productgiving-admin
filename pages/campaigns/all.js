import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import CampaignListPage from "../../components/CampaignListPage";

export default withApollo({ssr: false})(
  withMainLayout(CampaignListPage, {secure: true})
)
