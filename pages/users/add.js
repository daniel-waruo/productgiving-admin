import {withApollo} from "../../apollo";
import {withMainLayout} from "../../components/Layouts";
import UsersAddPage from "../../components/UsersAddPage"

export default withApollo({ssr: false})(
  withMainLayout(UsersAddPage, {secure: true})
);