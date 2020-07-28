import {withApollo} from "../../../apollo";
import ProfilePage from "../../../components/ProfilePage";
import {withSubscriberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withSubscriberLayout(ProfilePage, {secure: true})
)