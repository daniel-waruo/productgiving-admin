import {withApollo} from "../../apollo";
import AccountPage from "../../components/AccountPage";
import {withMainLayout} from "../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(AccountPage, {secure: true})
)