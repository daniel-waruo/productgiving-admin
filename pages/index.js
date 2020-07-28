import {withApollo} from "../apollo";
import HomePage from "../components/HomePage";
import {withDefaultLayout} from "../components/app";


export default withApollo({ssr: false})(
  withDefaultLayout(HomePage, {secure: false})
);