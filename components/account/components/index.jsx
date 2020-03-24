import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
  MDBCol,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from "mdbreact";
import Router from 'next/router'
import {SideNav} from '../../global/sidenav'
import cookie from 'js-cookie'


const getActiveDefault = () => ({
  account: false,
  orders: false,
  account_edit: false,
  address_book: false,
  linked_accounts: false
});

const redirect = (href) => {
  Router.push(href);
};

function SideNavItem(props) {
  const {active, className, children, href} = props;
  return (
    <MDBListGroupItem active={active} hover className={className} onClick={() => redirect(href)}>
      {children}
    </MDBListGroupItem>
  )
}

export function AccountSideNav(props) {
  const {isOpen, toggleFunction, active} = props;
  const listClass = "border border-0";
  const listClassSide = `${listClass} account-list-padding`;
  let activeTab = getActiveDefault();
  activeTab[active] = true;
  const {account, orders, account_edit, address_book, linked_accounts} = activeTab;

  const children = (listClass) => (
    <MDBListGroup>
      <SideNavItem active={account} className={listClass} href={"/account"}>
        <MDBIcon far icon={"user"} className={"mr-2"}/>
        My Account
      </SideNavItem>
      <SideNavItem active={orders} className={listClass}>
        <MDBIcon fas icon={"clipboard-list"} className={"mr-2"}/>
        Orders
      </SideNavItem>
      <SideNavItem active={account_edit} className={listClass} href={"/account/edit"}>
        <MDBIcon fas icon={"user-edit"} className={"mr-2"}/>
        Edit Account Info
      </SideNavItem>
      <SideNavItem active={address_book} className={listClass}>
        <MDBIcon fas icon={"address-book"} className={"mr-2"}/>
        Address Book
      </SideNavItem>
      <SideNavItem active={linked_accounts} className={listClass}>
        <MDBIcon fas icon={"link"} className={"mr-2"}/>
        Linked Accounts
      </SideNavItem>
    </MDBListGroup>
  );
  return (
    <>
      <MDBBtn className={"position-fixed d-md-block d-lg-none rounded-pill hover-fade"}
              style={{
                zIndex: 1,
                display: isOpen ? "none!important" : "",
                left: "1rem"
              }}
              onClick={toggleFunction}>
        <MDBIcon icon={"bars"}/>
      </MDBBtn>
      <SideNav hide={"lg"} isOpen={isOpen} toggleFunction={toggleFunction} className={"bg-white text-black"}>
        {children(listClassSide)}
      </SideNav>
      <MDBCol lg={"3"} className={"d-none d-lg-block"}>
        <div className={"m-2 z-depth-1 rounded"}>
          {children(listClass)}
        </div>
      </MDBCol>
    </>
  )
}

export function AccountCard(props) {
  const {title, className, href, icon} = props;

  return (
    <MDBCard className={className}>
      <MDBCardBody>
        <MDBCardTitle className={"pl-2 pb-2 border-bottom border-dark"}>
          {title}

        </MDBCardTitle>
        <MDBCardText tag={"div"}>
          {props.children}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  )
}

export const redirectNoUser =
  () => {
    if (typeof window !== "undefined") {
      // remove the token
      cookie.remove("token");
      // redirect to login
      Router.push("/login");
    }
    return <h3 className={"text-center"}>User not Authenticated Redirecting to Login</h3>;
  };