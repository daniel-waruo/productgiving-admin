import {withApollo} from "../../../../apollo";
import {withMemberLayout} from "../../../../components/app";
import PaymentPhoneVerificationPage from "../../../../components/PaymentPhoneVerificationPage";

export default withApollo({ssr: false})(
  withMemberLayout(PaymentPhoneVerificationPage, {secure: true})
)