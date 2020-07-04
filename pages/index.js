import {withApollo} from "../apollo";
import HomePage from "../components/index";
import {withApp} from "../components/app";

export default withApollo({ssr:false})(
  HomePage
);
