import {withApollo} from "../../../apollo";
import DeliveryPage from "../../../components/DeliveryPage";
import {withMainLayout} from "../../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(DeliveryPage, {secure: true})
)