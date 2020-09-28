import {withApollo} from "../../../apollo";
import PasswordChange from "../../../components/PasswordChangePage";
import {withMainLayout} from "../../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(PasswordChange, {secure: false})
)