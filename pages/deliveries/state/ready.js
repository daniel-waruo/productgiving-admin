import {withApollo} from "../../../apollo";
import {withMainLayout} from "../../../components/Layouts";
import ReadyDeliveryListPage from "../../../components/ReadyDeliveryListPage";

export default withApollo({ssr: false})(
  withMainLayout(ReadyDeliveryListPage, {secure: true})
)