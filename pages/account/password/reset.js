import {withApollo} from "../../../apollo";
import PasswordReset from "../../../components/PasswordReset";
import {withMainLayout} from "../../../components/Layouts";

export default withApollo({ssr: false})(
  withMainLayout(PasswordReset, {secure: false})
)