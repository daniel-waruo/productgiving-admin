import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import UsersPage from "../../components/UsersPage"

export default withApollo({ssr: false})(
  withMainLayout(UsersPage, {secure: true})
);