import {withApollo} from "../../../apollo";
import DeliveryListPage from "../../../components/DeliveryListPage";
import {withMainLayout} from "../../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(DeliveryListPage, {secure: true})
)