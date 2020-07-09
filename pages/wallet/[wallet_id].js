import {withApollo} from "../../apollo";
import WalletPage from "../../components/WalletPage";
import {withApp} from "../../components/app";

export default withApollo({ssr: false})(
  withApp(WalletPage, {secure: true})
);