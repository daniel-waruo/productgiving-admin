import {withApollo} from "../../../apollo";
import {withMainLayout} from "../../../components/Layouts";
import PendingDeliveryListPage from "../../../components/PendingDeliveryListPage";

export default withApollo({ssr: false})(
  withMainLayout(PendingDeliveryListPage, {secure: true})
)