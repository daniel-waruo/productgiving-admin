import {withApollo} from "../../../apollo";
import DeliveredDeliveryListPage from "../../../components/DeliveredDeliveryListPage";
import {withMainLayout} from "../../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(DeliveredDeliveryListPage, {secure: true})
)