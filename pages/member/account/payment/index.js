import {withApollo} from "../../../../apollo";
import PaymentProfilePage from "../../../../components/PaymentProfilePage";
import {withMemberLayout} from "../../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(PaymentProfilePage, {secure: true})
)