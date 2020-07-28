import {withApollo} from "../../apollo";
import {withSubscriberLayout} from "../../components/app";
import SubscriberHomePage from "../../components/SubscriberHomePage"

export default withApollo({ssr: false})(
  withSubscriberLayout(SubscriberHomePage, {secure: false})
);