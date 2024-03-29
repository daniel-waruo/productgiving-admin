import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import CampaignsPage from "../../components/CampaignsPage";

export default withApollo({ssr: false})(
  withMainLayout(CampaignsPage, {secure: true})
)
