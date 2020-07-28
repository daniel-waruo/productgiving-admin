import {withApollo} from "../../../apollo";
import WalletPage from "../../../components/WalletPage";
import {withMemberLayout} from "../../../components/app";

export default withApollo({ssr: false})(
  withMemberLayout(WalletPage, {secure: true})
);