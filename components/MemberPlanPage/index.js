import React from "react";
import {MDBBtn, MDBCard, MDBCardHeader, MDBCol, MDBContainer, MDBIcon, MDBRow} from "mdbreact";
import {graphql} from "react-apollo";
import {MEMBER_PLAN_QUERY} from "./queries";
import Loader from "../Loader";
import {MemberPlanPricing} from "./components";
import {ExpiryCountDown} from "../SubscriberSubscriptionPage";
import Link from "next/link";

class MemberPlanPage extends React.Component {
  render() {
    const {data: {loading, error, pricing, user}} = this.props
    if (loading) return <Loader/>;
    if (error) return <h1>{error.message}</h1>;
    const {free, basic, premium} = pricing;
    const {plan} = user;
    return (
      <MDBContainer>
        <h1 className={"my-5 mx-2"}>Active Plan</h1>
        <MDBContainer>
          <MDBCard className={"p-3"} style={{borderRadius: "1rem"}}>
            <MDBCardHeader color={"white"} className={"text-dark"} tag={"div"}><h1>{plan.name}</h1></MDBCardHeader>
            <div className={"py-3 text-center"}>
              <h2>Valid For</h2>
              <MDBContainer>
                <ExpiryCountDown date={plan.expiryDate}/>
              </MDBContainer>
            </div>
            <MDBRow center className={"my-3"}>
              <MDBCol size={"8"} md={"4"}>
                <div className={"mt-3"}>
                  <h4> Ksh.{plan.monthlyPrice}/mo</h4>
                  <p>{Math.round(plan.commission * 100)}% commission</p>
                </div>
              </MDBCol>
              <MDBCol size={"12"} md={"8"} className={"text-center"}>
                {plan.name !== "free" ?

                  <Link href={"/member/account/member-plan/[plan]"} as={`/member/account/member-plan/${plan.name}`}>
                    <a>
                      <MDBBtn className={"rounded-pill mt-3"} size={"lg"} outline>
                        <MDBIcon icon={"money-bill"} className={"mr-3"}/>
                        PAY FOR PLAN
                      </MDBBtn>
                    </a>
                  </Link> : null}
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
        <h1 className="my-5 mx-2">Other Plans</h1>
        <MDBContainer>
          <MDBRow className="text-center">
            {plan.name === "free" ? null :
              <MDBCol lg={"6"} md={"12"} className="mb-4">
                <MemberPlanPricing plan={"free"} price={"0"} commission={free.commission}/>
              </MDBCol>
            }
            {plan.name === "basic" ? null :
              <MDBCol lg={"6"} md={"12"} className="mb-4">
                <MemberPlanPricing plan={"basic"} price={basic.monthlyPrice} commission={basic.commission}/>
              </MDBCol>
            }
            {plan.name === "premium" ? null :
              <MDBCol lg={"6"} md={"12"} className="mb-4">
                <MemberPlanPricing plan={"premium"} price={premium.monthlyPrice} commission={premium.commission}/>
              </MDBCol>
            }
          </MDBRow>
        </MDBContainer>
      </MDBContainer>
    )
  }
}

export default graphql(MEMBER_PLAN_QUERY,{
  options:{
    fetchPolicy:"network-only"
  }
})(MemberPlanPage)