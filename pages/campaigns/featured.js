import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import FeaturedCampaignListPage from "../../components/FeaturedCampaignListPage";

export default withApollo({ssr: false})(
  withMainLayout(FeaturedCampaignListPage, {secure: true})
)
