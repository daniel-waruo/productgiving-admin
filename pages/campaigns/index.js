import {withApollo} from "../../apollo";
import CampaignListPage from "../../components/CampaignListPage";
import {withMainLayout} from "../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(CampaignListPage, {secure: true})
)