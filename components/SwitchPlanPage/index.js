import React from "react";
import {withRouter} from "next/router";
import SwitchToFree from "./SwitchToFree";
import compose from "lodash.flowright"
import {graphql} from "react-apollo";
import {MEMBER_PLAN_QUERY} from "../MemberPlanPage/queries";
import Loader from "../Loader";
import {redirect} from "../app/components";
import PayForSubscription from "./PayForSubscription";
import SwitchBetweenPlan from "./SwitchBetweenPlan";


const plans = ["free", "basic", "premium"];


const SwitchPlanPage = props => {
  const {router: {query: {plan}}} = props;
  const {data: {loading, error, user, pricing}} = props;

  if (loading) return <Loader/>;

  if (error) return <h1>{error.measure}</h1>;

  if (!plans.includes(plan)) {
    return <h1>404 page</h1>;
  }
  // if current user plan is the
  // same as the plan to pay for
  if (user.plan.name === plan) {
    // if free is to free redirect to member plan
    // to look for a subscription
    if (plan === "free") return redirect('/member/account/member-plan');
    // pay for the plan
    return <PayForSubscription plan={plan} price={pricing[plan].monthlyPrice}/>;
  }
  // switch from one of the paid plans to free
  if (plan === "free") return <SwitchToFree plan={user.plan}/>;

  if (user.plan.name === "free") return <PayForSubscription plan={plan} price={pricing[plan].monthlyPrice}/>;

  // if the plan is being switched between the basic and premium package
  return <SwitchBetweenPlan/>;
}
export default withRouter(
  compose(
    graphql(MEMBER_PLAN_QUERY)
  )(SwitchPlanPage)
)
