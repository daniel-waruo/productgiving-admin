import {withApollo} from "../apollo";
import {withMainLayout} from "../components/Layouts";
import MemberHomePage from "../components/HomePage"

export default withApollo({ssr: false})(
  withMainLayout(MemberHomePage, {secure: true})
);