import {withApollo} from "../apollo";
import HomePage from "../components/HomePage";
import {withApp} from "../components/app";


export default withApollo({ssr: false})(
  withApp(HomePage, {secure: false})
);