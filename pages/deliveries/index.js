import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import DeliveryStatePage from "../../components/DeliveryStatePage";

export default withApollo({ssr: false})(
  withMainLayout(DeliveryStatePage, {secure: true})
)