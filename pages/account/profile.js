import {withApollo} from "../../apollo";
import ProfilePage from "../../components/ProfilePage";
import {withMainLayout} from "../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(ProfilePage, {secure: true})
)