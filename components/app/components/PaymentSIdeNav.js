import React from 'react';
import {MDBCol, MDBIcon, MDBListGroup} from "mdbreact";
import {useRouter} from 'next/router'
import {SideNav} from "../../sidenav";
import {SideNavItem, SidenavLogout, UserImage} from "./MainSideNav";

const SideNavChildren = props => {
  const {className, user} = props;
  const {pathname, query: {courseId}} = useRouter();

  let logoutItem = null;
  if (user)
    logoutItem = (
      <SidenavLogout className={className}>
        <MDBIcon fas icon={"sign-out-alt"} className={"mr-2 "}/>
        Logout
      </SidenavLogout>
    )
  return (
    <>
      <SideNavItem pathname={pathname}
                   className={className}
                   as={`/courses/${courseId}/pay/guide`}
                   href={`/courses/[courseId]/pay/guide`}>
        <MDBIcon icon={"home"} className={"mr-2"}/>
        How To Pay
      </SideNavItem>
      <SideNavItem pathname={pathname}
                   className={className}
                   as={`/courses/${courseId}/pay`}
                   href={`/courses/[courseId]/pay`}>
        <MDBIcon fas icon={"sign-in-alt"} className={"mr-2"}/>
        Pay For Class
      </SideNavItem>
      {logoutItem}
    </>
  )
}


const PaymentSideNav = props => {
  const {isOpen, toggleFunction, user} = props;
  const listClass = "border border-0 rounded ";
  const listClassSide = `${listClass} account-list-padding`;

  let name = "Unknown User";
  let imageUrl = "/unknownPerson.png";
  if (user) {
    const {firstName, lastName, profileUrl} = user
    name = `${firstName} ${lastName}`
    imageUrl = profileUrl
  }
  return (
    <>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black z-depth-1"}>
        <MDBListGroup className={"px-1"}>
          <UserImage name={name} imageUrl={imageUrl}/>
          <SideNavChildren className={listClassSide} user={user}/>
        </MDBListGroup>
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block  f-100 px-0"}>
        <div className={"pt-5 rounded f-50 h-100 z-depth-1 position-fixed col-lg-3"}>
          <MDBListGroup className={"px-1"}>
            <UserImage name={name} imageUrl={imageUrl}/>
            <SideNavChildren className={listClass} user={user}/>
          </MDBListGroup>
        </div>
      </MDBCol>
    </>
  )
}

export default PaymentSideNav