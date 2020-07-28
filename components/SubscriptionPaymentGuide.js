import React from "react";
import {MDBContainer} from "mdbreact";
import {NextSeo} from "next-seo";

export default class SubscriptionPaymentGuide extends React.PureComponent {
  render() {
    return (
      <>
        <NextSeo title={"Payment Guide"}/>
        <MDBContainer>
          <h1 className={"mt-3"}>How to Pay For Course</h1>
          <div className="col-lg-12 mx-auto">
            <ol className="step pl-0">
              <li className="step-element pb-0">
                <div className="step-number">
                  <span className="number">1</span>
                </div>
                <div className="step-excerpt">
                  <h6 className="font-weight-bold dark-grey-text mb-3">Login into your account</h6>
                  <p className="text-muted">
                    Login to the application using your google account.After clicking login a screen will pop
                    up and you will be required to give permission use your account for login.
                  </p>
                </div>
              </li>
              <li className="step-element pb-0">
                <div className="step-number">
                  <span className="number">2</span>
                </div>
                <div className="step-excerpt">
                  <h6 className="font-weight-bold dark-grey-text mb-3">Enter Amount and Phone Number</h6>
                  <p className="text-muted">
                    After login in you will be redirected to the payment page of {this.props.name} where you will find a
                    form that will require you to enter the amount of weeks you want to pay for.Then fill in then
                    enter the phone number you want to pay with.
                  </p>
                </div>
              </li>
              <li className="step-element pb-0">
                <div className="step-number">
                  <span className="number">3</span>
                </div>
                <div className="step-excerpt">
                  <h6 className="font-weight-bold dark-grey-text mb-3">Finish Payment</h6>
                  <p className="text-muted">
                    A pop up screen from your telephone network will appear asking you to confirm payment by means
                    of your secret pin.Finish the prompt and we will update your payment status in 3-5 minutes.
                  </p>
                </div>
              </li>
              <li className="step-element pb-0">
                <div className="step-number">
                  <span className="number">4</span>
                </div>
                <div className="step-excerpt">
                  <h6 className="font-weight-bold dark-grey-text mb-3">Customer Service</h6>
                  <p className="text-muted">
                    In case of any problems feel free to contact the number below +254797792447.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </MDBContainer>
      </>
    )
  }
}