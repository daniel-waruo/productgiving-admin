import {withApollo} from "../../../apollo";
import {withMainLayout} from "../../../components/Layouts";
import ProcessingDeliveryListPage from "../../../components/ProcessingDeliveryListPage";

export default withApollo({ssr: false})(
  withMainLayout(ProcessingDeliveryListPage, {secure: true})
)