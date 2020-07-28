import {withApollo} from "../../../apollo";
import AccountPage from "../../../components/SubscriberAccountPage";
import {withSubscriberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(AccountPage, {secure: true})
)